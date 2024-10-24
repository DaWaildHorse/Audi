import { useEffect, useState } from 'react';

const PythonRunner = () => {
  const [pyodide, setPyodide] = useState(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);
    };

    loadPyodide();
  }, []);

  const runPythonCode = async () => {
    if (pyodide) {
      try {
        const pythonCode = `print("Hello, World!")`;
        const result = await pyodide.runPythonAsync(pythonCode);
        setOutput(result);
      } catch (error) {
        setOutput(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Pyodide in React</h1>
      <button onClick={runPythonCode}>Run Python Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default PythonRunner;
