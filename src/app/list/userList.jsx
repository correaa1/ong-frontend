"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserToggle = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );console.log(selectedUsers)
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
        <div className="flex flex-col  items-center  bg-indigo-900 h-screen justify-center	  ">
          <div className='shadow-lg border border-solid border-cyan-300 rounded-3xl p-4 bg-indigo-900'>
              <h1 className=" font-serif	  p-5 text-teal-50 text-5xl">Lista geral</h1>
            <ul className=''>
                {users.map((user) => (
                    <li  key={user.id}>
                        <label className=" flex items-center gap-2 font-serif p-2 text-teal-50 text-2xl">
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserToggle(user.id)}
                            />
                            <Link to={`/list/profile/${user.id}`}> {user.name}</Link>
                        </label>
                    </li>
                ))}
            </ul>
          </div>
        </div>
    );
};

export default UserList;
