import axios from 'axios';

const eliminarProveedor = async (idUsuario) => {
    try {
        const response = await axios.delete(`http://localhost:5150/eliminarProv/${idUsuario}`);
        console.log(response.data); // Mensaje de éxito
        // Realizar otras acciones después de eliminar, como actualizar la lista de usuarios
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    };

export default  eliminarProveedor;