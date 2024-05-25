import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from "../Redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    console.log(loading, error);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());

            const res = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);

            if (!data.success) {
                dispatch(signInFailure('Signup failed'));
                return;
            }

            dispatch(signInSuccess(data));
            localStorage.setItem("userJWT", data.userJWT);
            setTimeout(() => {
                navigate('/home');
            }, 3000);

        } catch (error) {
            dispatch(signInFailure(error.toString()));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-600">
            <div className="p-6 max-w-lg bg-white rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Phone number"
                        id="phone"
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                        {loading ? 'Loading....' : "Sign up"}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
