"use client"
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    stats: false,
    infoUsers: {
      phone: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the URL of your API endpoint here
      const apiUrl = 'http://localhost:8080/v1/users';
      const response = await axios.post(apiUrl, formData);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <div className="mb-4">
        <label htmlFor="id" className="block text-gray-700 font-bold">
          ID:
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stats" className="block text-gray-700 font-bold">
          Status:
        </label>
        <input
          type="checkbox"
          id="stats"
          name="stats"
          checked={formData.stats}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <span className="text-sm text-gray-600">Active</span>
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.infoUsers.phone}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              infoUsers: {
                ...prevFormData.infoUsers,
                phone: e.target.value,
              },
            }))
          }
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Submit
      </button>
    </form>
  );
};


export default Form;

