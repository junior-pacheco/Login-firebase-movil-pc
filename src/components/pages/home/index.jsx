import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { FaSignOutAlt } from 'react-icons/fa';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Home = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirige a la página de inicio de sesión
      history.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <div className="flex h-screen items-center text-white justify-center bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido a la Página de Inicio!</h1>
        {loggedIn && (
          <div className="mb-4">
            <p className="text-lg text-teal-500">¡Hola, {auth.currentUser.email}!</p>

          </div>
        )}
        <p className="text-lg">Esperamos que disfrutes de tu experiencia.</p>
        <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={30}/>
        </button>
        {/* Puedes agregar más contenido según sea necesario */}
      </div>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
