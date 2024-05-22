import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Siginup from './pages/signUp'




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Siginup />} />

      </Routes>
    </BrowserRouter>
  );
}
