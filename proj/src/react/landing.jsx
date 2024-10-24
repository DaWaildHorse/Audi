import { useState} from 'react';
import '../CSS/App.css';
import '../CSS/index.css';
import '../CSS/landing.css';
import Navbar from './navbar';

import DataGraph from './Graph';


function Landing() {
  const [puesto] = useState('');
  const [turno] = useState('');
  const [prediccion] = useState('7 días');
  
  //const[array , setArray] = useState([]);


  /*const fetchAPI = async () =>{
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  }, []);

  */
  
  const handleSend = () => {
    console.log('Enviando datos:', { puesto, turno, prediccion });
    // You can send the data to an API or save it in local storage if needed
  };

  return (
    <>
      <div className='m-0 landing overflow-x-hidden'>
        <Navbar />
        <div className="containercs w-full pt-4 pl-4 pb-4  h-full">
          <h1 className="text-black text-left text-5xl mb-8">Predicción de Ausentismo Total</h1>

          {/* New Grid Section for Graph and List */}
          <div className="grid grid-cols-4 gap-6 mb-8 h-96"> {/* Adjusted gap */}
            <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg"> {/* Graph Placeholder */}
              <h2 className="text-xl font-bold mb-4">Graph</h2>
              <div id='output' className="h-80 bg-gray-300 flex items-center justify-center"> 
              <DataGraph/>  
              </div>
            </div>
            <div className="col-span-1 bg-gray-200 p-6 h-full rounded-lg shadow-lg"> {/* List Placeholder */}
              <h2 className="text-xl font-bold mb-4">Lista por Dias</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Dia</th>
                      <th scope="col" className="px-6 py-3">Numero de Ausentes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 1</th>
                      <td className="px-6 py-4">0</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 2</th>
                      <td className="px-6 py-4">1</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 3</th>
                      <td className="px-6 py-4">3</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 4</th>
                      <td className="px-6 py-4">4</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 5</th>
                      <td className="px-6 py-4">10</td>
                    </tr>

                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 5</th>
                      <td className="px-6 py-4">32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mb-8 mt-32"> {/* Adjusted gap */}
            <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg"> {/* Graph Placeholder */}
              <h2 className="text-xl font-bold mb-4">Graph</h2>
              {/* You can replace this with your actual graph component */}
              <div className="h-80 bg-gray-300 flex items-center justify-center">La Grafica va aqui</div>
            </div>
            <div className="col-span-1 bg-gray-200 p-6 h-full rounded-lg shadow-lg"> {/* List Placeholder */}
              <h2 className="text-xl font-bold mb-4">Lista por Dias</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Dia</th>
                      <th scope="col" className="px-6 py-3">Numero de Ausentes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 8</th>
                      <td className="px-6 py-4">22</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 9</th>
                      <td className="px-6 py-4">12</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 10</th>
                      <td className="px-6 py-4">2022</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 11</th>
                      <td className="px-6 py-4">122</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 12</th>
                      <td className="px-6 py-4">0</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 12</th>
                      <td className="px-6 py-4">Que me ves?</td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Dia 12</th>
                      <td className="px-6 py-4">Pink</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col items-start">
          <h1 className="text-black text-left text-5xl mb-8">Busqueda de Ausentismo Por Departamento</h1>
            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
              <form className="max-w-sm mx-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Departamento
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled selected>
        Seleccionar...
        </option>
        <option value="chamba1">chamba1</option>
        <option value="chamba2">chama2</option>
        <option value="chamba3">chamba4</option>
        <option value="chamba4">chamba5</option>
      </select>
    </form>
              </div>
              <div className="flex-1">
              <form className="max-w-sm mx-auto">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
      Turno
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled selected>
          Seleccionar...
        </option>
        <option value="Mañana">Mañana</option>
        <option value="Tarde">Tarde</option>
        <option value="Noche">Noche</option>
        <option value="Rotativa">Rotativa</option>
      </select>
    </form>
              </div>
              <button
              onClick={handleSend}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Predecir
            </button>
            </div>
            
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Landing;
