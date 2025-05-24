import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Talleres from './pages/Talleres';
import Reserva from './pages/Reserva';
import MyBookings from './pages/MyBookings';
import Pago from './pages/Pago'; // ✅ IMPORTANTE
import ProtectedLayout from './components/ProtectedLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route path="/talleres" element={
          <ProtectedLayout>
            <Talleres />
          </ProtectedLayout>
        } />
        <Route path="/reserva/:id" element={
          <ProtectedLayout>
            <Reserva />
          </ProtectedLayout>
        } />
        <Route path="/mis-reservas" element={
          <ProtectedLayout>
            <MyBookings />
          </ProtectedLayout>
        } />
        <Route path="/pago/:id" element={
          <ProtectedLayout>
            <Pago />
          </ProtectedLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
