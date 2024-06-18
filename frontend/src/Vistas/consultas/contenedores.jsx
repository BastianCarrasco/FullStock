import axios from 'axios';

const getcontenedor = async () => {
  try {
    const response = await axios.get('http://localhost:5150/contenedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getcontenedor;