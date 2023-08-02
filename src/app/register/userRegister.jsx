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
      clothingSize: '',
      shoe: '',
      amountParent: '',
      amountChildren: '',
      note: '',
      },
    address:{
    district:'',
    street:'',
    number:'',
    zipCode:'',
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

      const apiUrl = 'http://localhost:8080/v1/users';
      const response = await axios.post(apiUrl, formData);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
  <div class="w-full max-w-md flex flex-col   ">
  <div class='p-2'>
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2 ">
                ID:
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg max-w-xs "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg max-w-xs"
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
                className="w-full leading-tight "
              />
              <span className="text-sm text-gray-600">Active</span>
            </div>

                 <div className="mb-4 flex justify-items-center flex-col ">
                    <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                      Informações do Familiar:
                    </label>
              <input
                placeHolder='Número do WhatsApp'
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
                className="w-full p-2 border rounded-lg max-w-xs "
              />
                    <input
                      placeHolder='Tamanho da roupa'
                      type="text"
                      id="clothingSize"
                      name="clothingSize"
                      value={formData.infoUsers.clothingSize}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          infoUsers: {
                            ...prevFormData.infoUsers,
                            clothingSize: e.target.value,
                          },
                        }))
                      }
                      className="w-full p-2 mt-2  border rounded-lg max-w-xs"
                    />

                                    <input
                                                  placeHolder='Número de calçado'
                                                  type="text"
                                                  id="shoe"
                                                  name="shoe"
                                                  value={formData.infoUsers.shoe}
                                                  onChange={(e) =>
                                                    setFormData((prevFormData) => ({
                                                      ...prevFormData,
                                                      infoUsers: {
                                                        ...prevFormData.infoUsers,
                                                        shoe: e.target.value,
                                                      },
                                                    }))
                                                  }
                                                  className="w-full p-2 mt-2  border rounded-lg max-w-xs"
                                                />
                                    <input
                                              placeHolder='Quantidade de crianças'
                                              type="text"
                                              id="amountChildren"
                                              name="amountChildren"
                                              value={formData.infoUsers.amountChildren}
                                              onChange={(e) =>
                                                setFormData((prevFormData) => ({
                                                  ...prevFormData,
                                                  infoUsers: {
                                                    ...prevFormData.infoUsers,
                                                    amountChildren: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full p-2 mt-2 border rounded-lg max-w-xs"
                                            />
   <                                          input
                                               placeHolder='Quantidade de Parentes'
                                               type="text"
                                               id="amountParent"
                                               name="amountParent"
                                               value={formData.infoUsers.amountParent}
                                               onChange={(e) =>
                                                 setFormData((prevFormData) => ({
                                                   ...prevFormData,
                                                   infoUsers: {
                                                     ...prevFormData.infoUsers,
                                                     amountParent: e.target.value,
                                                   },
                                                 }))
                                               }
                                               className="w-full p-2 mt-2 border rounded-lg max-w-xs"
                                             />
                                    <input
                                              placeHolder='Digite alguma anotação se quiser'
                                              type="text"
                                              id="note"
                                              name="note"
                                              value={formData.infoUsers.note}
                                              onChange={(e) =>
                                                setFormData((prevFormData) => ({
                                                  ...prevFormData,
                                                  infoUsers: {
                                                    ...prevFormData.infoUsers,
                                                    note: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full p-2 mt-2 border rounded-lg max-w-xs"
                                            />

                  </div></form>
  </div>

<div className='w=full p-2 '>
<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4  ">
          <label htmlFor="address" className="block text-gray-700 font-bold">
            Bairro:
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.address.district}
             onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    address: {
                      ...prevFormData.address,
                      district: e.target.value,
                    },
                  }))
                }
            className="w-full p-2 border rounded-lg max-w-xs "
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700 font-bold">
            Rua:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address.street}
            onChange={(e) =>
            setFormData((prevFormData) => ({
             ...prevFormData,
             address: {
              ...prevFormData.address,
              street: e.target.value,
                                },
                              }))
                            }
            className="w-full p-2 border rounded-lg max-w-xs"
          />

        </div>
             <div className="mb-4 ">
                <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                  Numero da casa:
                </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.address.number}
            onChange={(e) =>
            setFormData((prevFormData) => ({
            ...prevFormData,
            address: {
            ...prevFormData.address,
            number: e.target.value,
            },
             }))}
            className="w-full p-2 border rounded-lg max-w-xs"
          />
 </div>
       <div className="mb-4 ">
                 <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                   CEP:
                 </label>
           <input
             type="text"
             id="zipCode"
             name="zipCode"
             value={formData.address.zipCode}
            onChange={(e) =>
            setFormData((prevFormData) => ({
            ...prevFormData,
            address: {
            ...prevFormData.address,
            zipCode: e.target.value,
            },
             }))}
             className="w-full p-2 border rounded-lg max-w-xs"
           />
  </div>
     <div class="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Salvar cadastro
          </button>
           </div>
 </form>

</div>
    <div>
    </div>
    </div>
  );
};


export default Form;

