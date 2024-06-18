import axios from 'axios';

const pedido_proveedor = async () => {
  try {
    const response = await axios.get('http://localhost:5150/pedido_proveedor');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default pedido_proveedor;
