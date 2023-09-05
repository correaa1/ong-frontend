"use client"
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import UserListSelect from "@/app/deliveryList/userListSelect";
import UserList from "@/app/list/userList";
import UserRegister from "@/app/register/userRegister";

const DeliveryList = () => {
    const isClient = typeof window !== 'undefined';
    if (!isClient) {
        return null; // Retorna null no lado do servidor
    }
     return (
         <Router>
             <Routes>
                 <Route path="/deliveryList" element={<UserListSelect />} />
                 <Route path="/list" element={<UserList />} />
                 <Route path="/register" element={<UserRegister />} />

             </Routes>

         </Router>

     );
};

export default DeliveryList;