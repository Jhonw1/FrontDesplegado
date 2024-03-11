import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gruas.css';
import Footer from '../footer/Footer'
import Grua1 from '../images/grua1.jpg';
import Grua2 from '../images/grua2.jpg';
import Grua3 from '../images/grua3.jpg';
import Grua4 from '../images/grua4.jpg';
import Grua5 from '../images/grua9.jpg';
import Grua6 from '../images/grua8.png';
import Grua7 from '../images/grua10.jpg';
import Grua8 from '../images/grua11.jpg';

// Importa el componente GruasP2
import GruasP2 from './GruasP2/GruasP2';

const gruasData = [
  {
    id: 1,
    nombre: 'GruaTec Uno',
    distancia: 5,
    calificacion: 4,
    imagen: Grua1,
  },
  {
    id: 2,
    nombre: 'SkySculptor 5000',
    distancia: 10,
    calificacion: 3.5,
    imagen: Grua2,
  },
  {
    id:3,
    nombre: 'AlzaEstrella Pro',
    distancia :20,
    calificacion: 2.0,
    imagen: Grua3,
  },
  {
    id: 4,
    nombre: 'SummitGrúa XR',
    distancia : 50,
    calificacion: 5.0,
    imagen: Grua4,
  },
  {
    id:5,
    nombre: 'SuperLift Master',
    distancia: 30,
    calificacion: 2.4,
    imagen: Grua5,
  },
  {
    id:6,
    nombre:'ElevaStar Pro',
    distancia: 25,
    calificacion: 3.5,
    imagen: Grua6,
  },
  {
    id:7,
    nombre: 'LevantaCielos S.A.',
    distancia:  9,
    calificacion: 1.0,
    imagen: Grua7,
  },
  {
    id:8,
    nombre: 'GruasExpress Internacional',
    distancia: 12,
    calificacion: 3.8,
    imagen: Grua8,
  }
];

const Gruas = () => {
  const [calificaciones, setCalificaciones] = useState({});
  const navigate = useNavigate();  // Obtiene la función de navegación

  const handleCalificacion = (id, rating) => {
    setCalificaciones((prevCalificaciones) => ({
      ...prevCalificaciones,
      [id]: rating,
    }));
  };

  const handleGruaClick = (id) => {
    // Navega a la página de perfil de la grúa al hacer clic
    navigate(`/grua/${id}`);
  };

  return (
    <div className="gruas-container">
      {/* Incluye el componente GruasP2 */}
      <GruasP2 />
      <div className="container-Image">
        <img className='imageG' src="https://cdn-icons-png.flaticon.com/128/5731/5731878.png" alt="" />
        <hr className='hrImage'/>
      </div>
      <div className="infoGruas">
        {gruasData.map((grua) => (
          <div key={grua.id} className="grua-item" onClick={() => handleGruaClick(grua.id)}>
            <img src={grua.imagen} alt={grua.nombre} className="grua-imagen" />
            <h2 className='tituloGruas'>{grua.nombre}</h2>
            <p>Distancia: {grua.distancia} km</p>
            <p>Calificación: {calificaciones[grua.id] || 'Sin calificación'}</p>
            <div className="calificacion-container">
              Calificar:
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleCalificacion(grua.id, star)}
                  className={star <= calificaciones[grua.id] ? 'star-filled' : 'star-empty'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer/>

    </div>

  );
};

export default Gruas;
