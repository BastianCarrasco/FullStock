import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Caja from './Vistas/Caja/Caja';
import Home from './Vistas/Home/Home';
import Stock from './Vistas/Stock/Stock';
import Ventas from './Vistas/Ventas/Ventas';
import Administrador from './Vistas/Admin/Administrador';
import { useEffect, useState } from 'react';
import Usuarios from './Vistas/consultas/usuarios';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [user, setUser] = useState(null);
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const users = await Usuarios();
      setUserlist(users);
    };

    fetchUsuarios();
  }, []);

  const handleLogin = () => {
    // Verificar si el usuario y la clave están en userlist
    const foundUser = userlist.find(u => u.nombre === usuario && u.password === clave);

    if (foundUser) {
      if (usuario === 'Camila' && clave === 'Evian') {
        setUser(foundUser.nombre);
      } else {
        setUser(foundUser.nombre); // Esto permite que cualquier usuario autenticado vea las otras vistas
      }
    } else {
      alert('Usuario o clave incorrectos');
    }
  };

  return (
    <Router>
      <div id="root">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/caja">Caja</Link>
                </li>
                <li>
                  <Link to="/stock">Stock</Link>
                </li>
                <li>
                  <Link to="/ventas">Ventas</Link>
                </li>
                {user === 'Camila' && (
                  <li>
                    <Link to="/admin">Administrador</Link>
                  </li>
                )}
                <li>{user}</li>
              </>
            )}
          </ul>
        </nav>

        <h1>Full$Stock</h1>

        <div className="content">
          {!user && (
            <div>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Clave"
                value={clave}
                onChange={e => setClave(e.target.value)}
              />
              <br />
              <button onClick={handleLogin}>Iniciar sesión</button>
            </div>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            {user && (
              <>
                <Route path="/caja" element={<Caja />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/ventas" element={<Ventas />} />
                {user === 'Camila' && (
                  <Route path="/admin" element={<Administrador />} />
                )}
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
