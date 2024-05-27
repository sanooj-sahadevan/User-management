import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signUp'
import Home from './pages/Home'
import Admin from './pages/adminLogin'





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />



      </Routes>
    </BrowserRouter>
  );
}
