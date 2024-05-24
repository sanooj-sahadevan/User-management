import React from 'react'

const Home = () => {

const handlelogout = async()=>{

  try {
    console.log('logout')
    await fetch ('http://localhost:3000/user/logout')
    console.log('pakka sucess');
    
  } catch (error) {
    console.log(error);
    
  }
}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src="" alt="" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' />
        <input type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-2' />
        <input type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-2' />
        <input type="number" id='phonenumber' placeholder='Phone Number' className='bg-slate-100 rounded-lg p-2' />
        <button className='bg-blue-500 text-white rounded-lg py-2'>Submit</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handlelogout} className='text-red-700 cursor-pointer'>Log out</span>
      </div>
    </div>

  )
}

export default Home
