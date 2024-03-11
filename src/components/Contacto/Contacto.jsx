// Contacto.jsx

import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/enviar-formulario-contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Formulario enviado correctamente');
        // Aquí puedes hacer algo después de enviar el formulario, como mostrar un mensaje de éxito o redirigir a otra página
      } else {
        console.error('Error al enviar el formulario:', response.statusText);
        // Aquí puedes manejar el error de envío del formulario
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Aquí puedes manejar el error de conexión o cualquier otro error
    }
  };

  return (
    <div className="contact-container">
      <h2 className='tituloContacto'>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className='letra' htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className='letra' htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className='letra' htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className='buttoncontac' type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;
