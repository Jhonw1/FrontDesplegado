import './Register.css';
import { SERVER_URL } from '../../constants/constants';
import { validateFields } from '../../constants/utils';
import Swal from 'sweetalert2'

export default function Register() {

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    let fields;
    try {
      fields = validateFields(username, email, phone, password);
    } catch (error) {
      alert(error.message);
      return;
    }
    console.log(fields);
    const response = await fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(fields),
    });

   
    if (response.ok) {
      Swal.fire({
        title: 'Registro correcto',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'my-popup-class', // Nombre de la clase personalizada
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } else {
      const errorData = await response.json(); // Intenta parsear la respuesta como JSON
      console.error('Error al registrar el usuario:', errorData);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registro incorrecto",
      });  
     }
  };

  return (
    <section className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="tituloRegister">Registro</h2>
        <label className='label-register'>
          Usuario:
          <input className='input-register' type="text" name="username" />
        </label >
        <label className='label-register'>
          Correo electrónico:
          <input className='input-register' type="email" name="email" />
        </label>
        <label className='label-register'>
          Número telefónico:
          <input className='input-register' type="tel" name="phone" />
        </label>
        <label className='label-register'>
          Contraseña:
          <input className='input-register' type="password" name="password" />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
}
