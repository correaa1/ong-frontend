"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import AddFamilyMemberPage from "@/app/familyRegister/page";




const userDetailPage = () => {
    return (

        <Router>
            <Routes>
                <Route path="/list/profile/:id" element={<UserDetails/>} />
                <Route path="/list" element={<UserList/>} />
                <Route path="/deliveryList/userListSelect" element={<UserListSelect />} />
                <Route path="/familyRegister/:id" element={<AddFamilyMemberPage/>} />
            </Routes>

        </Router>
    );
};


export default userDetailPage;