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

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

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
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-xl w-full">
        <ToastContainer />
        <form
          className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-3xl">Admin Login</h1>
          <label htmlFor="email" className="flex flex-col my-2 w-full">
            Email:
            <input
              className="border-2 p-2 m-2"
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
            Password:
            <input
              type="password"
              className="border-2 p-2 m-2"
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
          <button className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginForm;
function useForm<T>(): { register: any; handleSubmit: any; formState: { errors: any; }; } {
    throw new Error("Function not implemented.");
}

