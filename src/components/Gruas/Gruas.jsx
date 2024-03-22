import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gruas.css';
import Footer from '../footer/Footer';
import GruasP2 from './GruasP2/GruasP2';
import AgregarGrua from '../AgregarGrua/AgregarGrua'; // Importa el componente AgregarGrua
import { SERVER_URL } from '../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Gruas = () => {
  const [gruas, setGruas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda

  useEffect(() => {
    axios.get(`${SERVER_URL}/getGruasInfo`)
      .then((response) => {
        setGruas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener grúas desde el backend:', error);
      });
  }, []);

  const openWhatsAppChat = (grua) => {
    if (grua && grua.whatsapp) {
      const whatsappNumber = grua.whatsapp;
      const message = 'Hola, estoy interesado en tus servicios de grúa.';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.error('El objeto grua no tiene la propiedad "whatsapp" definida.');
    }
  };

  // Función para filtrar las grúas según el término de búsqueda
  const filteredGruas = gruas.filter((grua) => {
    // Filtrar por marca, modelo o capacidad
    const searchString = `${grua.marca} ${grua.modelo} ${grua.capacidad}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="gruas-container">
      <AgregarGrua /> {/* Agrega el componente AgregarGrua aquí */}
      <GruasP2 />
      <div className="container-Image">
        <img className='imageG' src="https://cdn-icons-png.flaticon.com/128/5731/5731878.png" alt="" />
        <hr className='hrImage'/>
      </div>
      {/* Agregar el input de búsqueda */}
      <div className="search-container">
    <input
      className='search'
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
      <div className="gruas-list">
        {filteredGruas.map((grua) => (
          <div key={grua.id} className="grua-item">
            <img src={`${SERVER_URL}${grua.foto_path}`} alt={grua.marca} className="grua-imagen" />
            <h2 className='tituloGruas'>{grua.marca}</h2>
            <p>Modelo: {grua.modelo}</p>
            <p>Capacidad: {grua.capacidad}</p>
            <button className="contactar-btn" onClick={() => openWhatsAppChat(grua)}> WhatsApp <img className='logoWhatsapp' src="https://cdn-icons-png.flaticon.com/128/15047/15047389.png" alt=""/> </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Gruas;
