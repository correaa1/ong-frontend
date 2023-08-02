// components/Input.js
import React, { useState } from 'react';

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Enviar
      </button>
    </div>
  );
};

export default Input;
