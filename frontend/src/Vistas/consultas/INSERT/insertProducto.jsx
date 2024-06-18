import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getproveedor from '../proveedor';
import getcontenedor from '../contenedores';


const FormularioProducto = () => {
  const [producto, setProducto] = useState({
    idproveedor: 0,
    idcontenedor: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    tipo: '',
    codigobarra: '',
    marca: '',
    descuento: 0
  });

  const [proveedores, setProveedores] = useState([]);
  const [contenedores, setContenedores] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      const proveedoresData = await getproveedor();
      setProveedores(proveedoresData);
    };

    const fetchContenedores = async () => {
      const contenedoresData = await getcontenedor();
      setContenedores(contenedoresData);
    };

    fetchProveedores();
    fetchContenedores();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let numericValue = value;

    if (name === 'idproveedor' || name === 'idcontenedor') {
      numericValue = parseInt(value, 10); // Convertir a número entero
    } else if (name === 'precio' || name === 'descuento') {
      numericValue = parseFloat(value); // Convertir a número decimal
    }

    setProducto({ ...producto, [name]: numericValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5150/insertarProducto', producto);
      console.log(response.data);

      // Mostrar mensaje de éxito y resetear el formulario
      setMensaje('Producto ingresado correctamente');
      setTimeout(() => {
        setMensaje('');
        setProducto({
          idproveedor: 0,
          idcontenedor: 0,
          nombre: '',
          precio: 0,
          descripcion: '',
          tipo: '',
          codigobarra: '',
          marca: '',
          descuento: 0
        });
      }, 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al insertar el producto', error);
      setMensaje('Error al insertar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mensaje && <p style={{ color: mensaje.includes('correctamente') ? 'green' : 'red' }}>{mensaje}</p>}
      <label>
        ID Proveedor:
        <select
          name="idproveedor"
          value={producto.idproveedor}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        >
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.idproveedor}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </label>

      <label>
        ID Contenedor:
        <select
          name="idcontenedor"
          value={producto.idcontenedor}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        >
          <option value="">Selecciona un contenedor</option>
          {contenedores.map((contenedor) => (
            <option key={contenedor.id} value={contenedor.id}>
              {contenedor.idcontenedor}
            </option>
          ))}
        </select>
      </label>

      <br></br>

      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Precio:
        <input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Descripción:
        <input
          type="text"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Tipo:
        <input
          type="text"
          name="tipo"
          value={producto.tipo}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Código de Barras:
        <input
          type="text"
          name="codigobarra"
          value={producto.codigobarra}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Marca:
        <input
          type="text"
          name="marca"
          value={producto.marca}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>

      <label>
        Descuento:
        <input
          type="text"
          name="descuento"
          value={producto.descuento}
          onChange={handleChange}
          style={{ marginRight: "20px", marginLeft: "20px", marginTop: "5px" }}
        />
      </label>
      <br></br><br></br>

      <button type="submit">Insertar Producto</button>
    </form>
  );
};

export default FormularioProducto;
