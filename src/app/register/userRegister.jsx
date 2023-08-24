"use client"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialMonthState = {
    janeiro: false,
    fevereiro: false,
    marco: false,
    abril: false,
    maio: false,
    junho: false,
    julho: false,
    agosto: false,
    setembro: false,
    outubro: false,
    novembro: false,
    dezembro: false,
};
const Form = ({mainParent = true,  idMainParent}) => {
    const [monthState, setMonthState] = useState(initialMonthState);
    const navigate = useNavigate()
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        age: '',
        // Outros campos do formulário
    });

  const [formData, setFormData] = useState({

    name: '',
    stats: true,
    mainParent: mainParent,
    idMainParent:idMainParent,

    age:'',
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
    month:monthState



  });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        console.log("formData inside handleChange:", formData);

    };


  //function responsavel por fazer um post na api salvando o cadastro do usuário no banco --- tabela Users
  const handleSubmit = async (e) => {
    e.preventDefault();


      if (formData.name.trim() === '' || formData.age.trim() === '') {
          toast.error('Nome e idade não podem estar em branco.', {
              position: toast.POSITION.TOP_CENTER,
          });
          return; // Impede o envio se o nome ou idade estiverem em branco
      }

      // Verificar se há erros de validação
      if (validationErrors.name || validationErrors.age) {
          toast.error('Por favor, corrija os erros de validação antes de salvar.', {
              position: toast.POSITION.TOP_CENTER,
          });
          return; // Impede o envio se houver erros de validação
      }


    try {
        console.log('monthState before API call:', monthState);
        console.log('formData before API call:', formData);

      const apiUrl = 'http://localhost:8080/v1/users';
        const response = await axios.post(apiUrl, {
            ...formData, // Spread the existing formData
            month: { ...monthState }, // Spread the monthState to create a new object
        });

        toast.success('Formulário enviado com sucesso!', {
            position: toast.POSITION.TOP_CENTER,
        });

        const navigateUrl = mainParent
            ? `/register                                                              `
            : `/list/profile/${idMainParent}`;



        navigate(navigateUrl, { replace: true });


        setFormData({
            name: '',
            stats: true,
            mainParent: mainParent,
            age:'',
            idMainParent: idMainParent,
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
            month:monthState,

        });
        setMonthState(initialMonthState);


        console.log("formData after state update:", formData);

    } catch (error) {
      console.error('Error sending data:', error);
        alert('Erro ao cadastrar usuário, revise os campos informados!');
    }

  };


    const handleMonthChange = (month) => {
        console.log('Before change:', monthState);
        setMonthState((prevMonthState) => ({
            ...prevMonthState,
            [month]: !prevMonthState[month],
        }));
        console.log('After change:', monthState);
    };



    return (
  <div className=" bg-gray-300 justify-center flex flex-col items-center">
      <h1 className='m-4 font-sans font-medium p-2 text-gray-700 text-3xl'>Cadastrar novo usuário</h1>
  <div className='p-2  w-1/3 '>
          <ToastContainer />
  <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">


            </div>
            <div className="mb-4">
              <label  htmlFor="name" className="block text-gray-700 font-bold">
                Nome:
              </label>
              <input

                type="text"
                id="name"
                name="name"
                value={formData.name}

                onChange={handleChange}
                className="w-full p-2 border rounded-lg "

              />  {validationErrors.name && (
                <p className="error">{validationErrors.name}</p>
            )}
            </div>

      <div className="mb-4">
          <label  htmlFor="age" className="block text-gray-700 font-bold">
              Idade:
          </label>
          <input

              type="number"
              id="age"
              name="age"
              value={formData.age}

              onChange={handleChange}
              className="w-full p-2 border rounded-lg "
          />
      </div>

        <div className='flex justify-between  '>

            <div className="mb-4 flex  ">
              <label htmlFor="stats" className=" relative inline-flex items-center  cursor-pointer">
              <input
               type="checkbox"
                id="stats"
                name="stats"
                checked={formData.stats }
                onChange={handleChange}
                className="sr-only peer "
              />
            <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Status</span>  </label>
            </div>


      </div>


 <div className="mb-4 flex justify-items-center flex-col ">
                    <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                      Informações do Familiar:
                    </label>
              <input
                placeholder='Número do WhatsApp'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                type="tel"
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
                disabled={!mainParent}

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
                                                  type="number"
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
                                              type="number"
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
                                              disabled={!mainParent}

                                    />
                                    <input
                                               placeholder='Quantidade de Parentes'
                                               type="number"
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
                                               disabled={!mainParent}

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
<form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            disabled={!mainParent}

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
            disabled={!mainParent}

          />

        </div>
             <div className="mb-4 ">
                <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                  Numero da casa:
                </label>
          <input
            type="number"
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
            disabled={!mainParent}

          />
 </div>
       <div className="mb-4 ">
                 <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
                   CEP:
                 </label>
           <input
             type="number"
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
             disabled={!mainParent}

           />
  </div>

    <div className="mb-4 flex flex-col">
        <label htmlFor="infoUsers" className="block text-gray-700 font-bold">
            Meses que já recebeu:
        </label>
        {Object.keys(initialMonthState).map((month) => (
            <div key={month} className="flex items-center">
                <input
                    type="checkbox"
                    id={month}
                    name={month}
                    checked={monthState[month]}
                    onChange={() => handleMonthChange(month)}
                    className="m-1 leading-tight  "
                    disabled={!mainParent}

                />
                <label  htmlFor={month} className="ml-1 text-gray-600 text-xl  font-serif ">
                    {month}
                </label>
            </div>
        ))}
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

