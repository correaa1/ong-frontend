"use client"
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import UserListSelect from "@/app/deliveryList/userListSelect";

const DeliveryList = () => {
     return (
         <Router>
             <Routes>
                 <Route path="/deliveryList" element={<UserListSelect />} />

             </Routes>

         </Router>

     );
};

export default DeliveryList;