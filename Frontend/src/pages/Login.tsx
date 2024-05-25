import { Navigate } from "react-router-dom";
import LoginForm from "../components/Login";
import { verifyUserJWT } from "../../Utils/verifyUserJWT";

function LoginPage() {
  const userLogged = verifyUserJWT();

  return userLogged ? <Navigate to="/home" /> : <LoginForm />;
}

export default LoginPage;


