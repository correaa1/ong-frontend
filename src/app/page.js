"use client"

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Form from "@/app/register/userRegister";
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/profile/userDetail";
import UserRegister from "@/app/register/userRegister";
import Register from "@/app/register/page";
import UserListSelect from "@/app/list/profile/userListSelect";


export default function Home() {

  return (
      <Router>
              <Routes>
                  <Route path="/" element={<Form />}>
                  <Route path="/list" element={<UserList/>} />
                  <Route path="/register" element={<Form/>} />
                  <Route path="/list/profile/:id" element={<UserDetails/>} />
                  <Route path="/list/userListSelect" element={<UserListSelect />} />
                  </Route>
              </Routes>

      </Router>

  )
}
