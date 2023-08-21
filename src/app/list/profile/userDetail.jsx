"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {MdCancel} from "react-icons/md";
import {BsCheckCircle, BsFillCheckCircleFill, BsPersonBadge, BsXCircle} from "react-icons/bs";
import {FiEdit} from "react-icons/fi";
import {Button, Alert} from "react-bootstrap";
import {FcSearch} from "react-icons/fc";

const UserDetails = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
    const [editedUser, setEditedUser] = useState({});
    const [editingField, setEditingField] = useState(null);
    console.log("editedUser", editedUser); // Add this log
    console.log("editedUser.month", editedUser.month);



    const [familyMembers, setFamilyMembers] = useState([]); // Step 1
    const fetchFamilyMembers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/users/family?idMainParentRelational=${user.idMainParent}`);
            const data = await response.json();
            setFamilyMembers(data);

            // Update the familyMembers state with the fetched data
            console.log("familyMembers",familyMembers)
        } catch (error) {
            console.error('API Error:', error.message);
        }
    };



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/users/${id}`);
                setUser(response.data);
                setEditedUser(response.data);
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
    const toggleMonthDelivery = (month) => {
        setEditedUser((prevEditedUser) => {
            return {
                ...prevEditedUser,
                month: {
                    ...prevEditedUser.month,
                    [month]: !prevEditedUser.month[month],
                },
            };
        });
    };




    const startEditing = () => {
        setEditedUser({ ...user }); // Inicializa as edições com os dados atuais do usuário
        setIsEditing(true); // Ativa o modo de edição
        console.log("editUser",editedUser)
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

    return (


        <div className='flex  bg-gray-300  items-center justify-center gap-5  '>
            <div className='flex flex-col'>
            <div className='flex ml-6 w-full pl-4'>
                <ul className="nav p-2  2">
                    <li className="nav-item p-2 font-serif font-medium text-xl">
                        <Link className='bg-blue-none hover:bg-gray-400 p-3 rounded-2xl' to="/list">Voltar</Link>
                    </li>


                </ul>
            </div>


           <div className='border-2 border-gray-700 rounded-2xl m-5 p-10  '>
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

               <div className='   p-2 m-5 rounded-2xl flex  justify-center '>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Idade: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.age || ''}
                           onChange={(e) => handleEditChange('age', e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                       />
                   ) : (
                       <span>{user.age}</span>
                   )}
                   </label>
               </div>



               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className='block  mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Id do Principal familiar: {isEditing ?
                       (   <input
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
                   <label className='block  mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Id do familiar: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.idMainParentRelational || ''}
                           onChange={(e) => handleEditChange('idMainParentRelational', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.idMainParentRelational}</span>
                   )}
                   </label>

               </div>

               <div className=' -emerald-400 p-2 m-5 rounded-2xl flex  justify-center'>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       Stats: {isEditing ? (
                       <input

                           type="boolean"
                           value={editedUser.stats || ''}
                           onChange={(e) => handleEditChange('stats', e.target.value)}
                           className="bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full
                            p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500" />
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

               <div className=' p-2 m-5 rounded-2xl flex  justify-center '>
                   <label className=' block mb-2 text-2xl font-medium text-gray-900 dark:text-white '>
                       total de familiares: {isEditing ? (
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

               <div>
                   {isEditing ? (
                       <div>
                           <h1>Recebeu entrega em:</h1>
                           {Object.entries(editedUser.month).map(([month, value]) => (
                               <label key={month} className="month-checkbox">
                                   <input
                                       type="checkbox"
                                       checked={value}
                                       onChange={() => toggleMonthDelivery(month)}
                                   />
                                   {month}
                               </label>
                           ))}
                       </div>
                   ) : (
                       <div>
                           <h1>Meses com Entrega:</h1>
                           {Object.entries(user.month).map(([month, value]) => (
                               value && <span key={month}>{month}, </span>
                           ))}
                       </div>
                   )}
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
            <div className='flex  flex-col items-center border-2 border-gray-700 rounded-2xl m-5 p-10 '>
                <h1 className='text-gray-700 text-3xl  text-center'>Familiares associado a este usuario</h1>

                    <Button className='bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded w-12' onClick={fetchFamilyMembers}><BsPersonBadge className='w-full'/></Button>

                    <div>
                        {familyMembers.map((familyMember) => (
                            <div key={familyMember.id}>
                              <div className='flex justify-stretch items-center gap-4'>
                                  <p className=' text-2xl font-serif '>Nome: {familyMember.name}  </p>
                                  <p className=' text-2xl font-serif '>Id do familiar: {familyMember.idMainParentRelational}  </p>
                                <p className='p-2 text-2xl font-serif '>Tamanho de roupa: {familyMember.infoUsers?.clothingSize} </p>
                                  <p className='text-2xl font-serif '>Tamanho de tenis: {familyMember.infoUsers?.shoe}  </p>
                                  <p className='text-2xl font-serif '>Anotação: {familyMember.infoUsers?.note} </p>
                              </div>
                                {/* Display other family member details as needed */}
                            </div>
                        ))}
                    </div>
                </div>


        </div>
    );
};

export default UserDetails;
