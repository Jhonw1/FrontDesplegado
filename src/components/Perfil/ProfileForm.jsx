import React, { useState } from 'react';
import './ProfileForm.css';
import { useSelector } from 'react-redux';

function ProfileForm() {
  const user = useSelector((state) => state.client?.client);
  const defaultProfileImage = 'https://cdn-icons-png.flaticon.com/128/1946/1946392.png';
  
  const [photo, setPhoto] = useState(user?.photo || defaultProfileImage);


  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto ? URL.createObjectURL(selectedPhoto) : defaultProfileImage);
  };

  return (
    <section className='section-perfil'>
      <div className="profile-editor">
        <h2>Editar perfil</h2>

        <div className="form-group circular-photo-container">
          <img className="profile-photo" src={photo} alt="Perfil" />

          <div className="option-cambiar">
            <label htmlFor="photo">Cambiar foto</label>
            <input className='input-cambiar' type="file" name="photo" id="photo" onChange={handlePhotoChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="user">Usuario:</label>
          <input
            className='input-user'
            type="text"
            name="user"
            id="user"
            value={user?.user ?? "undefined"}
          // onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            className='input-phoneNumber'
            type="text"
            name="phone"
            id="phone"
            value={user?.phone ?? "undefined"}
          // onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            className='input-email'
            type="email"
            id="email"
            value={user?.email ?? "undefined"}
          // onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button>Enviar</button>
      </div>
    </section>
  );
}

export default ProfileForm;
