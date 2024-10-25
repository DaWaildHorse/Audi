import { useState} from 'react';
import PropTypes from 'prop-types';
import '../CSS/App.css';
import '../CSS/index.css';



function Login({ onSuccessfulLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = () => {
    if (username === 'audi' && password === 'audi') {
      setMessage('Login successful!');
      onSuccessfulLogin(); // Call the function to navigate to Landing
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <>
      <div className='overflow-y-hidden bodylogin'>
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
        <div className="flex flex-col items-center justify-center h-screen mt-8 relative overflow-y-hidden">
        <div className="block mt-5 text-xl max-w-sm p-10 rounded-lg opacity-70 shadow  bg-Progressive-Red/60 hover:bg-Progressive-Red">
          <h2 className='PAPA text-center mb-4 text-6xl tracking-wide text-white'>Inicia Sesión</h2>
            <div className="flex flex-col  mt-5  overflow-y-hidden" >
            <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 border bg-black border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border bg-black border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="p-2 bg-Progressive-Red-500 bg-black text-white rounded"
          >
            Aceptar
          </button>
          {message && <p className='mt-4 text-white'>{message}</p>}
        </div>
        </div>
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
      <div className='bodylogin'>
        {/* Video background with zoom and black filter */}
        <div className="video-container overflow-y-hidden ">
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
        <div className="flex flex-col items-center justify-center h-screen mt-44 relative overflow-y-hidden">
          <div className="flex flex-col items-center justify-items-stretch h-screen">
            <h1 className="PAPA nunito-sans-title  text-center mb-4  text-7xl tracking-wide text-Progressive-Red leading-normal">
              Predictor de ausencia <br /> de personal AUDI (PAPA)
            </h1>
            <div className="block mt-5 text-xl max-w-sm p-10 rounded-lg opacity-70 shadow  bg-Progressive-Red/60 hover:bg-Progressive-Red">
              <h2 className="text-center text-2xl btn">Valida tus credenciales <br />para acceder al sistema</h2>
              <button className="block mx-auto mt-4 p-2 bg-black text-white rounded" onClick={handleShowLogin}>
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