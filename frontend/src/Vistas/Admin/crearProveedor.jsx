import React from 'react'
import insertarProv from '../consultas/INSERT/insertarProveedor'
import { useState,useEffect } from 'react';

const CrearProv = ({ onCreateSuccess }) => {
    const [nombre, setNombre] = useState('');
    const [infoContacto, setInfoContacto] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      const proveedor = { nombre, infocontacto: infoContacto }; // Ajusta la estructura del proveedor
      try {
        const response = await insertarProv(proveedor); // Llama a la función insertarProv con el proveedor
        alert(response.message); // Asegúrate de que response.message sea adecuado según la estructura de tu respuesta
        setNombre('');
        setInfoContacto('');
        onCreateSuccess(); // Llama a la función de éxito
      } catch (error) {
        console.error('Error al crear el proveedor:', error);
        alert(`Error al crear el proveedor: ${error.message}`);
      }
    };

    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '500px', margin: '20px auto' }}>
        <h2>Crear Proveedor</h2>
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
            <label>Info de Contacto:</label>
            <input
              type="text"
              value={infoContacto}
              onChange={(e) => setInfoContacto(e.target.value)}
              required
              className='form-control'
            />
          </div>
          <button type="submit" className='btn btn-primary'>Crear Proveedor</button>
        </form>
      </div>
    );
  };

  export default CrearProv;