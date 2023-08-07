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
          <div className='flex justify-center text-center p-2 bg-indigo-500 '>
              <nav>
              <ul className='flex-row flex    '>
                 <div className='bg-none hover:bg-indigo-700 border-none hover:rounded-2xl'>
                     <li className='m-2 '>
                     <Link to="/register">Cadastro</Link>
                 </li>
                 </div>
                  <div className='bg-none hover:bg-indigo-700 border-none hover:rounded-2xl'>
                  <li className='m-2'>
                      <Link to="/list">Lista Geral</Link>
                  </li></div>
              </ul>   </nav></div>

              <Routes>
                  <Route path="/" component={<Home />}>
                  <Route path="/list" element={<UserList/>} />
                  <Route path="/register" element={<Form/>} />
                  <Route path="/list/profile/:id" element={<UserDetails/>} />
                  <Route path="/list/userListSelect" element={<UserListSelect />} />
                  </Route>
              </Routes>

      </Router>

  )
}
