import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('');

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
      if (err.response && err.response.data && err.response.data.message) {
        setMensaje(err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.error) {
        setMensaje(err.response.data.message);
      } else {
        setMensaje('Estamos teniendo problemas para comunicarnos con el servidor. Por favor intenta más tarde.');
      }
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div 
                  className="spinner-border spinner-border-sm me-2" 
                  role="status"
                  style={{ width: '1rem', height: '1rem' }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
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