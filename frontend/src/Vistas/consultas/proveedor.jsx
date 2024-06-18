import axios from 'axios';

const getproveedor = async () => {
  try {
    const response = await axios.get('http://localhost:5150/proveedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getproveedor;