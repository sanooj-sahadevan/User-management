import { Navigate } from 'react-router-dom';
import AdminLoginForm from '../components/adminLoginForm'
import { verifyUserJWT } from '../Utils/verifyUserJWT';

function AdminLoginPage() {

  const adminLogged = verifyUserJWT();

  return adminLogged ? <Navigate to="/admin/dashboard" /> : <AdminLoginForm />;
}

export default AdminLoginPage
