// components/UserDetails.js

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
        <div>
            <h1>User Details</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Parente principal: {user.mainParent}</p>
            <p>id do familiar: {user.idMainParent}</p>
            <p>Phone: {user.infoUsers.phone}</p>
            <p>Tamanho de roupa: {user.infoUsers.clothingSize}</p>
            <p>Tamanho de tenis: {user.infoUsers.shoe}</p>
            <p>Quantidade de familiares: {user.infoUsers.amountParent}</p>
            <p>Quantidade de crianças: {user.infoUsers.amountChildren}</p>
            <p>anotação: {user.infoUsers.note}</p>



            {/* Display other user details as needed */}
        </div>
    );
};

export default UserDetails;
