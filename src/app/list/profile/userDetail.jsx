"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,Link, useParams} from 'react-router-dom';
import {MdCancel} from "react-icons/md";
import {BsCheckCircle, BsFillCheckCircleFill, BsPersonBadge, BsXCircle} from "react-icons/bs";
import {FiEdit} from "react-icons/fi";
import {Button, Alert} from "react-bootstrap";
import {FcSearch} from "react-icons/fc";
import {AiOutlineUsergroupAdd} from "react-icons/ai";

const UserDetails = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
    const [editedUser, setEditedUser] = useState({});
    const [editingField, setEditingField] = useState(null);
    const navigate = useNavigate();
    const [isEditingFamily, setIsEditingFamily] = useState(false);
    const [editedFamilyMember, setEditedFamilyMember] = useState({});


    console.log("editedUser", editedUser); // Add this log
    console.log("editedUser.month", editedUser.month);



    const [familyMembers, setFamilyMembers] = useState([]); // Step 1
    const fetchFamilyMembers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/users?idMainParent=${user.id}`);
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




    const startEditing = (familyMember) => {
        setEditedUser({ ...user }); // Inicializa as edições com os dados atuais do usuário
        setIsEditing(true); // Ativa o modo de edição

    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedUser({});

        // Limpa as informações do usuário em edição
    };


    const handleEditChange = (fieldPath, value) => {
        const fieldParts = fieldPath.split('.');
        setEditedUser((prevEditedUser) => {
            if (fieldParts.length === 1) {
                return {
                    ...prevEditedUser,
                    [fieldParts[0]]: value,
                };
            } else if (fieldParts.length === 2 && (fieldParts[0] === 'infoUsers' || fieldParts[0] === 'address')) {
                const updatedNestedField = {
                    ...prevEditedUser[fieldParts[0]],
                    [fieldParts[1]]: value,
                };

                return {
                    ...prevEditedUser,
                    [fieldParts[0]]: updatedNestedField,
                };
            } else {
                return {
                    ...prevEditedUser,
                    [fieldParts[0]]: value,
                };
            }
        });
    };


    const startEditingFamily = (familyMember) => {
        setEditedFamilyMember({ ...familyMember });
        setIsEditingFamily(true);
    };
    const cancelEditingFamily = () => {
        setEditedFamilyMember({});
        setIsEditingFamily(false);
    };

    const handleEditFamilyChange = (fieldPath, value) => {
        setEditedFamilyMember((prevEditedFamilyMember) => {
            const updatedFamilyMember = { ...prevEditedFamilyMember };
            const fieldParts = fieldPath.split('.');

            // Update the nested property
            let nestedObject = updatedFamilyMember;
            for (const part of fieldParts.slice(0, -1)) {
                nestedObject = nestedObject[part];
            }
            nestedObject[fieldParts[fieldParts.length - 1]] = value;

            return updatedFamilyMember;
        });
    };

    const saveFamilyMemberChanges = async (familyMemberId) => {
        try {
            // Send edited family member data to the API
            await axios.put(`http://localhost:8080/v1/users/${familyMemberId}`, editedFamilyMember);
            // Update the family members list or perform any necessary actions
            // ...
            setIsEditingFamily(false);
        } catch (error) {
            console.error('API Error:', error.message);
            // Handle errors as needed
        }
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


        <div className='flex flex-col  bg-gray-300  items-center justify-center gap-5  '>
            <div className='flex p-5 w-full'>
                <Link className=' bg-cyan-700 hover:bg-cyan-600   p-2 text-white rounded-2xl' to="/list">Voltar</Link>
            </div>


            <div className='flex flex-col'>

           <div className='border-2 border-gray-700 rounded-2xl m-5 p-10  '>
            <h1 className='text-gray-700 text-3xl  text-center'>Perfil de usuário  </h1>

               <div className=' p-2 m-5 rounded-2xl flex border-2 border-gray-500  justify-center bg-cyan-700'>
                   <label className=' flex gap-2 text-xl font-medium text-white '>
                       Status: {isEditing ? (
                       <input
                           type="checkbox"
                           value={editedUser.stats || undefined}
                           onChange={(e) => handleEditChange('stats', !editedUser.stats)}
                           className=" bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500  w-full
                             dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500" />
                   ) : (
                       editedUser.stats ? 'Ativo' : 'Inativo'
                   )}
                   </label>

               </div>

               <div className='   p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700  '>
                   <label className='text-xl font-medium text-white '>

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

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
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

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
                       WhatsApp: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.phone || ''}
                           onChange={(e) => handleEditChange('infoUsers.phone', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers?.phone}</span>
                   )}
                   </label>

               </div>

               <div className=' p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
                       Tamanho de roupa: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.clothingSize || ''}
                           onChange={(e) => handleEditChange('infoUsers.clothingSize', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers?.clothingSize}</span>
                   )}
                   </label>

               </div>

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
                       Tamanho de tenis: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.shoe || ''}
                           onChange={(e) => handleEditChange('infoUsers.shoe', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers?.shoe}</span>
                   )}
                   </label>

               </div>

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700 '>
                   <label className=' text-xl font-medium text-white '>
                       total de familiares: {isEditing ? (
                       <input
                           type="number"
                           value={editedUser.infoUsers?.amountParent || ''}
                           onChange={(e) => handleEditChange('infoUsers.amountParent', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers?.amountParent}</span>
                   )}
                   </label>

               </div>

               <div className=' p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700 '>
                   <label className=' text-xl font-medium text-white '>
                       Observações: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.infoUsers?.note || ''}
                           onChange={(e) => handleEditChange('infoUsers.note', e.target.value)}
                           className="bg-gray-50  -gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.infoUsers?.note}</span>
                   )}
                   </label>

               </div>

               <h1 className='text-center text-2xl  text-gray-700'>Endereços</h1>
               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
                       Bairro: {isEditing ? (
                       <input
                           type="text"
                           value={editedUser.address?.district || ''}
                           onChange={(e) => handleEditChange('address.district', e.target.value)}
                           className="bg-gray-50  text-white text-sm rounded-lg focus:ring-blue-500 focus:-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:-blue-500"
                       />
                   ) : (
                       <span>{user.address?.district || 'N/A'}</span>
                   )}
                   </label>

               </div>

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
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
               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>

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

               <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                   <label className=' text-xl font-medium text-white '>
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
                       <div >
                           <h1 className='font-medium font-serif text-2xl text-center p-3'>Recebeu entrega em:</h1>
                           {Object.entries(editedUser.month).map(([month, value]) => (
                               <label key={month} className="flex  gap-2 month-checkbox ">
                                   <input

                                       type="checkbox"
                                       checked={value}
                                       onChange={() => toggleMonthDelivery(month)}
                                   />
                                   <p  className='text-xl font-serif'>{month}</p>
                               </label>
                           ))}
                       </div>
                   ) : (
                       <div>
                           <h1 className='text-center text-2xl  text-gray-700'>Meses com Entrega:</h1>
                           {Object.entries(user.month).map(([month, value]) => (
                               value &&
                                <div className='p-2 m-5 rounded-2xl flex border-2 border-gray-500 items justify-center bg-cyan-700'>
                               <span
                                              className='text-xl font-medium text-white'
                                              key={month}>{month}
                               </span>
                                </div>
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
                       <Button className=" justify-center rounded-2xl w-11/12 bg-cyan-600 hover:bg-cyan-500  text-white font-bold py-2 px-4  flex items-center" onClick={startEditing}>
                           <span className=' flex items-center gap-2'> Editar <FiEdit/></span>
                       </Button>
                   )}
               </div>
            </div>

            </div>
            <div className='flex  flex-col items-center border-2 border-gray-700 rounded-2xl m-5 p-10 '>
                <h1 className='text-gray-700 text-3xl  text-center'>Familiares associado a este usuario</h1>

                  <div className='flex p-6 gap-2'>  <Button className='bg-cyan-700 hover:bg-cyan-400 text-white px-4 py-2 rounded w-12'
                  onClick={fetchFamilyMembers}><BsPersonBadge className='w-full'/></Button>

                <Button className='bg-cyan-700 hover:bg-cyan-400 text-white px-4 py-2 rounded w-12' onClick={() => navigate(`/familyRegister/${id}`)}>
                    <AiOutlineUsergroupAdd/>
                </Button></div>

                    <div className=''>
                        {familyMembers.map((familyMember) => (
                            <div key={familyMember.id}>
                                <div className='flex flex-col border border-gray-500 rounded-2xl p-5 bg-cyan-700 m-2 items-stretch  gap-4'>
                                    {isEditingFamily && editedFamilyMember.id === familyMember.id ? (
                                        // Editing mode
                                        <>

                                            <label className=' flex flex-col text-center  text-xl font-medium text-white  '>
                                                Nome:
                                                <input
                                                    className='text-black'
                                                    type="text"
                                                    value={editedFamilyMember.name || ''}
                                                    onChange={(e) => handleEditFamilyChange('name', e.target.value)}
                                                />
                                            </label>

                                            <label className=' flex flex-col text-center text-xl font-medium text-white '>
                                                Tamanho de roupa:
                                                <input
                                                    className='text-black'
                                                    type="text"
                                                    value={editedFamilyMember.infoUsers.clothingSize || ''}
                                                    onChange={(e) => handleEditFamilyChange('infoUsers.clothingSize', e.target.value)}
                                                />
                                            </label>

                                            <label className=' flex flex-col text-center text-xl font-medium text-white '>
                                                Tamanho de tenis:
                                                <input
                                                    className='text-black'
                                                    type="text"
                                                    value={editedFamilyMember.infoUsers.shoe || ''}
                                                    onChange={(e) => handleEditFamilyChange('infoUsers.shoe', e.target.value)}
                                                />
                                            </label>

                                            {/* Add more fields as needed */}
                                           <div className='flex pt-6 justify-center items-center'>
                                               <Button className='bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded' onClick={() => startEditing()}>
                                                <BsFillCheckCircleFill  onClick={() => saveFamilyMemberChanges(familyMember.id)} >

                                                </BsFillCheckCircleFill>
                                            </Button>
                                            <Button className='bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded' onClick={() => cancelEditing()}>
                                                <MdCancel  onClick={cancelEditingFamily} ></MdCancel>
                                            </Button>
                                           </div>
                                        </>
                                    ) : (
                                        // Display mode
                                        <>
                                            <p className='text-xl text-white font-serif p-2'>
                                                Nome: {familyMember.name}
                                            </p>
                                            <p className='text-xl text-white font-serif p-2'>
                                                Tamanho de roupa: {familyMember.infoUsers.clothingSize}
                                            </p>
                                            <p className='text-xl text-white font-serif p-2'>
                                                Tamanho de tenis: {familyMember.infoUsers.shoe}
                                            </p>

                          <Button className=" justify-center rounded-2xl w-11/12 bg-cyan-700 hover:bg-cyan-600
                                             text-white font-bold py-2 px-4  flex items-center"
                                  onClick={() => startEditingFamily(familyMember)}>
                                                <span className=' flex items-center gap-2'> Editar <FiEdit/></span>
                                            </Button>

                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


        </div>
    );
};

export default UserDetails;
