import { Navigate } from 'react-router-dom';
import SignupLoginForm from '../components/signUp'
import { verifyUserJWT } from '../../Utils/verifyUserJWT';

function SignupPage() {

  const userLogged = verifyUserJWT();

  return userLogged ? <Navigate to="/home" /> : <SignupLoginForm />;
}

export default SignupPage
