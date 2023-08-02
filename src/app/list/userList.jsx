"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/v1/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      
      <ul>
        {users.map((user) => (
          <li key={user.id}>
          <p className="text-1xl"> Nome: {user.name}</p> 
           <p className="text-1xl"> Telefone: {user.infoUsers.phone}</p> 
            <p className="text-1xl">Tamanho de roupa: {user.infoUsers.clothingSize}</p>
            <p className="text-1xl">Tamanho de tenis: {user.infoUsers.shoe}</p>
            <p className="text-1xl"> Quantidade de Parentes: {user.infoUsers.amountParent}</p>
            <p className="text-1xl"> Quantidade de crianças: {user.infoUsers.amountChildren}</p>
            <p className="text-1xl">Anotação: {user.infoUsers.note}</p>


            </li>
          
        ))}
      </ul>
    </div>
  );
};
export default UserList;


