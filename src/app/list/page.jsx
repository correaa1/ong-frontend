"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import Form from "@/app/register/userRegister";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/list/profile/userListSelect";



const List = () => {
  return (
      <Router>
      <Routes>
         <Route path="/list" element={<UserList/>} />
          <Route path="/list/profile/:id" element={<UserDetails/>} />
          <Route path="/list/userListSelect" element={<UserListSelect />} />
      </Routes>

</Router>
  );
};


export default List;
