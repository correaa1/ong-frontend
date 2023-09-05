"use client"
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Form from "@/app/register/userRegister";
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import AddFamilyMemberPage from "@/app/familyRegister/page";

import React from "react";


export default function Home() {
    const isClient = typeof window !== 'undefined';
    if (!isClient) {
        return null; // Retorna null no lado do servidor
    }
  return (
      <Router>
              <Routes>
                  <Route path="/" element={<Form />}/>
                  <Route path="/register" element={<Form/>} />
                  <Route path="/list" element={<UserList/>} />
                  <Route path="/list/profile/:id" element={<UserDetails/>} />
                  <Route path="/familyRegister/:id" element={<AddFamilyMemberPage/>} />
                  <Route path="/deliveryList/" element={<UserListSelect />} />
              </Routes>

      </Router>

  )
}
