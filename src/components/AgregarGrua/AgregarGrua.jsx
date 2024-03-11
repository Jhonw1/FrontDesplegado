import React, { useState } from 'react';
import axios from 'axios';

function AgregarGrua() {
  const [gruaInfo, setGruaInfo] = useState({
    marca: '',
    modelo: '',
    capacidad: '',
    // Otros campos de información de la grúa
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGruaInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    try {
      // Realizar la solicitud al servidor para guardar la información de la grúa
      await axios.post('http://tu-api.com/gruas', gruaInfo);

      // Limpiar el formulario después de la publicación exitosa
      setGruaInfo({
        marca: '',
        modelo: '',
        capacidad: '',
        // Limpiar otros campos del formulario si es necesario
      });

      // Puedes agregar una lógica adicional aquí, como mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al publicar la grúa:', error.message);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  };

  return (
    <div>
      <h2>Publicar nueva grúa</h2>
      <form>
        <div>
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={gruaInfo.marca}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={gruaInfo.modelo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="capacidad">Capacidad:</label>
          <input
            type="text"
            id="capacidad"
            name="capacidad"
            value={gruaInfo.capacidad}
            onChange={handleInputChange}
          />
        </div>
        {/* Agrega más campos según sea necesario */}
        <button type="button" onClick={handlePublish}>
          Publicar
        </button>
      </form>
    </div>
  );
}

export default AgregarGrua;
