import { useState , useEffect } from 'react';
import axios from 'axios';
import { Login, Pki } from './login';
import '../CSS/App.css';
import '../CSS/index.css';
import Landing from './landing'; // Import the Landing component
 
function App() {

  const fetchAPI = async () =>{
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    console.log(response.data.users)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

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