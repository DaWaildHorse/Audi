import { useState} from 'react';
import '../CSS/App.css';
import '../CSS/index.css';
import '../CSS/landing.css';
import LogoBW from '../assets/LogoBW.png';
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
      <nav 
          className="relative border flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
          data-twe-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="flex items-center">
              <button
                className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                type="button"
                data-twe-collapse-init
                data-twe-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span
                  className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div
              className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
              id="navbarSupportedContentY"
              data-twe-collapse-item
            >
              <ul
                className="me-auto flex flex-col lg:flex-row"
                data-twe-navbar-nav-ref
              >
                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <img
                    className="block w-16 h-auto text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    data-twe-nav-link-ref
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    src={LogoBW}
                    alt="audilogo"
                  />
                </li>
                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <a
                    className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    href="#!"
                    data-twe-nav-link-ref
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <a
                    className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    href="#!"
                    data-twe-nav-link-ref
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <a
                    className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    href="/App.jsx"
                    data-twe-nav-link-ref
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    About
                  </a>
                </li>
                <li className="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                  <a
                    className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    href=""
                    data-twe-nav-link-ref
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
