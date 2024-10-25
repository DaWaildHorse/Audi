
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const DataGraphWeek2 = ({ data }) => {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="ai" stroke="#8884d8" />
      <Line type="monotone" dataKey="aj" stroke="#82ca9d" />
    </LineChart>
  );
};
DataGraphWeek2.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataGraphWeek2;
