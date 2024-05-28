/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
  username: string;
  email: string;
  phone: string;
};

function EditUser() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const location = useLocation();
  const { username, email, phone, id } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    setValue("username", username);
    setValue("email", email);
    setValue("phone", phone);
  }, [username, email, phone, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        navigate(`/admin/dashboard`);
      } else {
        toast.error(result.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="max-w-xl w-full">
          <form
            className="bg-gray-800 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-3xl text-white mb-4">Edit User</h1>
            <label htmlFor="username" className="flex flex-col my-2 w-full">
              <span className="text-white">Username:</span>
              <input
                className="border-2 p-2 my-2 bg-gray-700 text-white"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Please use valid characters only. [Alphabets A to Z, a to z]",
                  },
                  minLength: {
                    value: 5,
                    message: "Enter at least 5 characters",
                  },
                })}
              />
              <p className="text-red-600">{errors.username?.message}</p>
            </label>
            <label htmlFor="email" className="flex flex-col my-2 w-full">
              <span className="text-white">Email:</span>
              <input
                className="border-2 p-2 my-2 bg-gray-700 text-white"
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
            <label htmlFor="phone" className="flex flex-col my-2 w-full">
              <span className="text-white">Phone Number:</span>
              <input
                className="border-2 p-2 my-2 bg-gray-700 text-white"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                  minLength: { value: 10, message: "Enter 10 digits" },
                  maxLength: { value: 10, message: "Enter 10 digits" },
                })}
                type="number"
              />
              <p className="text-red-600">{errors.phone?.message}</p>
            </label>
            <button
              className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400 transition duration-300"
              type="submit"
            >
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
