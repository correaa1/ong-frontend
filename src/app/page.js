"use client"

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Form from "@/app/register/userRegister";
import UserList from "@/app/list/userList";
import UserDetails from "@/app/list/userDetail";
import UserRegister from "@/app/register/userRegister";
import Register from "@/app/register/page";


export default function Home() {

  return (
      <Router>
          <div>
              <ul>
                  <li>
                      <Link to="/register">Cadastro</Link>
                  </li>
                  <li>
                      <Link to="/list">Lista Geral</Link>
                  </li>
              </ul>

              <Routes>
                  <Route path="/list" element={<UserList/>} />
                  <Route path="/register" element={<Form/>} />
              </Routes>
          </div>
      </Router>

  )
}
