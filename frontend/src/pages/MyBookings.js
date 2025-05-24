import React, { useEffect, useState } from 'react';
import { infoApi } from '../api'; // changed import
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const usuario_id = localStorage.getItem('usuario_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await infoApi.get(`/mis-reservas/${usuario_id}`); // changed api to infoApi
        setReservas(res.data);
      } catch {
        setMensaje('Error al cargar tus reservas.');
      }
    };

    fetchReservas();
  }, [usuario_id]);

  const eliminarReserva = async (taller_id) => {
    try {
      const res = await infoApi.post('/eliminar-reserva', { // changed api to infoApi
        usuario_id,
        taller_id
      });
      setMensaje(res.data.message);
      setReservas(reservas.filter((r) => r.taller_id !== taller_id));
    } catch {
      setMensaje('Error al eliminar la reserva.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Mis Talleres Reservados</h2>

      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

      {reservas.length === 0 ? (
        <div className="alert alert-warning text-center">
          Aún no has reservado ningún taller.
        </div>
      ) : (
        <div className="row">
          {reservas.map((reserva) => (
            <div className="col-12 col-md-6 mb-4" key={reserva.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{reserva.nombre_taller}</h5>
                  <p className="card-text">
                    <strong>Fecha:</strong> {reserva.fecha} <br />
                    <strong>Estado:</strong>{' '}
                    <span className={`badge ${reserva.pagado ? 'bg-success' : 'bg-secondary'}`}>
                      {reserva.pagado ? 'Pagado' : 'Pendiente'}
                    </span>
                  </p>

                  {!reserva.pagado && (
                    <div className="mt-auto d-flex flex-column gap-2">
                      <button
                        onClick={() => navigate(`/pago/${reserva.taller_id}`)}
                        className="btn btn-danger"
                      >
                        Pagar Taller
                      </button>
                      <button
                        onClick={() => eliminarReserva(reserva.taller_id)}
                        className="btn btn-outline-danger"
                      >
                        Eliminar Reserva
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
