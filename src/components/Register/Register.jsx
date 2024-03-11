import './Register.css';
import { SERVER_URL } from '../../constants/constants';
import { validateFields } from '../../constants/utils';

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
      alert('Usuario registrado exitosamente');
      window.location.href = '/login';
    } else {
      const errorData = await response.json(); // Intenta parsear la respuesta como JSON
      console.error('Error al registrar el usuario:', errorData);
      alert('Error al registrar el usuario. Consulta la consola para más detalles.');    }
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
