import { useState } from 'react';
import FormComponent from './FormComponent';  // Import the Form component

function App() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dynamic Forms</h1>

      {!selectedForm && (
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleFormSelection('A')}
          >
            Form A
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleFormSelection('B')}
          >
            Form B
          </button>
        </div>
      )}

      {selectedForm && (
        <div className="mt-8">
          <FormComponent formType={selectedForm} />
        </div>
      )}
    </div>
  );
}

export default App;
