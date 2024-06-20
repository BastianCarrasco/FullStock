import axios from 'axios';

const insertarUsuario = async (usuario) => {
  try {
    const response = await axios.post('http://localhost:5150/insertarUsuario', usuario);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export default insertarUsuario;
