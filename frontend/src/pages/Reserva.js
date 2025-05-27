import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { infoApi } from '../api'; // changed import

function Reserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taller, setTaller] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const usuario_id = localStorage.getItem('usuario_id');

  useEffect(() => {
    const fetchTaller = async () => {
      try {
        const res = await infoApi.get(`/talleres/${id}`); // changed api to infoApi
        setTaller(res.data);
      } catch {
        setMensaje('Error al cargar el taller.');
      }
    };

    fetchTaller();
  }, [id]);

  const reservarTaller = async () => {
    if (!usuario_id) {
      setMensaje('Error: No se encontró información del usuario. Por favor inicia sesión nuevamente.');
      return;
    }

    setIsLoading(true);
    setMensaje('');

    try {
      const res = await infoApi.post('/reservar', {
        usuario_id,
        taller_id: id
      });

      setMensaje(res.data.message);
      navigate('/mis-reservas'); // Elimina el setTimeout, navega inmediatamente
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.status === 409
      ) {
        // Try to get the message from different possible structures
        const msg =
          (err.response.data && err.response.data.message) ||
          (typeof err.response.data === 'string' ? err.response.data : null) ||
          'Ya tienes una reserva para este taller.';
        setMensaje(msg);
      } else {
        setMensaje('Ocurrió un error al reservar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '600px', width: '100%' }}>
        {taller ? (
          <>
            <h2 className="mb-4 text-center">Reservar Taller</h2>
            <p><strong>Nombre:</strong> {taller.nombre}</p>
            <p><strong>Categoría:</strong> {taller.categoria}</p>
            <p><strong>Fecha:</strong> {taller.fecha}</p>
            <p><strong>Precio:</strong> Q{taller.precio}</p>
            <p><strong>Cupo disponible:</strong> {taller.cupo}</p>

            <button 
              className="btn btn-danger w-100 mt-3 d-flex align-items-center justify-content-center" 
              onClick={reservarTaller}
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
                  Confirmando reserva...
                </>
              ) : (
                'Confirmar Reserva'
              )}
            </button>

            {mensaje && (
              <div className={`alert text-center mt-3 ${
                mensaje.toLowerCase().includes('error') ||
                mensaje.toLowerCase().includes('problema') ||
                mensaje.toLowerCase().includes('no se pudo') ||
                mensaje.toLowerCase().includes('no está disponible') ||
                mensaje.toLowerCase().includes('ya tienes') ||
                mensaje.toLowerCase().includes('ya tenés') ||
                mensaje.toLowerCase().includes('conflicto') ||
                mensaje.toLowerCase().includes('inválido') ||
                mensaje.toLowerCase().includes('invalido')
                  ? 'alert-danger'
                  : 'alert-info'
              }`}>
                {mensaje}
              </div>
            )}
          </>
        ) : (
          <div className="alert alert-warning text-center">Cargando información del taller...</div>
        )}
      </div>
    </div>
  );
}

export default Reserva;