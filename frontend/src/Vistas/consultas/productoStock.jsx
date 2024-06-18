import axios from 'axios';

const productoStock = async () => {
  try {
    const response = await axios.get('http://localhost:5150/productoStock');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default productoStock;