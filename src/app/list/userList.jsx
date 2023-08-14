"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
            month: users.find(user => user.id === userId)?.month || ""

        }));

        try {
            console.log(selectedAddresses)
            await axios.post('http://localhost:8080/v1/delivery', selectedAddresses);
            navigate(`/deliveryList?users=${selectedUserIds}`);
        } catch (error) {
            console.error('API Error:', error.message);
            // Handle error
        }
    };


//função retorna um post do mes selecionado -- tabela Users
    const handlePostMonth = async (userId, month) => {
        try {
            const data = {
                id: userId,
                month: month
            };
            await axios.post('http://localhost:8080/v1/users', data);
            console.log(`Mês ${month} enviado para o usuário ${userId}`);
        } catch (error) {
            console.error('API Error:', error.message);
            // Handle error
        }
    };

    // useEffect basico responsavel por fazer um get na url e listar todos os usuários
    useEffect(() => {
        const apiUrl = 'http://localhost:8080/v1/users';

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
        <div className="flex   items-center  h-screen justify-center	  ">
            <div className='flex  flex-col border border-solid border-cyan-300 rounded-3xl p-4 bg-emerald-100'>
                <h1 className=" font-serif p-5 text-gray-700 text-center text-5xl">Lista geral</h1>
                <ul >
                    {users.map((user) => (
                        <li className=' flex  items-center '  key={user.id}>
                            <label className=" font-serif p-3 text-gray-700 text-2xl">
                                <input
                                    className= "m-2 h-4 w-4 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleUserToggle(user.id)}
                                />
                                <Link to={`/list/profile/${user.id}`}> {user.name}</Link>

                            </label>
                            <label className="font-serif  text-gray-700 text-2xl">
                                {user.deliveryMonth && (
                                    <p>- Meses:
                                        {Object.entries(user.deliveryMonth).map(([month, value]) => (
                                            value && <span key={month}>{month} </span>
                                        ))}
                                    </p>
                                )}
                            </label>

                        </li>
                    ))}
                </ul>
                  <button className='bg-blue-none hover:bg-emerald-200 m-2 p-3 rounded-2xl font-serif  text-gray-700 text-2xl'
                            onClick={handleUserListSelect}>Enviar para entrega
                    </button>
            </div>
        </div>
    );
};

export default UserList;
