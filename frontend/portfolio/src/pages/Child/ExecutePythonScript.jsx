import axios from 'axios';

const ExecutePythonScript = () => {
  const executeScript = async () => {
    try {
      const response = await axios.get('http://localhost:8000/rundemo/');
      console.log(response.data);
    } catch (error) {
      console.error('Error executing script:', error);
    }
  };

  return (
    <div>
    <button onClick={executeScript} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Download Portfolio Summary
    </button>
    </div>
  );
};

export default ExecutePythonScript;

