"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {MdCancel} from "react-icons/md";
import {BsFillCheckCircleFill} from "react-icons/bs";

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
    const handleEditChange = (field, value) => {
        setEditedUser((prevEditedUser) => ({
            ...prevEditedUser,
            [field]: value,
        }));
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


        <div className='flex  items-center justify-center mt-10 '>
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
                   <div>
                       {isEditing ? (
                           <div className='flex'>
                <span onClick={() => startEditing('name')}>
                <BsFillCheckCircleFill  onClick={saveChanges} ></BsFillCheckCircleFill>
                </span>
                               <span onClick={() => cancelEditing('name')}>
                <MdCancel  onClick={cancelEditing} ></MdCancel>
                </span>
                           </div>

                       ) : (
                           <span onClick={startEditing}>
                <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            </span>
                       )}
                   </div>

               </div>


               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>id do familiar: {user.idMainParent}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Phone: {user.infoUsers.phone}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Tamanho de roupa: {user.infoUsers.clothingSize}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Tamanho de tenis: {user.infoUsers.shoe}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Quantidade de familiares: {user.infoUsers.amountParent}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Quantidade de crianças: {user.infoUsers.amountChildren}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl '>
                   <p className='p-1 text-center text-xl text-gray-700'>anotação: {user.infoUsers.note}</p>
               </div>
                     <h1 className='text-center text-2xl text-gray-700'>Endereços</h1>
               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                        <p className='p-1 text-center text-xl text-gray-700'>Bairro: {user.address.district}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'> Rua: {user.address.street}</p>
               </div>
               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Numero da casa: {user.address.number}</p>
               </div>

               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
                   <p className='p-1 text-center text-xl text-gray-700'>Código postal: {user.address.zipCode}</p>
               </div>
               <div className="border border-emerald-400 p-2 m-5 rounded-2xl ">
                   {user.deliveryMonth && (
                       <p className='p-1 text-center text-xl text-gray-700'>Meses:
                           {Object.entries(user.deliveryMonth).map(([month, value]) => (
                               value && <span key={month}>  {month} </span>
                           ))}
                       </p>
                   )}
               </div>
            </div>
        </div>
    );
};

export default UserDetails;
