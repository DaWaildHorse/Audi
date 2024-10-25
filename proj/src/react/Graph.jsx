import { useEffect, useState, useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const [ajValues, setAjValues] = useState(Array(14).fill(0));
  const [predictions, setPredictions] = useState({});

  // Create refs for capturing the charts and tables
  const chartRef1 = useRef();
  const chartRef2 = useRef();
  const tableRef1 = useRef();
  const tableRef2 = useRef();

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
        setPredictions({
          lowerBounds: json.prediction[0],
          predictions: json.prediction[1],
          upperBounds: json.prediction[2],
        });
      })
      .catch(error => console.error("Error fetching prediction data:", error));
  }, []); // Fetch data once when component mounts

  useEffect(() => {
    if (predictions.lowerBounds) {
      const today = new Date();
      const chartDataWeek1 = predictions.predictions.slice(0, 7).map((value, index) => {
        const date = generateDates(today, 7)[index];
        const ajValue = ajValues[index] || 0;
        return {
          name: date,
          value: value + ajValue,
          lower: predictions.lowerBounds[index] + ajValue,
          upper: predictions.upperBounds[index] + ajValue,
        };
      });

      const chartDataWeek2 = predictions.predictions.slice(7, 14).map((value, index) => {
        const date = generateDates(today, 14)[index + 7];
        const ajValue = ajValues[index + 7] || 0;
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

  // Function to capture charts and tables and download as PDF
  const downloadPDF = async () => {
    const pdf = new jsPDF();
    
    // Capture first chart
    const canvas1 = await html2canvas(chartRef1.current);
    const imgData1 = canvas1.toDataURL('image/png');
    pdf.addImage(imgData1, 'PNG', 10, 10, 190, 100); // Adjust position and size

    // Capture first table
    const tableCanvas1 = await html2canvas(tableRef1.current);
    const imgDataTable1 = tableCanvas1.toDataURL('image/png');
    pdf.addImage(imgDataTable1, 'PNG', 10, 120, 190, 40); // Adjust position and size

    // Add page for second chart
    pdf.addPage();
    const canvas2 = await html2canvas(chartRef2.current);
    const imgData2 = canvas2.toDataURL('image/png');
    pdf.addImage(imgData2, 'PNG', 10, 10, 190, 100); // Adjust position and size

    // Capture second table
    const tableCanvas2 = await html2canvas(tableRef2.current);
    const imgDataTable2 = tableCanvas2.toDataURL('image/png');
    pdf.addImage(imgDataTable2, 'PNG', 10, 120, 190, 40); // Adjust position and size

    // Save the PDF
    pdf.save('predictions.pdf');
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-8 h-96">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 nunito-sans-title text-black">Ausencias a 7 Dias</h2>
          <div ref={chartRef1} className="h-96 bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek1 data={dataWeek1} />
          </div>
        </div>
        <div className="col-span-1 bg-black p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 nunito-sans-title text-white">Lista por Dias</h2>
          <div ref={tableRef1} className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">Día</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">NP</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">P</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">Pull</th>
                </tr>
              </thead>
              <tbody>
                {dataWeek1.map((item, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-w even:text-white ">{item.name}</th>
                    <td className="px-6 py-4 text-black">{item.value}</td>
                    <td className="px-6 py-4 text-white">
                      <input
                        type="number"
                        value={ajValues[index] || ''}
                        onChange={(e) => handleAjChange(index, e.target.value)}
                        className="border rounded px-2 py-1 w-10 text-white"
                      />
                    </td>
                    <td className="px-6 py-4 text-black">{ajValues[index] !== 0 ? ajValues[index] : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8 mt-32">
        <div className="col-span-3 bg-gray-200 p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 nunito-sans-title text-black">Ausencias a 14 Dias</h2>
          <div ref={chartRef2} className="h-96 bg-gray-300 flex items-center justify-center"> 
            <DataGraphWeek2 data={dataWeek2} />
          </div>
        </div>
        <div className="col-span-1 bg-black p-6 h-full rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Lista por Dias</h2>
          <div ref={tableRef2} className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">Día</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">P</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">NP</th>
                  <th scope="col" className="px-6 py-3 text-white bg-Progressive-Red">Pull</th>
                </tr>
              </thead>
              <tbody>
                {dataWeek2.map((item, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 text:white font-medium text-gray-900 whitespace-nowrap dark:text-w even:text-white ">{item.name}</th>
                    <td className="px-6 py-4 text-black">{item.value}</td>
                    <td className="px-6 py-4 text-white">
                      <input
                        type="number"
                        value={ajValues[index + 7] || ''}
                        onChange={(e) => handleAjChange2(index, e.target.value)}
                        className="border rounded px-2 py-1 w-10 text-white"
                      />
                    </td>
                    <td className="px-6 py-4">{ajValues[index + 7] !== 0 ? ajValues[index + 7] : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button 
          onClick={downloadPDF}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          <span>Descarga las predicciones</span>
        </button>
      </div>
    </div>
  );
};

export default DataGraphsComponent;