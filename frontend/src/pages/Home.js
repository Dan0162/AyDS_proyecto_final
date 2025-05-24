import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-5 display-md-4 mb-3 text-danger fw-bold">
        Bienvenido a MasterCook Academy 🍽️
      </h1>

      <p className="lead text-secondary px-3 px-md-5">
        ¡Descubrí el arte de cocinar con nuestros talleres presenciales y virtuales! <br />
        Repostería, cocina internacional, saludable y más...
      </p>

      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4 px-2">
        <Link to="/talleres" className="btn btn-outline-danger btn-lg w-100 w-sm-auto">
          Explorar Talleres
        </Link>
        <Link to="/register" className="btn btn-success btn-lg w-100 w-sm-auto">
          Crear Cuenta
        </Link>
      </div>

      <div className="mt-5 px-3">
        <img
          src="https://images.unsplash.com/photo-1543353071-087092ec393f"
          alt="Cocina creativa"
          className="img-fluid rounded shadow"
          style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export default Home;
