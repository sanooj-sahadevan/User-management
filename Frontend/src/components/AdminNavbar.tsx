/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  function logoutHandler(event: any) {
    event.preventDefault();
    const res = confirm('Are you sure you want to logout?');
    if (res) {
      localStorage.removeItem("adminJWT");
      navigate("/admin");
    }
  }

  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-between px-10 shadow-md">
            <h1 className="text-white md:text-2xl font-bold">
                Admin Dashboard
            </h1>
            <button
                className="text-white font-bold py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </nav>
  );
}

export default AdminNavbar;
