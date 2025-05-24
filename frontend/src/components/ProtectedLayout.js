import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

function ProtectedLayout({ children }) {
  const usuario_id = localStorage.getItem('usuario_id');

  if (!usuario_id) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default ProtectedLayout;
