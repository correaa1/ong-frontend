"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/list/profile/userListSelect";



const userDetailPage = () => {
    return (

        <Router>
            <Routes>
                <Route path="/list/profile/:id" element={<UserDetails/>} />
                <Route path="/list/userListSelect" element={<UserListSelect />} />
            </Routes>

        </Router>
    );
};


export default userDetailPage;