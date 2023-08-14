"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {MdCancel} from "react-icons/md";
import {BsCheckCircle, BsFillCheckCircleFill, BsXCircle} from "react-icons/bs";
import {FiEdit} from "react-icons/fi";
import {Button} from "react-bootstrap";

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
    const [editedUser, setEditedUser] = useState({});
    const [editingField, setEditingField] = useState(null);


    console.log("user",user)
    const confirmEditing = async () => {
        try {
            // Fazer uma requisição PUT para a API com as informações em editedUser
            await axios.put(`http://localhost:8080/v1/users/${user.id}`, editedUser);
            // Atualizar a lista de usuários ou fazer outras ações necessárias
            setIsEditing(false); // Desativar o modo de edição
        } catch (error) {
            console.error('API Error:', error.message);
            // Tratar erros de requisição
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/users/${id}`);
                setUser(response.data);

            } catch (error) {
                console.error('API Error:', error.message);
                setUser(null);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (!user) {
        return <div>User not found.</div>;
    }


    const startEditing = () => {
        setEditedUser({ ...user }); // Inicializa as edições com os dados atuais do usuário
        setIsEditing(true); // Ativa o modo de edição
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedUser({}); // Limpa as informações do usuário em edição
    };
    const handleEditChange = (fieldPath, value) => {
        const fieldParts = fieldPath.split('.');
        setEditedUser((prevEditedUser) => {
            if (fieldParts.length === 1) {
                return {
                    ...prevEditedUser,
                    [fieldParts[0]]: value,
                };
            } else if (fieldParts.length === 2 && fieldParts[0] === 'infoUsers'||'address') {
                return {
                    ...prevEditedUser,
                    infoUsers: {
                        ...prevEditedUser.infoUsers,
                        [fieldParts[1]]: value,
                    },
                    address: {
                        ...prevEditedUser.address,
                        [fieldParts[1]]: value,
                    },
                };
            }
            return prevEditedUser;
        });
    };

    const saveChanges = async () => {
        try {
            // Envia as edições para a API
            await axios.put(`http://localhost:8080/v1/users/${user.id}`, editedUser);
            // Atualiza a lista de usuários ou faz outras ações necessárias
            // ...
            setIsEditing(false); // Desativa o modo de edição
        } catch (error) {
            console.error('API Error:', error.message);
            // Trate os erros de acordo
        }
    };
    const toggleMonthDelivery = (month) => {
        setEditedUser((prevEditedUser) => {
            const updatedDeliveryMonth = {
                ...prevEditedUser.deliveryMonth,
                [month]: !prevEditedUser.deliveryMonth[month],
            };

            return {
                ...prevEditedUser,
                deliveryMonth: updatedDeliveryMonth,
            };
        });
    };
    return (


        <div className='flex bg-gray-300  items-center justify-center pt-10 '>

           <div className='border-2 border-gray-700 rounded-2xl m-5 p-10 '>
            <h1 className='text-gray-700 text-3xl  text-center'>Perfil de usuário  </h1>
               <div className='   p-2 m-5 rounded-2xl flex  justify-center '>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Nome: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.name || ''}
                           onChange={(e) => handleEditChange('name', e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                       />
                   ) : (
                       <span>{user.name}</span>
                   )}
                   </label>
               </div>


               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className='block  mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Id do familiar: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.idMainParent || ''}
                           onChange={(e) => handleEditChange('idMainParent', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.idMainParent}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Stats: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.stats || ''}
                           onChange={(e) => handleEditChange('stats', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.stats}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       WhatsApp: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.phone || ''}
                           onChange={(e) => handleEditChange('infoUsers.phone', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers.phone}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Tamanho de roupa: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers.clothingSize || ''}
                           onChange={(e) => handleEditChange('infoUsers.clothingSize', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers.clothingSize}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Tamanho de tenis: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers.shoe || ''}
                           onChange={(e) => handleEditChange('infoUsers.shoe', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers.shoe}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Quantidade de familiares: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.infoUsers.amountParent || ''}
                           onChange={(e) => handleEditChange('infoUsers.amountParent', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers.amountParent}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center '>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Id do familiar: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.infoUsers.amountChildren || ''}
                           onChange={(e) => handleEditChange('infoUsers.amountChildren', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers.amountChildren}</span>
                   )}
                   </label>

               </div>
               <h1 className='text-center text-2xl text-gray-700'>Endereços</h1>
               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Bairro: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.district || ''}
                           onChange={(e) => handleEditChange('address.district', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.address?.district || 'N/A'}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Rua: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.street || ''}
                           onChange={(e) => handleEditChange('address.street', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.address?.street}</span>
                   )}
                   </label>

               </div>
               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>

                       Numero da casa: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.number || ''}
                           onChange={(e) => handleEditChange('address.number', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.address?.number}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       CEP: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.zipCode || ''}
                           onChange={(e) => handleEditChange('address.zipCode', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.address?.zipCode}</span>
                   )}
                   </label>
               </div>
               <div className="    rounded-2xl flex justify-evenly   border-2 border-gray-700 ">
                  <div className=' m-2 flex flex-col   justify-center'>
                      <h1 className=' block mb-2  text-center text-xl text-gray-700 font-medium  dark:text-white '>
                          Recebeu entrega em:
                      </h1>
                  <label className=' block mb-2 text-2xl text-center font-medium text-gray-900 dark:text-white '> {user.deliveryMonth && Object.entries(user.deliveryMonth).map(([month, value]) => (
                              value && <span key={month}> {month} </span>
                          ))}
                      </label>
                  </div>
                   <div className='  p-4 '>
                       {editedUser.deliveryMonth && Object.entries(editedUser.deliveryMonth).map(([month, value]) => (
                           <span
                               className=' flex   gap-2 text-2xl text-gray-700 '
                               key={month}
                               onClick={() => toggleMonthDelivery(month)}
                               style={{ cursor: 'pointer' }}
                           >
                {value ?  <BsCheckCircle /> : <BsXCircle />} {month}
            </span>
                       ))}</div>

               </div>
               <div className='flex pt-6 justify-center items-center'>
                   {isEditing ? (
                       <div className='flex   gap-3'>
                <Button className='bg-green-500 text-white px-4 py-2 rounded w-11/12' onClick={() => startEditing()}>
                <BsFillCheckCircleFill  onClick={saveChanges} ></BsFillCheckCircleFill>
                </Button>
                           <Button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => cancelEditing()}>
                <MdCancel  onClick={cancelEditing} ></MdCancel>
                </Button>
                       </div>

                   ) : (
                       <Button className=" justify-center rounded-2xl w-11/12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4  flex items-center" onClick={startEditing}>
                           <span className=' flex items-center gap-2'> Editar <FiEdit/></span>
                       </Button>
                   )}
               </div>

            </div>
        </div>
    );
};

export default UserDetails;
