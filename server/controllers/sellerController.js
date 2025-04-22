import jwt from 'jsonwebtoken';
// Seller Login: /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

    if (password===process.env.SELLER_PASSWORD && email===process.env.SELLER_EMAIL) {
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
                res.cookie('sellerToken', token, {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
                    maxAge: 7 * 24 * 60 * 60 * 1000,
        
                })

        return res.json({success: true, message: 'Seller logged in successfully'});
    }else{
        return res.json({success: false, message: "Invalid Credentials"});
    }
    } catch (error) {
        console.error(error.message)
        res.json({success: false, message: error.message})
    }
}



export const isSellerAuth = async (req, res) => {
    try {
      const { email } = req.user;
  
      // Check if the decoded email matches the static seller email
      if (email === process.env.SELLER_EMAIL) {
        return res.json({
          success: true,
          seller: {
            email: process.env.SELLER_EMAIL,
          },
        });
      } else {
        return res.status(403).json({ success: false, message: 'Unauthorized seller' });
      }
    } catch (error) {
      console.error('isSellerAuth Error:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


export const sellerLogout = async(req,res)=>{
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({success: true, message: 'Logged out successfully'})
    } catch (error) {
        console.error(error.message)
        res.json({success: false, message: error.message})
    }
}