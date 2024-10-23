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
      <div>
        <h2 className='text-green-900'>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    </>
  );
}

// Prop validation
Login.propTypes = {
  onSuccessfulLogin: PropTypes.func.isRequired,
};


function Pki({ handleShowLogin }) {
  return (
    <>
    <div>
        <h1 className='text-slate-950 PAPA'>Predictor Ausentismo Perfecto Audi (PAPA)</h1>
      <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <h2>Valida tus credenciales de PKI</h2>
        <button onClick={handleShowLogin}>Validar PKI</button>
      </div>

      </div>
    </>
  );
}

// Add prop types validation
Pki.propTypes = {
  handleShowLogin: PropTypes.func.isRequired, // Validate the prop type
};

export { Login, Pki };