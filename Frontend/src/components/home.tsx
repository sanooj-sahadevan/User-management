/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

type UserData = {
  username: string;
  email: string;
  phone: string;
  image?: string; // Changed from `string` to `string | undefined` to make it optional
};


const Home = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);



  function imageHandler(e: any) {
    setImage([...e.currentTarget.files][0]);
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userJWT');
      toast.success("Logged out successfully");
      navigate('/');

    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };


  useEffect(() => {
    async function fetchUserData() {
      const userJWT = localStorage.getItem("userJWT");
      if (!userJWT) {
        toast.error("User not authenticated");
        navigate('/');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/user/fetchUserData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userJWT }),
        });

        const data = await response.json();
        console.log(data.userData?.phone,data.userData?.image); 
        
        if (data.success) {
          setUserData(data.userData);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-pink-100'>
            <div className='p-6 max-w-lg bg-white rounded-lg shadow-md'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form className='flex flex-col items-center gap-4'>
                    <img
                        src={userData?.image || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className='h-24 w-24 cursor-pointer rounded-full object-cover'
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={imageHandler}
                        accept="image/*"
                        className="mt-2"
                    />
                    <button
                        type="button"
                        className="bg-slate-200 text-gray-700 font-semibold rounded-lg p-2 w-full mt-4 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        {loading ? "Loading............" : "Upload Image"}
                    </button>
                    <label htmlFor='username' className='sr-only'>Username</label>
                    <input
                        type="text"
                        id='username'
                        placeholder='Username'
                        value={userData?.username || ''}
                        className='bg-slate-200 rounded-lg p-2 w-full'
                        readOnly
                    />
                    <label htmlFor='email' className='sr-only'>Email</label>
                    <input
                        type="email"
                        id='email'
                        placeholder='Email'
                        value={userData?.email || ''}
                        className='bg-slate-200 rounded-lg p-2 w-full'
                        readOnly
                    />
                    <label htmlFor='phonenumber' className='sr-only'>Phone Number</label>
                    <input
                        type="number"
                        id='phonenumber'
                        placeholder='Phone Number'
                        value={userData?.phone || ''}
                        className='bg-slate-200 rounded-lg p-2 w-full'
                        readOnly
                    />
                </form>
                <div className='flex justify-between mt-5'>
                    <span className='text-red-700 cursor-pointer'>Delete Account</span>
                    <span onClick={handleLogout} className='text-red-700 cursor-pointer'>Log out</span>
                </div>
                <ToastContainer transition={Bounce} />
            </div>
        </div>
  );
};

export default Home;
