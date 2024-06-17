import axios from 'axios';

const getproducto = async () => {
  try {
    const response = await axios.get('http://localhost:5150/producto');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getproducto;
