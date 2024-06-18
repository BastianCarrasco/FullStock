import React, { useState, useEffect } from 'react';
import productoStock from '../consultas/productoStock';
import FormularioProducto from '../consultas/INSERT/insertProducto';
import eliminarProducto from '../consultas/DELETE/eliminarProducto';
import actualizarProducto from '../consultas/PUT/modificarProducto';

const Stock = () => {
  const [productos, setProductos] = useState([]);
  const [filtronombre, setFiltroNombre] = useState('');
  const [filtrocodigo, setFiltroCodigo] = useState('');
  const [filtrocategoria, setFiltroCategoria] = useState('');
  const [filtrodisponibilidad, setFiltroDisponibilidad] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para manejar la visibilidad del formulario
  const [modificarProducto, setModificarProducto] = useState(null); // Estado para manejar la modificación de productos
  const [precioModificado, setPrecioModificado] = useState('');
  const [cantidadModificada, setCantidadModificada] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const productos = await productoStock();
    setProductos(productos);
  };

  const handleNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleCodigoChange = (event) => {
    setFiltroCodigo(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setFiltroCategoria(event.target.value);
  };

  const handleDisponibilidadChange = (idproducto) => (event) => {
    const updatedProductos = productos.map((producto) =>
      producto.idproducto === idproducto
        ? { ...producto, disponibilidad: event.target.checked ? 'Disponible' : 'No disponible' }
        : producto
    );
    setProductos(updatedProductos);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario); // Cambia el estado para mostrar u ocultar el formulario
  };

  const abrirModificarProducto = (producto) => {
    setModificarProducto(producto);
    setPrecioModificado(producto.precio);
    setCantidadModificada(producto.cantidad);
  };

  const cerrarModificarProducto = () => {
    setModificarProducto(null);
    setPrecioModificado('');
    setCantidadModificada('');
  };

  const handleActualizarProductos = async () => {
    await fetchProductos();
  };

  const handleClickEliminar = async () => {
    await eliminarProducto(modificarProducto.idproducto);
    await handleActualizarProductos();
    cerrarModificarProducto();
  };

  const handleGuardar = async (event) => {
    event.preventDefault();

    const datosProducto = {
      ...modificarProducto,
      precio: precioModificado,
      cantidad: cantidadModificada
    };

    try {
      await actualizarProducto(modificarProducto.idproducto, datosProducto);
      await handleActualizarProductos();
      cerrarModificarProducto();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      // Manejar el error según tus necesidades
    }
  };

  const filteredProductos = productos.filter((producto) => {
    return (
      producto.nombre.toLowerCase().includes(filtronombre.toLowerCase()) &&
      producto.codigobarra.toLowerCase().includes(filtrocodigo.toLowerCase()) &&
      producto.tipo.toLowerCase().includes(filtrocategoria.toLowerCase()) &&
      (!filtrodisponibilidad || producto.disponibilidad === 'Disponible')
    );
  });

  return (
    <div>
      <div className='column'>
        <button onClick={toggleFormulario}>Añadir Producto</button>
        <button>Gestionar Promociones</button>
        <button onClick={handleActualizarProductos}>Actualizar Productos</button>
      </div>

      {mostrarFormulario && <FormularioProducto />} {/* Muestra el formulario si mostrarFormulario es true */}

      <div>
        <h2>Filtros</h2>
        <div>
          Nombre:
          <input
            type="text"
            value={filtronombre}
            onChange={handleNombreChange}
            placeholder="Nombre"
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
          Código:
          <input
            type="text"
            value={filtrocodigo}
            onChange={handleCodigoChange}
            placeholder="Código"
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
          Categoría:
          <select
            value={filtrocategoria}
            onChange={handleCategoriaChange}
            style={{ marginLeft: '10px', marginRight: '10px' }}
          >
            <option value="">Todos</option>
            <option value="Alimento">Alimento</option>
            <option value="Bebida">Bebida</option>
          </select>
          Disponibilidad:
          <input
            type="checkbox"
            checked={filtrodisponibilidad}
            onChange={() => setFiltroDisponibilidad(!filtrodisponibilidad)}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>

      <div>
        <h2>Productos</h2>
        <table style={{ width: '100%', border: 'solid', marginRight: '10px' }}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Nombre</th>
              <th style={{ width: '15%' }}>Código</th>
              <th style={{ width: '10%' }}>Categoría</th>
              <th style={{ width: '15%' }}>Precio</th>
              <th style={{ width: '15%' }}>Disponibilidad</th>
              <th style={{ width: '10%' }}>Cantidad</th>
              <th style={{ width: '10%' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.idproducto}>
                <td>{producto.nombre}</td>
                <td>{producto.codigobarra}</td>
                <td>{producto.tipo}</td>
                <td>{producto.precio}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={producto.disponibilidad === 'Disponible'}
                    onChange={handleDisponibilidadChange(producto.idproducto)}
                  />
                </td>
                <td>{producto.cantidad}</td>
                <td>
                  <button onClick={() => abrirModificarProducto(producto)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modificarProducto && (
        <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
          <h3>Modificar Producto</h3>
          <form onSubmit={handleGuardar}>
            <label>
              Nombre:
              <input type="text" value={modificarProducto.nombre} readOnly />
            </label>
            <label>
              Código:
              <input type="text" value={modificarProducto.codigobarra} readOnly />
            </label>
            <label>
              Precio:
              <input
                type="text"
                value={precioModificado}
                onChange={(event) => setPrecioModificado(event.target.value)}
              />
            </label>
            <label>
              Cantidad:
              <input
                type="text"
                value={cantidadModificada}
                onChange={(event) => setCantidadModificada(event.target.value)}
              />
            </label>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={cerrarModificarProducto}>Cancelar</button>
            <button
              type="button"
              onClick={handleClickEliminar}
            >
              Eliminar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Stock;
