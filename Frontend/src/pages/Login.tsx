import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-pink-600">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md-black-500">
        <h1 className="text-3xl text-center font-semibold mb-6">Log in</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:black-500"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:black-500"
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>
        <div className='flex gap-2 mt-3'>
          <p>Have an account?</p>
          <Link to='/signup'>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
