import { useState } from 'react';
import PropTypes from 'prop-types';

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
        <h2>Login</h2>
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
        <h2>Valida tus credenciales de PKI</h2>
        <button onClick={handleShowLogin}>Validar PKI</button>
      </div>
    </>
  );
}

// Add prop types validation
Pki.propTypes = {
  handleShowLogin: PropTypes.func.isRequired, // Validate the prop type
};

export { Login, Pki };