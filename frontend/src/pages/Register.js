import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api'; // changed import

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const res = await loginApi.post('/register', { // changed api to loginApi
        username: correo,
        password: password,
        nombre: nombre
      });

      if (res.status === 200) {
        localStorage.setItem('usuario_id', res.data.usuario_id);
        localStorage.setItem('nombre_usuario', res.data.nombre);
        navigate('/talleres');
      }
    } catch (err) {
      setMensaje('Error al registrar. Es posible que el correo ya esté en uso.');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%', position: 'relative' }}>
        <img
          src="/logo.png"
          alt="Logo MasterCook"
          style={{
            height: '100px',
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10
          }}
        />

        <h2 className="text-center mt-5 mb-4">Crear Cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
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
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>

          {mensaje && <div className="alert alert-info text-center mt-3">{mensaje}</div>}

          <div className="text-center mt-3">
            ¿Ya tenés cuenta?{' '}
            <Link to="/" className="text-decoration-none text-primary">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
