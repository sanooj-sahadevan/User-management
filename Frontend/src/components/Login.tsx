/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for react-toastify

import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(true);
        toast.error("Failed to login", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      localStorage.setItem("userJWT", data.userJWT);
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error("Failed to login", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-pink-600">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md-black-500">
        <h1 className="text-3xl text-center font-semibold mb-6">Log in</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:black-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:black-500"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            Log in
          </button>
        </form>
        <div className='flex gap-2 mt-3'>
          <p>Don't have an account?</p>
          <Link to='/signup'>
            <span className='text-blue-500'>Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-4">Error occurred during Login. Please try again.</p>}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
