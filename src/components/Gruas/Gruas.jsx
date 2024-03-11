// Gruas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gruas.css';
import Footer from '../footer/Footer';
import GruasP2 from './GruasP2/GruasP2';

const Gruas = () => {
  const [gruas, setGruas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getGruasInfo')
      .then((response) => {
        setGruas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener grúas desde el backend:', error);
      });
  }, []);

  const openWhatsAppChat = (phoneNumber) => {
    const whatsappNumber = `+573146340714`;  // Reemplaza con el número de teléfono de la grúa
    const message = 'Hola, estoy interesado en tus servicios de grúa.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="gruas-container">
      <GruasP2 />
      <div className="container-Image">
        <img className='imageG' src="https://cdn-icons-png.flaticon.com/128/5731/5731878.png" alt="" />
        <hr className='hrImage'/>
      </div>
      <div className="gruas-list">
        {gruas.map((grua) => (
          <div key={grua.id} className="grua-item">
            <img src={`http://localhost:3000${grua.foto_path}`} alt={grua.marca} className="grua-imagen" />
            <h2 className='tituloGruas'>{grua.marca}</h2>
            <p>Modelo: {grua.modelo}</p>
            <p>Capacidad: {grua.capacidad}</p>
            <button className="contactar-btn" onClick={() => openWhatsAppChat(grua.phone)}>Contactar por WhatsApp</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Gruas;
