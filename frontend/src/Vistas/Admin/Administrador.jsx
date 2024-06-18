import React, { useEffect, useState } from 'react';
import Usuarios from '../consultas/usuarios';
import pedido_proveedor from '../consultas/usuarios copy';

const Administrador = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        cargarUsuarios();
        cargarProveedores();
    }, []);

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

    const handleRegistrarProveedor = () => {
        // Lógica para registrar un nuevo proveedor
        console.log('Registrar nuevo proveedor');
    };

    const handleRegistrarPedido = () => {
        // Lógica para registrar un nuevo pedido de proveedor
        console.log('Registrar nuevo pedido');
    };

    return (
        <div className='container'>
            <div className='column'>

                <h2>Usuarios</h2>
                <button style={{display:"flex", marginBottom:"10px"}} onClick={() => console.log('Agregar usuario/crear cuenta')}>Crear Cuenta</button>
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
                                    <button onClick={() => console.log(`Eliminar usuario con ID: ${usuario.id}`)}>Eliminar</button>
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
                <table className='tabla-proveedores' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Contacto</th>
                            <th>Solicitud</th>
                            <th>Recepción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.infocontacto}</td>
                                <td>{proveedor.fechasolicitud}</td>
                                <td>{proveedor.fecharecepcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Administrador;
