"use client"

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Form from "@/app/register/userRegister";
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/deliveryList/userListSelect";
import React from "react";


export default function Home() {

  return (
      <Router>
              <Routes>
                  <Route path="/" element={<Form />}/>
                  <Route path="/register" element={<Form/>} />
                  <Route path="/list" element={<UserList/>} />
                  <Route path="/list/profile/:id" element={<UserDetails/>} />
                  <Route path="/deliveryList/" element={<UserListSelect />} />

              </Routes>

      </Router>

  )
}
