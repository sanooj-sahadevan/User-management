import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signUp'




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}
