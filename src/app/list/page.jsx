"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import UserRegister from "@/app/register/userRegister";




const List = () => {
  return (
      <Router>
      <Routes>
         <Route path="/list" element={<UserList/>} />
          <Route path="/list/profile/:id" element={<UserDetails/>} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/deliveryList" element={<UserListSelect />} />

      </Routes>

</Router>
  );
};


export default List;
