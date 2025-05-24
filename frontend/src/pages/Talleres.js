import React, { useEffect, useState } from 'react';
import { infoApi } from '../api';
import TallerCard from '../components/TallerCard';

function Talleres() {
  const [talleres, setTalleres] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const res = await infoApi.get('/talleres');
        setTalleres(res.data);
      } catch (err) {
        if (err.response) {
          setMensaje('Error al obtener talleres.');
        } else {
          setMensaje('El servicio de información no está disponible en este momento.');
        }
      }
    };

    fetchTalleres();
  }, []);

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
          <option value="Repostería">Repostería</option>
          <option value="Cocina Internacional">Cocina Internacional</option>
          <option value="Saludable">Cocina Saludable</option>
          <option value="Avanzado">Técnicas Avanzadas</option>
        </select>
      </div>

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      {talleresFiltrados.length > 0 ? (
        <div className="row">
          {talleresFiltrados.map((taller) => (
            <TallerCard key={taller.id} taller={taller} />
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
