import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import DarkModeButton from './DarkModeButton'; // <-- Import

function AppNavbar() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem('nombre_usuario');
    if (nombre) setNombreUsuario(nombre);
  }, []);

  const cerrarSesion = () => {
    // Preserve dark mode preference before clearing storage
    const darkMode = localStorage.getItem('darkMode');
    localStorage.clear();
    if (darkMode !== null) {
      localStorage.setItem('darkMode', darkMode);
    }
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src="/logog.png" alt="Logo" height="60" />
          <span className="fw-bold">MasterCook</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-2 text-center">
            {nombreUsuario ? (
              <>
                <Nav.Link as={Link} to="/talleres">Talleres</Nav.Link>
                <Nav.Link as={Link} to="/mis-reservas">Mis Reservas</Nav.Link>
                <span className="nav-link">👋 {nombreUsuario.split(' ')[0]}</span>
                <Button onClick={cerrarSesion} variant="outline-dark" size="sm">
                  Cerrar sesión
                </Button>
                <DarkModeButton /> {/* <-- Add here */}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                <DarkModeButton /> {/* <-- Add here */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
