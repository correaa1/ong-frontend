"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

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

    return (
        <div className='flex  items-center justify-center mt-10 '>
           <div className='border border-emerald-400 rounded-2xl m-5 p-10 h-screen'>

            <h1 className='text-gray-700 text-3xl text-center'>Perfil de usuário  </h1>
               <div className='border border-emerald-400 p-2 m-5 rounded-2xl'>
            <p className='p-1 text-center text-xl text-gray-700'>Nome: {user.name}</p>
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
            </div>
        </div>
    );
};

export default UserDetails;
