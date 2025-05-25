import React from 'react';
import { Link } from 'react-router-dom';

function TallerCard({ taller, reservas = [] }) {
  // Verifica si el usuario ya reservó este taller
  const yaReservado = reservas.some(
    (r) => String(r.taller_id) === String(taller.id)
  );
  const sinCupo = taller.cupo <= 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex">
      <div className="card flex-fill h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{taller.nombre}</h5>
          <p className="card-text">
            <strong>Categoría:</strong> {taller.categoria} <br />
            <strong>Fecha:</strong> {new Date(taller.fecha).toLocaleDateString()} <br />
            <strong>Precio:</strong> Q{taller.precio} <br />
            <strong>Cupos:</strong> {taller.cupo}
            {taller.descripcion && (
              <>
                <br />
                <strong>Descripción:</strong> <br /> {taller.descripcion}
              </>
            )}
          </p>
          <div className="mt-auto">
            {sinCupo ? (
              <button className="btn btn-secondary w-100 mt-2" disabled>
                No hay cupos disponibles
              </button>
            ) : yaReservado ? (
              <button className="btn btn-secondary w-100 mt-2" disabled>
                Curso Reservado
              </button>
            ) : (
              <Link
                to={`/reserva/${taller.id}`}
                className="btn btn-oliva w-100 mt-2"
              >
                Reservar Taller
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TallerCard;
