"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {FaUsers} from "react-icons/fa";
import {FiSearch} from "react-icons/fi";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users
    const [userAddresses, setUserAddresses] = useState({}); // Object to store user addresses
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    // function abaixo é referente a parte de seleção de usuário, para salvar os dados
    const handleUserToggle = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleAllUsers = async () => {
        try {
            const apiUrl = 'http://54.196.6.129:8080/v1/users'; // Substitua pela nova URL da API
            const response = await axios.get(apiUrl);

            setUsers(response.data);
        } catch (error) {
            console.error('API Error:', error.message);
            // Lide com o erro
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleClearFilter = () => {
        setUsers(originalUsers);
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
            await axios.post('http://54.196.6.129:8080/v1/delivery', selectedAddresses);
            navigate(`/deliveryList?users=${selectedUserIds}`);
            console.log(selectedUserIds)
        } catch (error) {
            console.error('API Error:', error.message);
            // Handle error
        }
    };

    const fetchUsers = async () => {
        try {
            const apiUrl = 'http://54.196.6.129:8080/v1/users/stats';
            const response = await axios.get(apiUrl);

            setUsers(response.data);
            setOriginalUsers(response.data);

            const addressMapping = {};
            response.data.forEach((user) => {
                addressMapping[user.id] = user.address;
            });
            setUserAddresses(addressMapping);
        } catch (error) {
            console.error('API Error:', error.message);
            setUsers([]);
            setOriginalUsers([]);
        }
    };




    // useEffect basico responsavel por fazer um get na url e listar todos os usuários
    useEffect(() => {
        fetchUsers();
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
                <div className='flex'>
                    <button
                        className="flex items-center gap-2 bg-gray-none hover:bg-gray-400 m-2 p-3 border border-gray-600 rounded-2xl font-sans text-gray-700 text-xl"
                        onClick={ handleAllUsers}
                    >
                      <FaUsers/>Todos usuários
                    </button>
                    <button
                        className="bg-gray-none hover:bg-gray-400 m-2 p-3 border border-gray-600 rounded-2xl font-sans text-gray-700 text-xl"
                        onClick={handleClearFilter}
                    >
                        Familiares principais
                    </button>
                </div>

                <label className='relative block'>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">  <FiSearch/></span>
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        className=' placeholder:italic placeholder:text-slate-400 block bg-gray-200 w-full
                     border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm
                     focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'

                    />
                </label>

                <ul >
                    {filteredUsers.map((user) => (
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
