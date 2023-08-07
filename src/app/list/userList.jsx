"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

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
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/list/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
