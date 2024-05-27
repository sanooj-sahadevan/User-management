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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          src={userData?.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <input
          type="file"
          name="image"
          onChange={imageHandler}
          accept="image/*"
          // src="userData?.image "
          src={image ? URL.createObjectURL(image) : userData?.image ? `http://localhost:3000/user/images/${userData?.image}` : `http://localhost:3000/user/images/default.jpg`}

        />

        <button
          type="submit"
          className="p-2 bg-fuchsia-700 text-white font-bold my-2 rounded"
        >
          {loading ? "Loading............" : "Upload Image"}
        </button>




        <label htmlFor='username' className='sr-only'>Username</label>
        <input
          type="text"
          id='username'
          placeholder='Username'
          value={userData?.username || ''}
          className='bg-slate-100 rounded-lg p-2'
          readOnly
        />
        <label htmlFor='email' className='sr-only'>Email</label>
        <input
          type="email"
          id='email'
          placeholder='Email'
          value={userData?.email || ''}
          className='bg-slate-100 rounded-lg p-2'
          readOnly
        />
        <label htmlFor='phonenumber' className='sr-only'>Phone Number</label>
        <input
          type="number"
          id='phonenumber'
          placeholder='Phone Number'
          value={userData?.phone || ''}
          className='bg-slate-100 rounded-lg p-2'
          readOnly
        />
        <button type='submit' className='bg-blue-500 text-white rounded-lg py-2'>Submit</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleLogout} className='text-red-700 cursor-pointer'>Log out</span>
      </div>
      <ToastContainer transition={Bounce} />
    </div>
  );
};

export default Home;
