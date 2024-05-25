/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('23456');

      localStorage.removeItem('userJWT');
      console.log('JWT token removed from localStorage');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          src="https://via.placeholder.com/150" // Placeholder image
          alt="Profile"
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <label htmlFor='username' className='sr-only'>Username</label>
        <input
          type="text"
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-2'
        />
        <label htmlFor='email' className='sr-only'>Email</label>
        <input
          type="email"
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-2'
        />
        <label htmlFor='phonenumber' className='sr-only'>Phone Number</label>
        <input
          type="number"
          id='phonenumber'
          placeholder='Phone Number'
          className='bg-slate-100 rounded-lg p-2'
        />
        <button type='submit' className='bg-blue-500 text-white rounded-lg py-2'>Submit</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleLogout} className='text-red-700 cursor-pointer'>Log out</span>
      </div>
    </div>
  );
};

export default Home;
