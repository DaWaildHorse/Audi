import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

// Estilos existentes
import '../CSS/App.css';
import '../CSS/index.css';
import '../CSS/landing.css';

// Función auxiliar para generar fechas y omitir los domingos
const generateDates = (startDate, days) => {
  const dates = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < days; i++) {
    if (currentDate.getDay() === 0) { // Omitir domingo
      currentDate.setDate(currentDate.getDate() + 1);
    }
    dates.push(currentDate.toLocaleDateString('es-ES')); // Formato día/mes/año
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Componente DataGraphWeek1
const DataGraphWeek1 = ({ data }) => {
  return (
    <LineChart width={1100} height={350} data={data}>
      <Line type="monotone" dataKey="upper" stroke="#f50537" name="Límite superior" strokeWidth={7} />
      <Line type="monotone" dataKey="value" stroke="#000000" name="Predicción" strokeWidth={7} />
      <Line type="monotone" dataKey="lower" stroke="#f50537" name="Límite inferior" strokeWidth={7} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

// Validación de PropTypes para DataGraphWeek1
DataGraphWeek1.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Componente DataGraphWeek2
const DataGraphWeek2 = ({ data }) => {
  return (
    <LineChart width={1100} height={350} data={data}>
      <Line type="monotone" dataKey="upper" stroke="#f50537" name="Límite superior" strokeWidth={7} />
      <Line type="monotone" dataKey="value" stroke="#000000" name="Predicción" strokeWidth={7} />
      <Line type="monotone" dataKey="lower" stroke="#f50537" name="Límite inferior" strokeWidth={7} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

// Validación de PropTypes para DataGraphWeek2
DataGraphWeek2.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Componente principal
const SpecificSearch = () => {
  const [dataWeek1, setDataWeek1] = useState([]);
  const [dataWeek2, setDataWeek2] = useState([]);
  const [ajValues, setAjValues] = useState(Array(14).fill(0));
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false); // Estado de carga
  const [department, setDepartment] = useState(''); // Estado para el departamento seleccionado
  const departments = ['M/G-5M24' , 'M/G-5M23', 'M/G-5M41' ,'M/G-5M7' ]
  
  const turn= ['RG3_3T', 'RG1_3T' , 'RG2_3T' ,' T_CENT' , 'RG1_2T' , 'RG2_2T'] 
  const [Turns, setTurn] = useState(''); // Estado para el departamento seleccionado
  
  // Función para obtener predicciones al hacer clic en el botón
  const fetchPredictions = () => {
    setLoading(true); // Activar carga
    fetch("http://localhost:8080/api/predict_by_department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department }), // Enviar el departamento seleccionado en el cuerpo de la solicitud
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log("Received JSON:", json);
        setPredictions({
          lowerBounds: json.prediction[0],
          predictions: json.prediction[1],
          upperBounds: json.prediction[2],
        });
      })
      .catch(error => console.error("Error fetching prediction data:", error))
      .finally(() => setLoading(false)); // Reiniciar estado de carga
  };

  useEffect(() => {
    if (predictions.lowerBounds) {
      const today = new Date();
      const chartDataWeek1 = predictions.predictions.slice(0, 7).map((value, index) => {
        const date = generateDates(today, 7)[index];
        const ajValue = ajValues[index] || 0; // Usar valor AJ actual
        return {
          name: date,
          value: value + ajValue,
          lower: predictions.lowerBounds[index] + ajValue,
          upper: predictions.upperBounds[index] + ajValue,
        };
      });

      const chartDataWeek2 = predictions.predictions.slice(7, 14).map((value, index) => {
        const date = generateDates(today, 14)[index + 7];
        const ajValue = ajValues[index + 7] || 0; // Usar valor AJ actual
        return {
          name: date,
          value: value + ajValue,
          lower: predictions.lowerBounds[index + 7] + ajValue,
          upper: predictions.upperBounds[index + 7] + ajValue,
        };
      });

      setDataWeek1(chartDataWeek1);
      setDataWeek2(chartDataWeek2);
    }
  }, [ajValues, predictions]);

  const handleAjChange = (index, value) => {
    const newAjValues = [...ajValues];
    newAjValues[index] = Number(value);
    setAjValues(newAjValues);
  };

  const handleAjChange2 = (index, value) => {
    const newAjValues = [...ajValues];
    newAjValues[index + 7] = Number(value);
    setAjValues(newAjValues);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
        >
          <option value="">Seleccionar Departamento</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={Turns}
          onChange={(e) => setTurn(e.target.value)} // Cambia el estado del turno
          className="border rounded px-2 py-1 mr-2"
        >
          <option value="">Seleccionar Turno</option>
          {turn.map((t, index) => (
            <option key={index} value={t}>{t}</option>
          ))}
        </select>

        <button 
          onClick={fetchPredictions}
          disabled={loading || !department} // Deshabilitar botón si está cargando o si no hay departamento seleccionado
          className="bg-Progressive-Red text-white px-4 py-2 rounded"
        >
          {loading ? 'Cargando...' : 'Obtener Predicciones'}
        </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Descarga las predicciones</span>
            </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8 h-96">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4  nunito-sans-title text-black">Ausencias a 7 Días</h2>
          <div id='output' className="bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek1 data={dataWeek1} />
          </div>
        </div>
        <div className="col-span-1 p-6 bg-black h-full rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4  nunito-sans-title text-white">Lista por Días</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">Día</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">P</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">NP</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Pull</th>
                </tr>
              </thead>
              <tbody >
                {dataWeek1.map((item, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.name}</th>
                    <td className="px-6 py-4">{item.value}</td>
                    <td>
                      <input 
                        type="number" 
                        onChange={(e) => handleAjChange(index, e.target.value)}
                        className="border rounded px-2 py-1 w-10"
                      />
                    </td>
                    <td>{item.value + (ajValues[index] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8 h-96">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4  nunito-sans-title text-black">Ausencias a 14 Días</h2>
          <div id='output' className="h-96 bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek2 data={dataWeek2} />
          </div>
        </div>
        <div className="col-span-1 p-6 bg-black h-full rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4  nunito-sans-title text-white">Lista por Días</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Día</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">P</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">NP</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red" >Pull</th>
                </tr>
              </thead>
              <tbody>
                {dataWeek2.map((item, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.name}</th>
                    <td className="px-6 py-4">{item.value}</td>
                    <td>
                      <input 
                        type="number" 
                        onChange={(e) => handleAjChange2(index, e.target.value)}
                        className="border rounded px-2 py-1 w-10"
                      />
                    </td>
                    <td>{item.value + (ajValues[index + 7] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificSearch;
