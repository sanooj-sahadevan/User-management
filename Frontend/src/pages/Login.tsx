import React from 'react'

const Login = () => {
  return (
    <div>
       <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
    <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
    <form className="flex flex-col gap-4">
        
        <input
            type="email"
            placeholder="Email"
            id="email"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Sign Up
        </button>
    </form>
</div>
    </div>
  )
}

export default Login
