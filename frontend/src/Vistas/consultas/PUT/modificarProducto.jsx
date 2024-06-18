import axios from 'axios';

const actualizarProducto = async (idProducto, datosProducto) => {
  try {
    const response = await axios.put(`http://localhost:5150/productoPut/${idProducto}`, datosProducto);
    return response.data; // Devuelve los datos de respuesta si es necesario
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error; // Puedes manejar el error o relanzarlo según sea necesario
  }
};

export default actualizarProducto;
