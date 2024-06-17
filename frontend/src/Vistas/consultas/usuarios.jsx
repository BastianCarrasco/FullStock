import axios from 'axios';

const Usuarios = async () => {
  try {
    const response = await axios.get('http://localhost:5150/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default Usuarios;
