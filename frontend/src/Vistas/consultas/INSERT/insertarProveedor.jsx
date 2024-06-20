import axios from 'axios';

const insertarProv = async (Prov) => {
  try {
    const response = await axios.post('http://localhost:5150/insertarProv', Prov);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export default insertarProv;