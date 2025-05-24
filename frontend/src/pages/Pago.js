import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentApi, infoApi } from '../api';

function Pago() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taller, setTaller] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

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

  const handlePago = async (e) => {
    e.preventDefault();

    if (!tarjeta || !vencimiento || !cvv) {
      setMensaje('Por favor completá todos los datos de pago.');
      return;
    }

    try {
      const res = await paymentApi.post('/pagar', {
        usuario_id,
        taller_id: id
      });

      setMensaje(res.data.message);
      setTimeout(() => navigate('/mis-reservas'), 2000);
    } catch (err) {
      if (err.response) {
        setMensaje('Ocurrió un error al procesar el pago.');
      } else {
        setMensaje('El servicio de pagos no está disponible en este momento.');
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%' }}>
        {taller ? (
          <>
            <h2 className="mb-4 text-center">Pago del Taller: {taller.nombre}</h2>
            <form onSubmit={handlePago}>
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="16"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Fecha de vencimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/AA"
                    value={vencimiento}
                    onChange={(e) => setVencimiento(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Confirmar pago y reservar
              </button>

              {mensaje && (
                <div className="alert alert-info text-center mt-3">{mensaje}</div>
              )}
            </form>
          </>
        ) : (
          <div className="alert alert-warning text-center">Cargando taller...</div>
        )}
      </div>
    </div>
  );
}

export default Pago;
