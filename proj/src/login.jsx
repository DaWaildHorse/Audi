import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './index.css';

function Login({ onSuccessfulLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setMessage('Login successful!');
      onSuccessfulLogin(); // Call the function to navigate to Landing
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <>
      <div className='overflow-y-hidden'>
        {/* Video background with black filter */}
        <div className="video-container overflow-y-hidden">
          <iframe
            className="background-video"
            src="https://www.youtube.com/embed/Qi-WbN3aUyM?autoplay=1&mute=1&controls=0&start=10&showinfo=0&modestbranding=1&rel=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* Black overlay */}
          <div className="black-overlay"></div>
        </div>

        {/* Login form content */}
        <div className="flex flex-col items-center justify-center h-screen mt-28 relative overflow-y-hidden">
          <h2 className='PAPA text-center mb-4 text-6xl tracking-wide text-Progressive-Red'>Inicia Sesion</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="p-2 bg-Progressive-Red-500 text-white rounded"
          >
            Aceptar
          </button>
          {message && <p className='mt-4 text-red-600'>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;


// Prop validation
Login.propTypes = {
  onSuccessfulLogin: PropTypes.func.isRequired,
};


function Pki({ handleShowLogin }) {
  return (
    <>
      <div>
        {/* Video background with zoom and black filter */}
        <div className="video-container overflow-y-hidden">
          <iframe
            className="background-video overflow-y-hidden"
            src="https://www.youtube.com/embed/Qi-WbN3aUyM?autoplay=1&mute=1&controls=0&start=10&showinfo=0&modestbranding=1&rel=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* Black overlay */}
          <div className="black-overlay overflow-y-hidden"></div>
        </div>

        {/* Overlay content */}
        <div className="flex flex-col items-center justify-center h-screen mt-72 relative overflow-y-hidden">
          <div className="flex flex-col items-center justify-items-stretch h-screen">
            <h1 className="PAPA text-center mb-4 text-6xl tracking-wide text-Progressive-Red">
              Predictor Ausentismo <br /> Audi
            </h1>
            <div className="block mt-5 text-xl max-w-sm p-10 rounded-lg shadow hover:bg-gray-100 bg-Progressive-Red/90 dark:hover:bg-Progressive-Red">
              <h2 className="text-center btn">Valida tus credenciales <br />para acceder al sistema</h2>
              <button className="block mx-auto mt-4 p-2 bg-Progressive-Red-500 text-white rounded" onClick={handleShowLogin}>
                Validar PKI
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Pki.propTypes = {
  handleShowLogin: PropTypes.func.isRequired,
};


// Add prop types validation
Pki.propTypes = {
  handleShowLogin: PropTypes.func.isRequired, // Validate the prop type
};

export { Login, Pki };