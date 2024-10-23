import { useState } from 'react';
import { Login, Pki } from './login';
import './App.css';
import './index.css';

import Landing from './landing'; // Import the Landing component
 
function App() {
  const [currentComponent, setCurrentComponent] = useState('pki'); // Track current component
 
  const handleShowLogin = () => {
    setCurrentComponent('login'); // Show the Login component
  };
 
  const handleSuccessfulLogin = () => {
    setCurrentComponent('landing'); // Navigate to Landing on successful login
  };
 

  return (
    <div>
      {currentComponent === 'landing' && <Landing />} {/* Render Landing component */}
      {currentComponent === 'login' && (
        <Login onSuccessfulLogin={handleSuccessfulLogin} /> // Pass the function to Login
      )}
      {currentComponent === 'pki' && (
        <Pki handleShowLogin={handleShowLogin} />// Pass the function to Pki
      )}
    </div>
  );
}
export default App;