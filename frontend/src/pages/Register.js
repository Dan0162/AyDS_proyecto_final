import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api';
import DarkModeButton from '../components/DarkModeButton';

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Debe tener al menos 8 caracteres');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Debe contener al menos una letra mayúscula');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Debe contener al menos una letra minúscula');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Debe contener al menos un número');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Debe contener al menos un carácter especial');
    }
    
    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Validate password in real-time
    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);
    
    // Clear general message when user starts typing
    if (mensaje) {
      setMensaje('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password before submission
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      setMensaje('Por favor corrige los errores en la contraseña.');
      return;
    }

    setIsLoading(true);
    setMensaje('');

    try {
      const res = await loginApi.post('/register', {
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

  // Get password strength indicator
  const getPasswordStrength = () => {
    const totalCriteria = 5;
    const metCriteria = totalCriteria - passwordErrors.length;
    
    if (password.length === 0) return null;
    
    if (metCriteria <= 2) return { text: 'Débil', color: 'danger', width: '33%' };
    if (metCriteria <= 4) return { text: 'Media', color: 'warning', width: '66%' };
    return { text: 'Fuerte', color: 'success', width: '100%' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3 position-relative">
      <div style={{
        position: 'fixed',
        top: 16,
        right: 24,
        zIndex: 1050
      }}>
        <DarkModeButton />
      </div>
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo MasterCook"
            style={{
              height: '100px'
            }}
          />
          <h2 className="mt-3 mb-0">Crear Cuenta</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${passwordErrors.length > 0 && password.length > 0 ? 'is-invalid' : ''} ${passwordErrors.length === 0 && password.length > 0 ? 'is-valid' : ''}`}
                value={password}
                onChange={handlePasswordChange}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{
                  minWidth: '45px',
                  height: '38px',
                  padding: '6px',
                  fontSize: '16px',
                  flexShrink: 0
                }}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* Password strength indicator */}
            {passwordStrength && (
              <div className="mt-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-muted">Fortaleza de la contraseña:</small>
                  <small className={`text-${passwordStrength.color}`}>{passwordStrength.text}</small>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div 
                    className={`progress-bar bg-${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Password requirements */}
            {password.length > 0 && (
              <div className="mt-2">
                <small className="text-muted d-block mb-1">Requisitos de contraseña:</small>
                <div className="small">
                  <div className={`${password.length >= 8 ? 'text-success' : 'text-danger'}`}>
                    <span className="me-1">{password.length >= 8 ? '✓' : '✗'}</span>
                    Al menos 8 caracteres
                  </div>
                  <div className={`${/[A-Z]/.test(password) ? 'text-success' : 'text-danger'}`}>
                    <span className="me-1">{/[A-Z]/.test(password) ? '✓' : '✗'}</span>
                    Una letra mayúscula
                  </div>
                  <div className={`${/[a-z]/.test(password) ? 'text-success' : 'text-danger'}`}>
                    <span className="me-1">{/[a-z]/.test(password) ? '✓' : '✗'}</span>
                    Una letra minúscula
                  </div>
                  <div className={`${/\d/.test(password) ? 'text-success' : 'text-danger'}`}>
                    <span className="me-1">{/\d/.test(password) ? '✓' : '✗'}</span>
                    Un número
                  </div>
                  <div className={`${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-success' : 'text-danger'}`}>
                    <span className="me-1">{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : '✗'}</span>
                    Un carácter especial
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-success w-100 d-flex align-items-center justify-content-center"
            disabled={passwordErrors.length > 0 || isLoading}
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
                Registrando...
              </>
            ) : (
              'Registrarse'
            )}
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