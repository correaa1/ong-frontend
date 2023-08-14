"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {MdCancel} from "react-icons/md";
import {BsCheckCircle, BsFillCheckCircleFill, BsXCircle} from "react-icons/bs";
import {FiEdit} from "react-icons/fi";

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


        <div className='flex  items-center justify-center mt-10 '>

            <div>
                {isEditing ? (
                    <div className='flex'>
                <span onClick={() => startEditing()}>
                <BsFillCheckCircleFill  onClick={saveChanges} ></BsFillCheckCircleFill>
                </span>
                        <span onClick={() => cancelEditing()}>
                <MdCancel  onClick={cancelEditing} ></MdCancel>
                </span>
                    </div>

                ) : (
                    <span className=' text-gray-700 text-2xl flex items-center gap-1' onClick={startEditing}>
               Editar <FiEdit/>
            </span>
                )}
            </div>

           <div className='border border-emerald-400 rounded-2xl m-5 p-10 '>
            <h1 className='text-gray-700 text-3xl text-center'>Perfil de usuário  </h1>
               <div className=' border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center '>
                   <p className='p-1  text-xl text-gray-700  '>
                       Nome: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.name || ''}
                           onChange={(e) => handleEditChange('name', e.target.value)}
                       />
                   ) : (
                       <span>{user.name}</span>
                   )}
                   </p>
               </div>


               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Id do familiar: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.idMainParent || ''}
                           onChange={(e) => handleEditChange('idMainParent', e.target.value)}
                       />
                   ) : (
                       <span>{user.idMainParent}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Stats: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.stats || ''}
                           onChange={(e) => handleEditChange('stats', e.target.value)}
                       />
                   ) : (
                       <span>{user.stats}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       WhatsApp: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.phone || ''}
                           onChange={(e) => handleEditChange('infoUsers.phone', e.target.value)}
                       />
                   ) : (
                       <span>{user.infoUsers.phone}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Tamanho de roupa: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers.clothingSize || ''}
                           onChange={(e) => handleEditChange('infoUsers.clothingSize', e.target.value)}
                       />
                   ) : (
                       <span>{user.infoUsers.clothingSize}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Tamanho de tenis: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers.shoe || ''}
                           onChange={(e) => handleEditChange('infoUsers.shoe', e.target.value)}
                       />
                   ) : (
                       <span>{user.infoUsers.shoe}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Quantidade de familiares: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.infoUsers.amountParent || ''}
                           onChange={(e) => handleEditChange('infoUsers.amountParent', e.target.value)}
                       />
                   ) : (
                       <span>{user.infoUsers.amountParent}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center '>
                   <p className='p-1  text-xl text-gray-700  '>
                       Id do familiar: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.infoUsers.amountChildren || ''}
                           onChange={(e) => handleEditChange('infoUsers.amountChildren', e.target.value)}
                       />
                   ) : (
                       <span>{user.infoUsers.amountChildren}</span>
                   )}
                   </p>

               </div>
                     <h1 className='text-center text-2xl text-gray-700'>Endereços</h1>
               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700'>
                       Bairro: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.district || ''}
                           onChange={(e) => handleEditChange('address.district', e.target.value)}
                       />
                   ) : (
                       <span>{user.address?.district || 'N/A'}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Rua: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.street || ''}
                           onChange={(e) => handleEditChange('address.street', e.target.value)}
                       />
                   ) : (
                       <span>{user.address?.street}</span>
                   )}
                   </p>

               </div>
               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       Numero da casa: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.number || ''}
                           onChange={(e) => handleEditChange('address.number', e.target.value)}
                       />
                   ) : (
                       <span>{user.address?.number}</span>
                   )}
                   </p>

               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <p className='p-1  text-xl text-gray-700  '>
                       CEP: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.zipCode || ''}
                           onChange={(e) => handleEditChange('address.zipCode', e.target.value)}
                       />
                   ) : (
                       <span>{user.address?.zipCode}</span>
                   )}
                   </p>
               </div>
               <div className="border border-emerald-400 p-2 m-5 rounded-2xl  ">
                   <p className='p-1 text-xl text-gray-700'>
                       Meses:
                       {user.deliveryMonth && Object.entries(user.deliveryMonth).map(([month, value]) => (
                           value && <span key={month}> {month} </span>
                       ))}
                   </p>
                       {editedUser.deliveryMonth && Object.entries(editedUser.deliveryMonth).map(([month, value]) => (
                           <span
                               className=' flex  p-1 gap-2'
                               key={month}
                               onClick={() => toggleMonthDelivery(month)}
                               style={{ cursor: 'pointer' }}
                           >
                {value ? <BsCheckCircle /> : <BsXCircle />} {month}
            </span>
                       ))}

               </div>
            </div>
        </div>
    );
};

export default UserDetails;
