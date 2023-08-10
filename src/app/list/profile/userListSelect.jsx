// pages/UserListSelect.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const UserListSelect = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedUserIds = queryParams.get('users');
    const selectedUsers = selectedUserIds ? selectedUserIds.split(',') : [];
    return (
        <div className="flex flex-col  items-center  h-screen justify-center">
            <div className='border border-emerald-300 p-10'>
                <h1 className=' m-4 text-3xl font-serif '>Usuário selecionados para entrega:</h1>
            <ul>
                {selectedUsers.map((userId) => (
                    <li key={userId}> <div className='  m-4 border border-emerald-300 rounded-2xl p-2'> <p className='pl-2 text-3xl font-serif '> {userId}</p>   </div></li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default UserListSelect;
