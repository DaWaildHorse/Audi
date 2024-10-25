import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

import '../CSS/App.css';
import '../CSS/index.css';
import '../CSS/landing.css';

// Helper function to generate dates and skip Sundays
const generateDates = (startDate, days) => {
  const dates = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < days; i++) {
    if (currentDate.getDay() === 0) { // Skip Sunday
      currentDate.setDate(currentDate.getDate() + 1);
    }
    dates.push(currentDate.toLocaleDateString('es-ES')); // Format as día/mes/año
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Component for Days 1 to 7
const DataGraphWeek1 = ({ data }) => {
  return (
    <LineChart width={1100} height={350} data={data}>
      <Line type="monotone" dataKey="upper" stroke="#f50537" name="Cota superior" strokeWidth={7} />
      <Line type="monotone" dataKey="value" stroke="#000000" name="Predicción" strokeWidth={7} />
      <Line type="monotone" dataKey="lower" stroke="#f50537" name="Cota inferior" strokeWidth={7} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

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

// Component for Days 8 to 14
const DataGraphWeek2 = ({ data }) => {
  return (
    <LineChart width={1100} height={350} data={data}>
      <Line type="monotone" dataKey="upper" stroke="#f50537" name="Cota superior" strokeWidth={7} />
      <Line type="monotone" dataKey="value" stroke="#000000" name="Predicción" strokeWidth={7} />
      <Line type="monotone" dataKey="lower" stroke="#f50537" name="Cota inferior" strokeWidth={7} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

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
// Main Component
const DataGraphsComponent = () => {
  const [dataWeek1, setDataWeek1] = useState([]);
  const [dataWeek2, setDataWeek2] = useState([]);
  const [ajValues, setAjValues] = useState(Array(14).fill(0)); // State for AJ inputs
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        // Log the JSON response to the console
        console.log("Received JSON:", json);

        setPredictions({
          lowerBounds: json.prediction[0], // Lower bound array
          predictions: json.prediction[1], // Prediction array
          upperBounds: json.prediction[2], // Upper bound array
        });
      })
      .catch(error => console.error("Error fetching prediction data:", error));
  }, []); // Fetch data once when component mounts

  useEffect(() => {
    if (predictions.lowerBounds) {
      const today = new Date();
      const chartDataWeek1 = predictions.predictions.slice(0, 7).map((value, index) => {
        const date = generateDates(today, 7)[index];
        const ajValue = ajValues[index] || 0; // Use current AJ value
        return {
          name: date,
          value: value + ajValue, // Sum AI and AJ for the graph
          lower: predictions.lowerBounds[index] + ajValue, // Sum AJ with lower bound
          upper: predictions.upperBounds[index] + ajValue, // Sum AJ with upper bound
          ai: value,
          aj: ajValue,
          total: value + ajValue, // Total = AI + AJ
        };
      });

      const chartDataWeek2 = predictions.predictions.slice(7, 14).map((value, index) => {
        const date = generateDates(today, 14)[index + 7];
        const ajValue = ajValues[index + 7] || 0; // Use current AJ value
        return {
          name: date,
          value: value + ajValue, // Sum AI and AJ for the graph
          lower: predictions.lowerBounds[index + 7] + ajValue, // Sum AJ with lower bound
          upper: predictions.upperBounds[index + 7] + ajValue, // Sum AJ with upper bound
          ai: value,
          aj: ajValue,
          total: value + ajValue, // Total = AI + AJ
        };
      });

      setDataWeek1(chartDataWeek1);
      setDataWeek2(chartDataWeek2);
    }
  }, [ajValues, predictions]); // Depend on ajValues and predictions

  // Handle change in AJ input
  const handleAjChange = (index, value) => {
    const newAjValues = [...ajValues];
    newAjValues[index] = Number(value); // Convert to number
    setAjValues(newAjValues);
  };

  // Handle change in AJ input for Week 2
    const handleAjChange2 = (index, value) => {
      const newAjValues = [...ajValues];
      newAjValues[index + 7] = Number(value); // Adjust index for Week 2
      setAjValues(newAjValues);
    };
  


  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-8 h-96">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4  nunito-sans-title text-black">Ausencias a 7 Dias</h2>
          <div id='output' className="h-96 bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek1 data={dataWeek1} /> {/* Use total for the line */}
          </div>
        </div>
        <div className="col-span-1 bg-black p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4  nunito-sans-title text-white">Lista por Dias</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Dia</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">AI</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">AJ</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Pool</th>
                </tr>
              </thead>
              <tbody>
  {dataWeek1.map((item, index) => (
    <tr key={index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-Progressive-Red border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-w even:text-white ">{item.name}</th>
      <td className="px-6 py-4 text-black">{item.ai}</td>
      <td className="px-6 py-4  text-white">
        <input
          type="number"
          value={ajValues[index] || ''}
          onChange={(e) => handleAjChange(index, e.target.value)}
          className="border rounded px-2 py-1 w-10 text-white" // Adjust the width here
        />
      </td>
      <td className="px-6 py-4 text-black text-">{ajValues[index] !== 0 ? ajValues[index] : ''}</td> {/* Conditionally render the AJ value */}
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8 mt-32">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4  nunito-sans-title text-black">Ausencias a 14 Dias</h2>
          <div id='output' className="h-96 bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek2 data={dataWeek2} /> {/* Use total for the line */}
          </div>
        </div>
        <div className="col-span-1 bg-black p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Lista por Dias</h2>
          
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Dia</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">AI</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">AJ</th>
                  <th scope="col" className="px-6 py-3  text-white bg-Progressive-Red">Pool</th>
                </tr>
              </thead>
              
              <tbody>
  {dataWeek2.map((item, index) => (
    <tr key={index}  className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-Progressive-Red border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 text:white font-medium text-gray-900 whitespace-nowrap dark:text-w even:text-white ">{item.name}</th>
      <td className="px-6 py-4 text-black">{item.ai}</td>
      <td className="px-6 py-4 text-white">
      <input
  type="number"
  value={ajValues[index + 7] || ''}
  onChange={(e) => handleAjChange2(index, e.target.value)}
  className="border rounded px-2 py-1 w-10 text-white"
/>

      </td>
      <td className="px-6 py-4 px-6 py-4">{ajValues[index] !== 0 ? ajValues[index] : ''}</td> {/* Conditionally render the AJ value */}
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Descarga las predicciones</span>
            </button>
      </div>
    </div>
  );
};

export default DataGraphsComponent;

