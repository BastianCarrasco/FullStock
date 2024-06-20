import React, { useEffect, useState, useRef } from 'react';
import getproducto from '../consultas/productos';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const Caja = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterType, setFilterType] = useState('');
  const tableRef = useRef(null); // Referencia al elemento de la tabla

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await getproducto();
        setItems(productos);
        setFilteredItems(productos); // Inicialmente mostramos todos los productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleItemClick = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.idproducto === item.idproducto);

    if (existingItem) {
      // Si el producto ya está en la lista, incrementamos la cantidad
      const updatedItems = selectedItems.map((selectedItem) =>
        selectedItem.idproducto === item.idproducto ? { ...selectedItem, cantidad: selectedItem.cantidad + 1 } : selectedItem
      );
      setSelectedItems(updatedItems);
    } else {
      // Si el producto no está en la lista, lo agregamos con cantidad inicial 1
      setSelectedItems([...selectedItems, { ...item, cantidad: 1 }]);
    }
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleSearchByBarcode = () => {
    // Buscar el producto por código de barras
    const foundItem = items.find((item) => item.codigobarra === barcode);

    if (foundItem) {
      // Verificar si el producto ya está en la lista de seleccionados
      const existingItem = selectedItems.find((selectedItem) => selectedItem.idproducto === foundItem.idproducto);

      if (existingItem) {
        // Si el producto ya está en la lista, incrementar la cantidad
        const updatedItems = selectedItems.map((selectedItem) =>
          selectedItem.idproducto === foundItem.idproducto ? { ...selectedItem, cantidad: selectedItem.cantidad + 1 } : selectedItem
        );
        setSelectedItems(updatedItems);
      } else {
        // Si el producto no está en la lista, agregarlo con cantidad inicial 1
        setSelectedItems([...selectedItems, { ...foundItem, cantidad: 1 }]);
      }

      setBarcode(''); // Limpiar el campo de código de barras después de la búsqueda
    } else {
      console.log('Producto no encontrado');
    }
  };

  const totalCantidad = selectedItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.cantidad * currentValue.precio;
  }, 0);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);

    if (selectedType === '') {
      setFilteredItems(items); // Mostrar todos los productos si se selecciona la opción vacía
    } else {
      const filtered = items.filter((item) => item.tipo === selectedType);
      setFilteredItems(filtered);
    }
  };

  const handleClearSelectedItems = () => {
    setSelectedItems([]);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    const tableElement = tableRef.current;

    html2canvas(tableElement).then((canvas) => {
      // Alinear y agregar encabezados de tabla
      const headers = ['Nombre', 'Precio', 'Cantidad'];
      const data = selectedItems.map(({ nombre, precio, cantidad }) => [nombre, precio, cantidad]);

      doc.autoTable({
        head: [headers],
        body: data,
        startY: 10, // Ajusta según necesites
      });

      // Guardar el documento PDF
      doc.save('productos_seleccionados.pdf');
    });
  };

  const handleRemoveItem = (idproducto) => {
    const updatedItems = selectedItems.filter((item) => item.idproducto !== idproducto);
    setSelectedItems(updatedItems);
  };

  return (
    <div className="container">
      <div className="column">
        <h2>Ingrese Código de Barras</h2>
        <input
          type="text"
          value={barcode}
          onChange={handleBarcodeChange}
          placeholder="Ingrese el código de barras"
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleSearchByBarcode}>Buscar</button>

        <h2>Productos Seleccionados</h2>
        <table ref={tableRef} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '20%' }}>Nombre</th>
              <th style={{ width: '15%' }}>Precio Unitario</th>
              <th style={{ width: '30%' }}>Descripción</th>
              <th style={{ width: '10%' }}>Cantidad</th>
              <th style={{ width: '15%' }}>Total</th>
              <th style={{ width: '10%' }}>Acciones</th> {/* Columna de acciones */}
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.idproducto}>
                <td>{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio * item.cantidad}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.idproducto)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <strong>Total General:</strong> {totalCantidad}
        </div>
        <button onClick={handleClearSelectedItems} style={{ marginTop: '10px' }}>
          Borrar Productos Seleccionados
        </button>
      </div>

      <div className="column">
        <h2>Filtrar por Tipo</h2>
        <select value={filterType} onChange={handleFilterChange} style={{ marginBottom: '10px' }}>
          <option value="">Mostrar Todos</option>
          <option value="Alimento">Alimentos</option>
          <option value="Bebida">Bebidas</option>
        </select>

        <h2>Lista de Productos</h2>
        {filteredItems.map((item) => (
          <button style={{ marginRight: '5px' }} key={item.idproducto} onClick={() => handleItemClick(item)}>
            {item.nombre}
            <br />
            {item.codigobarra}
          </button>
        ))}
        <br></br>
        <button onClick={handlePrintPDF} style={{ marginTop: '10px' }}>
          Imprimir PDF
        </button>
      </div>
    </div>
  );
};

export default Caja;
