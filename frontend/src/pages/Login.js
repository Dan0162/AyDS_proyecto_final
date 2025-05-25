import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi.post('/login', {
        username: email,
        password: password
      });

      if (res.status === 200) {
        localStorage.setItem('usuario_id', res.data.usuario_id);
        localStorage.setItem('nombre_usuario', res.data.nombre);
        navigate('/talleres');
      }
    } catch (err) {
      if (err.response) {
        setMensaje('Credenciales incorrectas. Intenta de nuevo.');
      } else {
        setMensaje('Estamos teniendo problemas para comunicarnos con el servidor. Por favor intenta más tarde.');
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo MasterCook"
            style={{ height: '100px' }}
          />
        </div>

        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Iniciar Sesión
          </button>

          {mensaje && (
            <div className="alert alert-info text-center mt-3">{mensaje}</div>
          )}

          <div className="text-center mt-3">
            ¿No tenés cuenta?{' '}
            <Link to="/register" className="text-decoration-none text-primary">
              Crear una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;