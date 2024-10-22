import { useState } from 'react';
import './App.css';
import { Login, Pki } from './login';
<<<<<<< HEAD
import Landing from './Landing'; // Import the Landing component

function App() {
  const [currentComponent, setCurrentComponent] = useState('pki'); // Track current component

  const handleShowLogin = () => {
    setCurrentComponent('login'); // Show the Login component
  };

  const handleSuccessfulLogin = () => {
    setCurrentComponent('landing'); // Navigate to Landing on successful login
  };

=======
import Landing from './landing'; // Import the Landing component
 
function App() {
  const [currentComponent, setCurrentComponent] = useState('pki'); // Track current component
 
  const handleShowLogin = () => {
    setCurrentComponent('login'); // Show the Login component
  };
 
  const handleSuccessfulLogin = () => {
    setCurrentComponent('landing'); // Navigate to Landing on successful login
  };
 
>>>>>>> ac8c6a0 (landing)
  return (
    <div>
      {currentComponent === 'landing' && <Landing />} {/* Render Landing component */}
      {currentComponent === 'login' && (
        <Login onSuccessfulLogin={handleSuccessfulLogin} /> // Pass the function to Login
      )}
      {currentComponent === 'pki' && (
        <Pki handleShowLogin={handleShowLogin} /> // Pass the function to Pki
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
 
>>>>>>> ac8c6a0 (landing)
export default App;