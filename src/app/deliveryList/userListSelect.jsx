"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";

const UserListSelect = () => {
    const [addresses, setAddresses] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/delivery'); // Fetch delivery addresses
                setAddresses(response.data);
                setNameUser(queryParams.get('nameUser')); // Set the nameUser state from the URL parameter

                console.log('Addresses:', addresses);
            } catch (error) {
                console.error('API Error:', error.message);
            }
        };

        fetchAddresses();
    }, []); // Empty dependency array, so it runs only once on component mount

    return (
        <div className="flex h-max items-center justify-center mt-10">
            <div className="border border-emerald-300 p-10">
                <h1 className="m-4 text-center text-5xl font-medium font-serif">Lista de entregas</h1>
                <ul>
                    {addresses.map((addressObj, index) => (
                        <li key={index}>
                            <div className="m-4 border border-emerald-300 rounded-2xl p-2">
                                <p className="pl-2 text-2xl font-serif">
                                    Nome: {addressObj.nameUser} - Rua: {addressObj.address.street} - Bairro: {addressObj.address.district} - Número: {addressObj.address.number} - CEP: {addressObj.address.zipCode}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListSelect;

