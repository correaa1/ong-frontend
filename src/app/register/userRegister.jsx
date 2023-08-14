"use client"
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import UserList from "@/app/list/userList";

const Form = () => {

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    stats: false,
    idMainParent:'',
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

  //function responsavel por fazer um post na api salvando o cadastro do usuário no banco --- tabela Users
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const apiUrl = 'http://localhost:8080/v1/users';
      const response = await axios.post(apiUrl, formData);
        alert('Usuário cadastrado com sucesso!');
        setFormData({
            id: '',
            name: '',
            stats: false,
            idMainParent: '',
            infoUsers: {
                phone: '',
                clothingSize: '',
                shoe: '',
                amountParent: '',
                amountChildren: '',
                note: '',
            },
            address: {
                district: '',
                street: '',
                number: '',
                zipCode: '',
            },
        });
    } catch (error) {
      console.error('Error sending data:', error);
        alert('erro ao cadastrar usuário, revise os campos informados!');
    }
  };

  return (
  <div className=" justify-center flex flex-col items-center">
      <h1 className='m-4 font-sans font-medium p-2 text-gray-700 text-3xl'>Cadastrar novo usuário</h1>
  <div className='p-2  w-1/3 '>
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
                className="w-full p-2 border rounded-lg  "
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
                className="w-full p-2 border rounded-lg "
              />
            </div>

            <div className="mb-4 flex items-center">
              <label htmlFor="stats" className=" text-gray-700 font-bold">
                Status:
              </label>
              <input
                type="checkbox"
                id="stats"
                name="stats"
                checked={formData.stats}
                onChange={handleChange}
                className=" m-1 leading-tight "
              />
              <span className="p-1 text-sm text-gray-600">Active</span>
            </div>

      <div className="mb-4 flex items-center">
          <label htmlFor="mainParent" className="block text-gray-700 font-bold">
              Parente Principal:
          </label>
          <input
              type="checkbox"
              id="mainParent"
              name="mainParent"
              checked={formData.mainParent}
              onChange={handleChange}
              className="m-1 leading-tight "
          />
          <span className="text-sm text-gray-600">Active</span>
      </div>

      <div className="mb-4">
          <label htmlFor="idMainParent" className="block text-gray-700 font-bold">
              Id do familiar:
          </label>
          <input
              type="text"
              id="idMainParent"
              name="idMainParent"
              value={formData.idMainParent}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg "
          />
      </div>

                 <div className="mb-4 flex justify-items-center flex-col ">
                    <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                      Informações do Familiar:
                    </label>
              <input
                placeholder='Número do WhatsApp'
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
                className="w-full p-2 border rounded-lg  "
              />
                    <input
                      placeholder='Tamanho da roupa'
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
                      className="w-full p-2 mt-2  border rounded-lg "
                    />

                                    <input
                                                  placeholder='Número de calçado'
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
                                                  className="w-full p-2 mt-2  border rounded-lg "
                                                />
                                    <input
                                              placeholder='Quantidade de crianças'
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
                                              className="w-full p-2 mt-2 border rounded-lg "
                                            />
                                    <input
                                               placeholder='Quantidade de Parentes'
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
                                               className="w-full p-2 mt-2 border rounded-lg "
                                             />
                                    <input
                                              placeholder='Digite alguma anotação se quiser'
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
                                              className="w-full p-2 mt-2 border rounded-lg "
                                            />

                  </div></form>
  </div>

<div className='w=full p-2  w-1/3'>
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
            className="w-full p-2 border rounded-lg  "
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
            className="w-full p-2 border rounded-lg "
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
            className="w-full p-2 border rounded-lg "
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
             className="w-full p-2 border rounded-lg "
           />
  </div>
     <div className="flex items-center space-y-3  flex-col ">
         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                           Salvar cadastro
                         </button>
                            <Link to='/list' >
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                             ir para lista geral
                               </button> </Link>
           </div>
 </form>

</div>
    <div>
    </div>
    </div>
  );
};


export default Form;

