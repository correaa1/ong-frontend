"use client"
import UserRegister from "@/app/register/userRegister";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from "@/app/list/userList";
import Form from "@/app/register/userRegister";
import UserDetails from "@/app/list/profile/userDetail";
import UserListSelect from "@/app/list/profile/userListSelect";
import React from "react";

const Register = () => {
  return (
      <Router>
          <Routes>
                  <Route path="/register" element={<Form/>} />
              <Route path="/list" element={<UserList/>} />

          </Routes>

      </Router>
  );
};

export default Register;
