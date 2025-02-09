
import '../CSS/App.css';
import '../CSS/index.css';
import '../CSS/landing.css';
import LogoBW from '../assets/LogoBW.png';
import DataGraphs from './Graph';

import SpecificSearch from './Busqueda';

function Landing() {  
  //const[array , setArray] = useState([]);


  /*const fetchAPI = async () =>{
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  }, []);

  */


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
                    PAPA
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
          <div>
            <h1 className="text-black nunito-sans-title text-left text-6xl mb-8">Predicción de Ausentismo Total</h1>
            <div className="flex items-center justify-end gap-6  w-full pb-6 h-fit align-middle">
            <span><h3 className='text-black text-2xl nunito-sans-title '> Cargar base de datos</h3></span>
                <label htmlFor="dropzone-file" className="flex flex-col items-center h-fit justify-center w-16   rounded-lg cursor-pointer bg-gray-50 hover:bg-Progressive-Red bg-Progressive-Red/80">
                    <div className="flex flex-col p-3 w-1c items-center justify-center pt-1 pb-1">
                        <svg className="w-8 h-8 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 

          </div>
          <DataGraphs/>
          <div className="flex flex-col items-start">
          <h1 className="text-black  nunito-sans-title text-left text-6xl mb-8">Predicción de Ausentismo por Departamento</h1>
          
          
            <SpecificSearch/>            
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Landing;
