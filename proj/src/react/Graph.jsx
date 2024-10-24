import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const DataGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(response => response.json())
      .then(json => {
        // Assuming the data is in the 'data' field
        const chartData = json.data.map((value, index) => ({
          name: `Point ${index + 1}`,
          value: value
        }));
        setData(chartData);
      });
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default DataGraph;
