import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signUp'
import Home from './pages/Home'
import Admin from './pages/adminLogin'
import AdminDashboard from './pages/adminDashboad'
import AdminEdit from './pages/adminEdit'
import AdminAddUser from './components/adminAdduser'
import ProtectedUserRoute from './components/ProtectedUserRoute.';






export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit" element={<AdminEdit />} />
        <Route path="/admin/add" element={<AdminAddUser />} />

      </Routes>
    </BrowserRouter>
  );
}


