import axios from 'axios';

const eliminarProducto = async (idProducto) => {
  try {
    const response = await axios.delete(`http://localhost:5150/producto/${idProducto}`);
    console.log(response.data.message); // Mensaje de éxito desde el servidor
    return response.data.message; // Retorna el mensaje de éxito
  } catch (error) {
    console.error('Error al eliminar el producto', error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
};

export default eliminarProducto;
