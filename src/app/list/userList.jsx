"use client"
import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Link from 'next/Link';




 const UserList = () => {

    const [usersList, setUsersList] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const url = 'http://localhost:8080/v1/users'

    useEffect(() => {
      axios
        .get(url)

        .then((response) => setUsersList(response.data))
        .catch((error) => console.error('Error fetching users:', error));
    }, []);



    return (
      <div>

        <ul>
          {usersList.map((user) => (
            <li key={user.id} >
                 <Link href={`/list/${user.id}`}>
                           <p>{user.name}</p>
                         </Link>
              </li>

          ))}
        </ul>


      </div>
    );
  };
  export default UserList;




