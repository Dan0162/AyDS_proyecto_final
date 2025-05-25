import React, { useEffect, useState } from 'react';
import { infoApi } from '../api';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true); // <-- NUEVO
  const usuario_id = localStorage.getItem('usuario_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await infoApi.get(`/mis-reservas/${usuario_id}`);
        setReservas(res.data);
        // Guardar reservas en localStorage para que TallerCard pueda consultarlas
        localStorage.setItem('reservas_usuario', JSON.stringify(res.data));
      } catch {
        setMensaje('Error al cargar tus reservas.');
      } finally {
        setLoading(false); // <-- NUEVO
      }
    };

    setLoading(true); // <-- NUEVO
    fetchReservas();
  }, [usuario_id]);

  const eliminarReserva = async (taller_id) => {
    try {
      const res = await infoApi.post('/eliminar-reserva', {
        usuario_id,
        taller_id
      });
      setMensaje(res.data.message);
      const nuevasReservas = reservas.filter((r) => r.taller_id !== taller_id);
      setReservas(nuevasReservas);
      localStorage.setItem('reservas_usuario', JSON.stringify(nuevasReservas));
    } catch {
      setMensaje('Error al eliminar la reserva.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Mis Talleres Reservados</h2>

      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

      {loading ? (
        <div className="alert alert-info text-center">Cargando reservas...</div>
      ) : reservas.length === 0 ? (
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
