"use client"
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import UserRegister from "@/app/register/userRegister";
import AddFamilyMemberPage from "@/app/familyRegister/page";




const List = () => {
  return (
      <Router>
      <Routes>
         <Route path="/list" element={<UserList/>} />
          <Route path="/list/profile/:id" element={<UserDetails/>} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/deliveryList" element={<UserListSelect />} />
          <Route path="/familyRegister/:id" element={<AddFamilyMemberPage/>} />
      </Routes>

</Router>
  );
};


export default List;
