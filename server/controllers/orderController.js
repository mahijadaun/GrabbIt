
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

// Place Order Stripe: /api/order/stripe
export const placeOrderStripe = async(req,res)=>{
    try {
        const {items, address} = req.body;
        const userId = req.userId;
        const {origin} = req.headers;
        if (!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }

        let productData = [];

        let amount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice* item.quantity;

        },0)

        // Add tax 2%
        amount += Math.floor(amount*0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // Stripe Gateway Initialize

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        // Create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: item.name,

                    },
                    unit_amount: Math.floor(item.price + item.price*0.02) * 100
                },
                quantity: item.quantity,
            }
        })



        // Create Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata:{
                orderId: order._id.toString(),
                userId,
            }
        })
        return res.json({ success: true, url: session.url });
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Place order COD
export const placeOrderCOD = async(req,res)=>{
    try {
        const {items, address} = req.body;
        const userId = req.userId;
        if (!address || items.length === 0){
            return res.json({success: true, message: "Invalid data"})
        }
        let amount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice* item.quantity;

        },0)

        // Add tax 2%
        amount += Math.floor(amount*0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        })
        return res.json({ success: true, message: "Order placed successfully"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}


// Stripe webhooks

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
  
    try {
      event = stripeInstance.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error('⚠️ Webhook signature verification failed.', error.message);
      return response.status(400).send(`Webhook Error: ${error.message}`);
    }
  
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          console.log("✅ PaymentIntent succeeded:", paymentIntent.id);
          break;
        }
      
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          console.warn("⚠️ PaymentIntent failed:", paymentIntent.id);
          break;
        }
      
        case 'checkout.session.completed': {
          const session = event.data.object;
      
          console.log("✅ Stripe webhook triggered: checkout.session.completed");
          console.log("📦 Session ID:", session.id);
          console.log("🧾 Metadata:", session.metadata);
      
          const { orderId, userId } = session.metadata || {};
      
          if (!orderId || !userId) {
            console.error("❌ Missing orderId or userId in session metadata");
            break;
          }
      
          try {
            // Update isPaid to true
            const updatedOrder = await Order.findByIdAndUpdate(
              orderId,
              { isPaid: true },
              { new: true }
            );
      
            if (!updatedOrder) {
              console.error("❌ Order not found or couldn't be updated:", orderId);
            } else {
              console.log("✅ Order marked as paid:", updatedOrder._id);
            }
      
            // Clear user's cart
            const updatedUser = await User.findByIdAndUpdate(
              userId,
              { $set: { cartItems: [] } },
              { new: true }
            );
      
            if (!updatedUser) {
              console.error("❌ User not found or couldn't update cart:", userId);
            } else {
              console.log("✅ Cart cleared for user:", updatedUser._id);
            }
      
          } catch (err) {
            console.error("❌ Error processing checkout.session.completed:", err.message);
          }
      
          break;
        }
      
        default:
          console.log(`ℹ️ Unhandled event type: ${event.type}`);
      }
      
  
    response.json({ received: true });
  };

// Get order by user ID
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({userId, $or: [{paymentType: "COD"}, {isPaid: true}]}).populate("items.product address").sort({createdAt: -1});
        return res.json({success: true, orders})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// All orders data for seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({$or: [{paymentType: "COD"}, {isPaid: true}]}).populate("items.product address");
        return res.json({success: true, orders})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// 