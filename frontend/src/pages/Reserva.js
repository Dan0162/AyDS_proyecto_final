import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { infoApi } from '../api'; // changed import

function Reserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taller, setTaller] = useState(null);
  const [mensaje, setMensaje] = useState('');
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
    try {
      const res = await infoApi.post('/reservar', {
        usuario_id,
        taller_id: id
      });

      setMensaje(res.data.message);
      setTimeout(() => navigate('/mis-reservas'), 2000);
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

            <button className="btn btn-danger w-100 mt-3" onClick={reservarTaller}>
              Confirmar Reserva
            </button>

            {mensaje && <div className="alert alert-info text-center mt-3">{mensaje}</div>}
          </>
        ) : (
          <div className="alert alert-warning text-center">Cargando información del taller...</div>
        )}
      </div>
    </div>
  );
}

export default Reserva;
