"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users
    const [userAddresses, setUserAddresses] = useState({}); // Object to store user addresses



    // function abaixo é referente a parte de seleção de usuário, para salvar os dados
    const handleUserToggle = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };
// essa function é responsavel por salvar no banco os atributos de objeto address e  nameUser --- vai para a tabela Delivery
    const handleUserListSelect = async () => {
        const selectedUserIds = selectedUsers.join(',');
        const selectedAddresses = selectedUsers.map(userId => ({
            address: userAddresses[userId] || {},
            nameUser: users.find(user => user.id === userId)?.name || "",
            month: users.find(user => user.id === userId)?.month || "",
            infoUsers:users.find(user => user.id === userId)?.infoUsers || "",



        }));

        try {
            console.log(selectedAddresses)
            await axios.post('http://localhost:8080/v1/delivery', selectedAddresses);
            navigate(`/deliveryList?users=${selectedUserIds}`);
            console.log(selectedUserIds)
        } catch (error) {
            console.error('API Error:', error.message);
            // Handle error
        }
    };





    // useEffect basico responsavel por fazer um get na url e listar todos os usuários
    useEffect(() => {
        const apiUrl = 'http://localhost:8080/v1/users/stats';

        axios
            .get(apiUrl)
            .then((response) => {
                setUsers(response.data);
                // Create a mapping of user IDs to addresses
                const addressMapping = {};
                response.data.forEach(user => {
                    addressMapping[user.id] = user.address;
                });
                setUserAddresses(addressMapping);
            })
            .catch((error) => {
                console.error('API Error:', error.message);
                setUsers([]);
            });
    }, []);

    return (


        <div className="flex flex-col  items-center bg-gray-300  	  ">
            <ul className="nav p-2 flex justify-center gap-2">
                <li className="nav-item p-2 font-serif font-medium text-xl">
                    <Link className='bg-blue-none hover:bg-gray-400 p-2 rounded-2xl' to="/deliveryList">Lista de entregas</Link>
                </li>
                <li className="nav-item p-2 font-serif font-medium text-xl ">
                    <Link className="nav-link bg-blue-none hover:bg-gray-400 p-2 rounded-2xl" to="/register">Cadastro</Link>
                </li>

            </ul>
            <div className='flex  flex-col  border-2 border-gray-700 rounded-3xl p-4 m-10 justify-center '>
                <h1 className=" font-serif p-5 text-gray-700 text-center text-5xl">Lista geral</h1>
                <ul >
                    {users.map((user) => (
                        <li className=' flex  items-center '  key={user.id}>
                            <label className=" font-serif p-3 text-black text-2xl">
                                <input
                                    className= "m-2 h-4 w-4 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleUserToggle(user.id)}
                                />
                                <Link to={`/list/profile/${user.id}`}> {user.name}</Link>

                            </label>

                        </li>
                    ))}
                </ul>
               <button className=' bg-gray-none hover:bg-gray-400 m-2 p-3 rounded-2xl font-serif  text-gray-700 text-2xl'
                                                                          onClick={handleUserListSelect}>Enviar para entrega
                </button>
            </div>
        </div>
    );
};

export default UserList;
