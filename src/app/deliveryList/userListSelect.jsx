"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";
import {Button} from "react-bootstrap";

const UserListSelect = () => {
    const [addresses, setAddresses] = useState([]);
    const [nameUser, setNameUser] = useState(""); // Defina o estado inicial como uma string vazia
    const [infoUsers, setInfoUsers] = useState("")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [uniqueAddresses, setUniqueAddresses] = useState([]); // Novo estado para os endereços únicos


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('https://ong.majinbooimports.com/v1/delivery'); // Fetch delivery addresses

                const uniqueAddressesArray = response.data.reduce((unique, addressObj) => {
                    const existingAddress = unique.find(
                        (address) =>
                            address.district === addressObj.address.district
                    );
                    if (!existingAddress) {
                        unique.push(addressObj.address);
                    }
                    return unique;
                }, []);
                setUniqueAddresses(uniqueAddressesArray);
                setAddresses(response.data);

            } catch (error) {
                console.error('API Error:', error.message);
            }
        };

        fetchAddresses();
    }, []);

    return (

        <div className="flex flex-col bg-gray-300 ">

                <ul className="nav p-2 flex justify-center gap-2">
                    <li className="nav-item p-2 font-serif font-medium text-xl">
                        <Link className='bg-blue-none hover:bg-gray-400 p-2 rounded-2xl'
                              to="/list">Lista de geral</Link>
                    </li>
                    <li className="nav-item p-2 font-serif font-medium text-xl">
                        <Link className='bg-blue-none hover:bg-gray-400 p-2 rounded-2xl'
                              to="/register">Cadastro</Link>
                    </li>
                </ul>
        <div className='items-center  flex flex-col'>
            <div className="border-2 border-gray-700 rounded-xl ">
                <h1 className="m-4 text-center text-5xl font-medium font-serif">Lista de entregas</h1>
                <ul>
                    {addresses.map((addressObj, index) => (
                        <li key={index}>
                            <div className="m-4  rounded-2xl p-2">
                                <p className="pl-2 text-2xl font-serif">

                                    Nome: {addressObj.nameUser}  - Quantidade de crianças:{addressObj.infoUsers?.amountChildren || '0'}
                                    - Quantidade de familiares: {addressObj.infoUsers?.amountParent || '0'} - Bairro: {addressObj.address.district}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

            <div className='flex justify-center  m-4 '>

                <ul className='border-2 border-gray-700 m-2 rounded-xl'>
                    <h1 className='m-6  text-3xl font-medium font-serif'>Endereços de entrega</h1>
                    {uniqueAddresses.map((address, index) => (
                        <li key={index} className='flex justify-between p-4	 '>
                            <p className=' pl-10  text-2xl font-serif  '>Bairro: </p > <p className='  pr-10  text-2xl font-serif '> {address.district}</p>

                        </li>
                    ))}

                </ul></div>

        </div>
    );
};

export default UserListSelect;

