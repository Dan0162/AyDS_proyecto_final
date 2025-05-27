import React, { useEffect, useState } from 'react';
import { infoApi } from '../api';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Nuevo estado para expandir/cerrar detalles
  const usuario_id = localStorage.getItem('usuario_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await infoApi.get(`/mis-reservas/${usuario_id}`);
        setReservas(res.data);
        localStorage.setItem('reservas_usuario', JSON.stringify(res.data));
        const cats = Array.from(
          new Set(res.data.map((r) => r.categoria).filter(Boolean))
        );
        setCategorias(cats);
      } catch {
        setMensaje('Error al cargar tus reservas.');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
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
      const cats = Array.from(
        new Set(nuevasReservas.map((r) => r.categoria).filter(Boolean))
      );
      setCategorias(cats);
    } catch {
      setMensaje('Error al eliminar la reserva.');
    }
  };

  const reservasFiltradas = categoria
    ? reservas.filter((r) => r.categoria === categoria)
    : reservas;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Mis Talleres Reservados</h2>

      <div className="mb-4">
        <label className="form-label">Filtrar por categoría:</label>
        <select
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {mensaje && (
        <div className={`alert text-center mt-3 ${
          mensaje.toLowerCase().includes('error') ||
          mensaje.toLowerCase().includes('problema') ||
          mensaje.toLowerCase().includes('no se pudo') ||
          mensaje.toLowerCase().includes('no está disponible') ||
          mensaje.toLowerCase().includes('conflicto') ||
          mensaje.toLowerCase().includes('inválido') ||
          mensaje.toLowerCase().includes('invalido')
            ? 'alert-danger'
            : 'alert-info'
        }`}>
          {mensaje}
        </div>
      )}

      {loading ? (
        <div className="alert alert-info text-center">Cargando reservas...</div>
      ) : reservasFiltradas.length === 0 ? (
        <div className="alert alert-warning text-center">
          {categoria
            ? 'No hay reservas en esta categoría.'
            : 'Aún no has reservado ningún taller.'}
        </div>
      ) : (
        <div className="row">
          {reservasFiltradas.map((reserva) => (
            <div className="col-12 col-md-6 mb-4" key={reserva.id}>
              <div className="card h-100 shadow-sm">
                <div
                  className="card-body d-flex flex-column"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setExpandedId(expandedId === reserva.id ? null : reserva.id)
                  }
                >
                  <h5 className="card-title mb-0">
                    {reserva.nombre_taller}
                  </h5>
                  {/* Mostrar detalles solo si está expandido */}
                  {expandedId === reserva.id && (
                    <div className="mt-3">
                      <p className="card-text">
                        <strong>Fecha:</strong> {reserva.fecha} <br />
                        <strong>Categoría:</strong> {reserva.categoria || 'Sin categoría'} <br />
                        <strong>Estado:</strong>{' '}
                        <span className={`badge ${reserva.pagado ? 'bg-success' : 'bg-secondary'}`}>
                          {reserva.pagado ? 'Pagado' : 'Pendiente'}
                        </span>
                      </p>
                      {!reserva.pagado && (
                        <div className="mt-auto d-flex flex-column gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/pago/${reserva.taller_id}`);
                            }}
                            className="btn btn-danger"
                          >
                            Pagar Taller
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarReserva(reserva.taller_id);
                            }}
                            className="btn btn-outline-danger"
                          >
                            Eliminar Reserva
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Indicador visual de expandir/cerrar */}
                  <div className="text-end mt-2">
                    <small className="text-primary">
                      {expandedId === reserva.id ? 'Ocultar detalles ▲' : 'Ver detalles ▼'}
                    </small>
                  </div>
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
