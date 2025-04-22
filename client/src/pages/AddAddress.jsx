import React, { useEffect, useState } from 'react';
import { assets } from '../greencart_assets/greencart_assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const InputField = ({ type, placeholder, name }) => (
    <input
      type={type}
      name={name}
      value={address[name]}
      onChange={handleChange}
      placeholder={placeholder}
      required
      className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition'
    />
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        address, // Send entire address object
        userId: user?._id, // Add userId to payload
      };

      const { data } = await axios.post('/api/address/add', payload); // POST the payload

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (user === null) return; // still loading
    if (!user) navigate('/cart');
  }, [user, navigate]);

  return (
    <div className='mt-16 pb-16 px-4'>
      <p className='text-2xl md:text-3xl text-gray-700'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between items-center mt-10 gap-12'>
        {/* Form */}
        <div className='flex-1 w-full max-w-2xl'>
          <form onSubmit={onSubmitHandler} className='space-y-4 text-sm'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField name='firstName' type='text' placeholder='First Name' />
              <InputField name='lastName' type='text' placeholder='Last Name' />
            </div>

            <InputField name='email' type='email' placeholder='Email Address' />
            <InputField name='street' type='text' placeholder='Street' />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField name='city' type='text' placeholder='City' />
              <InputField name='state' type='text' placeholder='State' />
              <InputField name='zipcode' type='text' placeholder='Zip Code' />
              <InputField name='country' type='text' placeholder='Country' />
            </div>

            <InputField name='phone' type='text' placeholder='Phone' />

            <button
              type='submit'
              className='w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dull transition uppercase font-semibold mt-2'
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Image */}
        <div className='w-full max-w-sm md:max-w-md'>
          <img
            className='w-full h-auto object-contain'
            src={assets.add_address_iamge}
            alt='Add Address'
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
