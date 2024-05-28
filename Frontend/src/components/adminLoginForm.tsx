/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Ensure you import the styles for Toastify

function AdminLoginForm() {
  const navigate = useNavigate();

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      console.log('poi');
      
      const response = await fetch('http://localhost:3000/admin/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       

        body: JSON.stringify(data),
        
      });

      const result = await response.json();
      console.log(result);
      
      console.log('vann')
      if (response.ok) {
        localStorage.setItem("adminJWT", result.adminJWT);

        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        toast.error(result.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="max-w-xl w-full">
        <ToastContainer />
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-3xl text-white mb-4">Admin Login</h1>
          <label htmlFor="email" className="flex flex-col my-2 w-full">
            <span className="text-white">Email:</span>
            <input
              className="border-2 p-2 m-2 bg-gray-700 text-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email id",
                },
                minLength: {
                  value: 11,
                  message: "Enter at least 11 characters",
                },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </label>
          <label htmlFor="password" className="flex flex-col my-2 w-full">
            <span className="text-white">Password:</span>
            <input
              type="password"
              className="border-2 p-2 m-2 bg-gray-700 text-white"
              {...register("password", {
                required: "Enter a password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </label>
          <button className="border-2 p-2 m-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-500" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginForm;
