import React, { useEffect, useState } from 'react';
import Usuarios from '../consultas/usuarios';
import pedido_proveedor from '../consultas/usuarios copy';
import CrearCuenta from './crearCuenta';
import eliminarUser from '../consultas/DELETE/eliminarUser';
import CrearProv from './crearProveedor';
import eliminarProveedor from '../consultas/DELETE/eliminarProveedor';

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [mostrarCrearCuenta, setMostrarCrearCuenta] = useState(false);
  const [reloadData, setReloadData] = useState(false); // Estado para forzar la recarga de datos
  const [mostrarCrearProv, setMostrarCrearProv] = useState(false); // Estado para mostrar el formulario de creación de proveedor

  useEffect(() => {
    cargarUsuarios();
    cargarProveedores();
  }, [reloadData]); // Ejecutar useEffect cada vez que reloadData cambie

  const cargarUsuarios = async () => {
    try {
      const dataUsuarios = await Usuarios(); // Suponiendo que Usuarios() es una función que obtiene la lista de usuarios
      setUsuarios(dataUsuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const cargarProveedores = async () => {
    try {
      const dataProveedores = await pedido_proveedor(); // Suponiendo que pedido_proveedor() es una función que obtiene la lista de proveedores
      setProveedores(dataProveedores);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const handleRegistrarCuenta = () => {
    setMostrarCrearCuenta(true);
  };

  const handleRegistrarProveedor = () => {
    setMostrarCrearProv(true); // Mostrar el formulario de creación de proveedor al hacer clic en Registrar Proveedor
  };

  const handleRegistrarPedido = () => {
    // Lógica para registrar un nuevo pedido de proveedor
    console.log('Registrar nuevo pedido');
  };

  const handleEliminarProveedor = async (idProveedor) => {
    try {
      await eliminarProveedor(idProveedor); // Llama a la función eliminarProveedor con el id del proveedor a eliminar
      // Después de eliminar, forzar la recarga de datos
      setReloadData(!reloadData); // Cambiar el estado para forzar la recarga
      console.log(`Proveedor con ID ${idProveedor} eliminado correctamente`);
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  const handleeliminarUser = async (idUsuario) => {
    try {
      await eliminarUser(idUsuario); // Llama a la función eliminarUser con el id del usuario a eliminar
      // Después de eliminar, forzar la recarga de datos
      setReloadData(!reloadData); // Cambiar el estado para forzar la recarga
      console.log(`Usuario con ID ${idUsuario} eliminado correctamente`);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleCreateSuccess = () => {
    setMostrarCrearProv(false); // Cierra el formulario de creación de proveedor
    setReloadData(!reloadData); // Forzar la recarga de datos
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'NULL'; // Devolver 'NULL' si dateString es null o undefined
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };


  return (
    <div><h3>ADMINISTRACIÓN</h3>
    <div className='container'>

      <div className='column'>
        <h2>Usuarios</h2>
        <button style={{ display: "flex", marginBottom: "10px" }} onClick={handleRegistrarCuenta}>
          Crear Cuenta
        </button>
        {mostrarCrearCuenta && <CrearCuenta onCreateSuccess={handleCreateSuccess} />}
        <table className='tabla-usuarios' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => console.log(`Modificar usuario con ID: ${usuario.id}`)}>Modificar</button>
                  <button onClick={() => handleeliminarUser(usuario.idusuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='column'>
        <h2>Proveedores</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <button onClick={handleRegistrarProveedor}>Registrar Proveedor</button>
          <button onClick={handleRegistrarPedido}>Registrar Pedido</button>
        </div>
        {mostrarCrearProv && <CrearProv onCreateSuccess={handleCreateSuccess} />}
        <table className='tabla-proveedores' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Solicitud</th>
              <th>Recepción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.infocontacto}</td>
                <td>{formatDate(proveedor.fechasolicitud)}</td>
                <td>{formatDate(proveedor.fecharecepcion)}</td>
                <td>
                  <button onClick={() => handleEliminarProveedor(proveedor.idproveedor)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Administrador;
