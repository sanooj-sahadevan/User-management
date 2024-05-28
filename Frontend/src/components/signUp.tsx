import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../Redux/User/userSlice'; // Ensure the correct import path

const SignUp = () => {

    type Inputs = {
        username: string;
        email: string;
        phone: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { loading, error } = useSelector((state: any) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            dispatch(signInStart());

            const res = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();
            console.log(responseData); // Added console log for response data

           

            dispatch(signInSuccess(responseData));
            localStorage.setItem("userJWT", responseData.userJWT);
            navigate('/home');

            if (!responseData.success) {
                dispatch(signInFailure('Signup failed'));
                return;
            }

        } catch (error) {
            dispatch(signInFailure('An error occurred during signup.'));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-600">
            <div className="p-6 max-w-lg bg-white rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username is required",
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message:
                                "Please valid characters only. [Alphabets A to Z, a to z ]",
                            },
                            minLength: { value: 5, message: "Enter atleast 5 characters" },
                          })}
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                    />
                    {errors.username && <p className="text-red-600">{errors.username.message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Please enter a valid email id",
                            },
                            minLength: {
                              value: 11,
                              message: "Enter atleast 11 characters",
                            },
                          })}
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                    />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                    <input
                        type="number"
                        placeholder="Phone number"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Please enter a valid phone number",
                            },
                            minLength: { value: 10, message: "Enter 10 numbers" },
                            maxLength: { value: 10, message: "Enter 10 numbers" },
                          })}
                          minLength={10}
                          maxLength={10}
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                    />
                    {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Enter a password",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                            },
                        })}
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                    />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                    <button
                        type="submit"
                        className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                        {loading ? 'Loading....' : 'Sign up'}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
