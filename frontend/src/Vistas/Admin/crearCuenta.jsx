// CrearCuenta.js
import React, { useState } from 'react';
import insertarUsuario from '../consultas/INSERT/insertarUsuario';

const CrearCuenta = ({ onCreateSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usuario = { nombre, apellido, email, password };

    try {
      const response = await insertarUsuario(usuario);
      alert(response.message); // Asegúrate de que response.message sea adecuado según la estructura de tu respuesta
      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');
      onCreateSuccess(); // Llama a la función de éxito
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      alert(`Error al crear la cuenta: ${error.message}`);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '500px', margin: '20px auto' }}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='form-control'
          />
        </div>
        <button type="submit" className='btn btn-primary'>Crear Cuenta</button>
      </form>
    </div>
  );
};

export default CrearCuenta;
