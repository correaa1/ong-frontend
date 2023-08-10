"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users

    const handleUserToggle = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleUserListSelect = () => {
        const selectedUserIds = selectedUsers.join(',');
        navigate(`/list/userListSelect?users=${selectedUserIds}`);
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/v1/users';

        axios
            .get(apiUrl)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('API Error:', error.message);
                setUsers([]);
            });
    }, []);

    return (
        <div className="flex   items-center  h-screen justify-center	  ">
            <div className='flex  flex-col border border-solid border-cyan-300 rounded-3xl p-4 bg-emerald-100'>
                <h1 className=" font-serif p-5 text-gray-700 text-5xl">Lista geral</h1>
                <ul >
                    {users.map((user) => (
                        <li className='ml-4'  key={user.id}>
                            <label className=" flex items-center gap-2 font-serif p-2 text-gray-700 text-2xl">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.name)}
                                    onChange={() => handleUserToggle(user.name)}
                                />
                                <Link to={`/list/profile/${user.id}`}> {user.name}</Link>
                            </label>
                        </li>
                    ))}
                </ul>
                <button className='bg-blue-none hover:bg-emerald-200 m-2 p-3 rounded-2xl font-serif  text-gray-700 text-2xl' onClick={handleUserListSelect}>Enviar para entrega </button>
            </div>
        </div>
    );
};

export default UserList;
