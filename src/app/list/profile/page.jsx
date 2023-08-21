"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import UserFamily from "@/app/list/profile/profileFamily/userFamily";




const userDetailPage = () => {
    return (

        <Router>
            <Routes>
                <Route path="/list/profile/:id" element={<UserDetails/>} />
                <Route path="/list" element={<UserList/>} />
                <Route path="/deliveryList/userListSelect" element={<UserListSelect />} />
            </Routes>

        </Router>
    );
};


export default userDetailPage;