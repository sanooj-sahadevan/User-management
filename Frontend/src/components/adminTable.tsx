import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Ensure you import the styles for Toastify

type DataType = {
    id: string;
    username: string;
    email: string;
    phone: string;
};

function AdminTable() {
    const navigate = useNavigate();
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminJWT = localStorage.getItem("adminJWT");
                const response = await fetch('http://localhost:3000/admin/getdashboarddata', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ adminJWT }),
                });

                const result = await response.json();
                if (result.success) {
                    setData(result.dashboardData.sort((a: DataType, b: DataType) => a.username.localeCompare(b.username)));
                } else {
                    toast.error("Failed to fetch data", {
                        position: "top-center",
                        autoClose: 3000,
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
                console.error(error);
                toast.error("An error occurred. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function deleteHandler(userId: string) {
        const res = confirm("Do you want to delete?");
        if (res) {
            const deleteUser = async (userId: string) => {
                try {
                    const response = await fetch(`http://localhost:3000/admin/delete/${userId}`, {
                        method: "DELETE",
                    });

                    const result = await response.json();
                    if (result.success) {
                        toast.success('User deleted successfully', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });

                        setTimeout(() => window.location.reload(), 3000);
                    } else {
                        toast.error(result.message || "Failed to delete user", {
                            position: "top-center",
                            autoClose: 3000,
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
                    console.error(error);
                    toast.error("An error occurred. Please try again.", {
                        position: "top-center",
                        autoClose: 3000,
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
            deleteUser(userId);
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-900 min-h-screen py-8">
            <button
                className="py-2 px-6 mb-6 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-400 transition duration-300"
                onClick={() => navigate("/admin/add")}
            >
                Add User
            </button>
            <div className="w-full max-w-6xl">
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : data && data.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-700 text-white">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-700 px-4 py-2">S.No</th>
                                <th className="border border-gray-700 px-4 py-2">Username</th>
                                <th className="border border-gray-700 px-4 py-2">Email</th>
                                <th className="border border-gray-700 px-4 py-2">Phone number</th>
                                <th className="border border-gray-700 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, i) => (
                                <tr key={user.id} className="bg-gray-900 odd:bg-gray-800 even:bg-gray-700">
                                    <td className="border border-gray-700 px-4 py-2 text-center">{i + 1}</td>
                                    <td className="border border-gray-700 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-700 px-4 py-2">{user.phone}</td>
                                    <td className="border border-gray-700 px-4 py-2 flex justify-center space-x-2">
                                        <button
                                            className="py-1 px-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition duration-300"
                                            onClick={() => {
                                                navigate(`/admin/edit`, { state: user });
                                            }}
                                        >
                                            📝Edit
                                        </button>
                                        <button
                                            className="py-1 px-2 bg-red-600 rounded-md text-white hover:bg-red-500 transition duration-300"
                                            onClick={() => deleteHandler(user.id)}
                                        >
                                            🗑️Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-white text-center">No data available</p>
                )}
            </div>
        </div>
    );
}

export default AdminTable;
