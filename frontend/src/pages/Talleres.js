import React, { useEffect, useState } from 'react';
import { infoApi } from '../api';
import TallerCard from '../components/TallerCard';

function Talleres() {
  const [talleres, setTalleres] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]); // Nuevo estado para categorías dinámicas
  const usuario_id = localStorage.getItem('usuario_id');

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const res = await infoApi.get('/talleres');
        setTalleres(res.data);

        // Obtener categorías únicas dinámicamente
        const cats = Array.from(
          new Set(res.data.map((t) => t.categoria).filter(Boolean))
        );
        setCategorias(cats);
      } catch (err) {
        if (err.response) {
          setMensaje('Error al obtener talleres.');
        } else {
          setMensaje('El servicio de información no está disponible en este momento.');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchReservas = async () => {
      if (!usuario_id) return;
      try {
        const res = await infoApi.get(`/mis-reservas/${usuario_id}`);
        setReservas(res.data);
        localStorage.setItem('reservas_usuario', JSON.stringify(res.data));
      } catch {
        // No mostrar mensaje aquí para no sobreescribir el de talleres
      }
    };

    setLoading(true);
    fetchTalleres();
    fetchReservas();
  }, [usuario_id]);

  const talleresFiltrados = categoria
    ? talleres.filter((t) => t.categoria === categoria)
    : talleres;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Talleres Disponibles</h2>

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

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      {loading ? (
        <div className="alert alert-info text-center">Cargando talleres...</div>
      ) : talleresFiltrados.length > 0 ? (
        <div className="row">
          {talleresFiltrados.map((taller) => (
            <TallerCard key={taller.id} taller={taller} reservas={reservas} />
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          No hay talleres disponibles en esta categoría.
        </div>
      )}
    </div>
  );
}

export default Talleres;
