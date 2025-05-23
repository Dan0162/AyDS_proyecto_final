import React, { useState } from 'react';
import logo from './Pictures/Logo.png';

function App() {
    // Cambié username por email en login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Registro queda igual
    const [regUsername, setRegUsername] = useState('');
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const colors = {
        primary: '#D94F4F',
        secondary: '#FFF3E2',
        accent: '#6B8E23',
        textPrimary: '#333333',
        textSecondary: '#666666',
        background: '#FAFAFA'
    };

    const backgroundImageUrl = 'https://media.istockphoto.com/id/1442417585/es/foto/persona-recibiendo-un-pedazo-de-pizza-de-pepperoni-con-queso.jpg?s=612x612&w=0&k=20&c=Uk4fj96OIDxE4v2S5sRRXRY_gZ899_TE6jGD-T-TysI=';

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Enviamos email en lugar de username
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (regPassword !== regConfirmPassword) {
            setMessage("Las contraseñas no coinciden");
            return;
        }
        if (!regUsername || !regFirstName || !regLastName || !regEmail || !regPhone || !regPassword) {
            setMessage("Por favor completa todos los campos");
            return;
        }
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: regUsername,
                first_name: regFirstName,
                last_name: regLastName,
                email: regEmail,
                phone: regPhone,
                password: regPassword
            })
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setRegUsername('');
            setRegFirstName('');
            setRegLastName('');
            setRegEmail('');
            setRegPhone('');
            setRegPassword('');
            setRegConfirmPassword('');
            setIsRegistering(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container py-5">
                <div className="row justify-content-end">
                    <div className="col-lg-5 col-md-8 col-sm-10">
                        <div className="card shadow-lg" style={{ borderColor: colors.primary, backgroundColor: colors.secondary }}>
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <img src={logo} alt="Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                                </div>
                                {!isRegistering ? (
                                    <>
                                        <h3 className="text-center mb-4" style={{ color: colors.primary }}>Iniciar Sesión</h3>
                                        <form onSubmit={handleLogin}>
                                            <div className="mb-3">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Correo</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn w-100"
                                                style={{
                                                    backgroundColor: colors.primary,
                                                    color: 'white',
                                                    border: 'none',
                                                }}
                                            >
                                                Ingresar
                                            </button>
                                        </form>
                                        <p className="text-center mt-3" style={{ color: colors.textSecondary }}>
                                            ¿No tienes cuenta?{' '}
                                            <button
                                                className="btn btn-link p-0"
                                                style={{ color: colors.accent, textDecoration: 'underline' }}
                                                onClick={() => { setIsRegistering(true); setMessage(''); }}
                                            >
                                                Regístrate aquí
                                            </button>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-center mb-4" style={{ color: colors.primary }}>Registrarse</h3>
                                        <form onSubmit={handleRegister}>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Usuario</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={regUsername}
                                                    onChange={e => setRegUsername(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Nombre</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={regFirstName}
                                                    onChange={e => setRegFirstName(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Apellido</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={regLastName}
                                                    onChange={e => setRegLastName(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Correo</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={regEmail}
                                                    onChange={e => setRegEmail(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Teléfono</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    value={regPhone}
                                                    onChange={e => setRegPhone(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={regPassword}
                                                    onChange={e => setRegPassword(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" style={{ color: colors.textSecondary }}>Confirmar Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={regConfirmPassword}
                                                    onChange={e => setRegConfirmPassword(e.target.value)}
                                                    required
                                                    style={{ borderColor: colors.primary }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn w-100"
                                                style={{
                                                    backgroundColor: colors.accent,
                                                    color: 'white',
                                                    border: 'none',
                                                }}
                                            >
                                                Registrar
                                            </button>
                                        </form>
                                        <p className="text-center mt-3" style={{ color: colors.textSecondary }}>
                                            ¿Ya tienes cuenta?{' '}
                                            <button
                                                className="btn btn-link p-0"
                                                style={{ color: colors.primary, textDecoration: 'underline' }}
                                                onClick={() => { setIsRegistering(false); setMessage(''); }}
                                            >
                                                Inicia sesión aquí
                                            </button>
                                        </p>
                                    </>
                                )}
                                {message && (
                                    <div
                                        className="alert mt-3 text-center"
                                        style={{ backgroundColor: colors.background, color: colors.textPrimary }}
                                    >
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
