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
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Add this state

  const usuario_id = localStorage.getItem('usuario_id');

  useEffect(() => {
    const fetchTaller = async () => {
      try {
        const res = await infoApi.get(`/talleres/${id}`);
        setTaller(res.data);
      } catch {
        setMensaje('Error al cargar el taller.');
      }
    };

    fetchTaller();
  }, [id]);

  // Formatear número de tarjeta como "1234 5678 9012 3456"
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  // Validar número de tarjeta (16 dígitos)
  const isValidCardNumber = (value) => /^\d{16}$/.test(value.replace(/\s/g, ''));

  // Validar vencimiento (MM/AA)
  const isValidVencimiento = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [mm, aa] = value.split('/').map(Number);
    if (mm < 1 || mm > 12) return false;
    // Opcional: validar que la fecha no sea pasada
    const now = new Date();
    const year = 2000 + aa;
    const month = mm - 1;
    const expDate = new Date(year, month + 1, 0);
    return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
  };

  // Validar CVV (3 o 4 dígitos)
  const isValidCvv = (value) => /^\d{3,4}$/.test(value);

  const handlePago = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMensaje('');
    setSuccess(false); // Reset on new attempt

    if (!tarjeta) {
      setMensaje('Por favor ingresa el número de tarjeta.');
      setIsLoading(false);
      return;
    }
    if (!vencimiento) {
      setMensaje('Por favor ingresa la fecha de vencimiento.');
      setIsLoading(false);
      return;
    }
    if (!cvv) {
      setMensaje('Por favor ingresa el CVV.');
      setIsLoading(false);
      return;
    }
    if (!isValidCardNumber(tarjeta)) {
      setMensaje('El número de tarjeta debe tener 16 dígitos.');
      setIsLoading(false);
      return;
    }
    if (!isValidVencimiento(vencimiento)) {
      setMensaje('El vencimiento debe tener formato MM/AA y ser válido.');
      setIsLoading(false);
      return;
    }
    if (!isValidCvv(cvv)) {
      setMensaje('El CVV debe tener 3 o 4 dígitos.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await paymentApi.post('/pagar', {
        usuario_id,
        taller_id: id
      });

      setMensaje(res.data.message);
      setSuccess(true); // Set success to true
      setTimeout(() => navigate('/mis-reservas'), 2000);
    } catch (err) {
      setSuccess(false); // Not a success
      if (err.response) {
        setMensaje('Ocurrió un error al procesar el pago.');
      } else {
        setMensaje('El servicio de pagos no está disponible en este momento.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '500px', width: '100%' }}>
        {taller ? (
          <>
            <h2 className="mb-4 text-center">Pago del Taller: {taller.nombre}</h2>
            <form onSubmit={handlePago} noValidate>
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="19"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  aria-required="true"
                  required={false}
                />
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Fecha de vencimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/AA"
                    maxLength="5"
                    value={vencimiento}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                      setVencimiento(val.slice(0, 5));
                    }}
                    aria-required="true"
                    required={false}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    inputMode="numeric"
                    aria-required="true"
                    required={false}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      style={{ width: '1rem', height: '1rem' }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Procesando pago...
                  </>
                ) : (
                  'Confirmar pago y reservar'
                )}
              </button>
              {mensaje && (
                <div className={`alert text-center mt-3 ${
                  success
                    ? 'alert-success'
                    : 'alert-danger'
                }`}>
                  {mensaje}
                </div>
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
