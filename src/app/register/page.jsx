"use client"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from "@/app/list/userList";
import Form from "@/app/register/userRegister";

import React from "react";

const Register = () => {
  return (
      <Router>
          <Routes>
                  <Route path="/" element={<Form/>} />
              <Route path="/register" element={<Form/>} />
              <Route path="/list" element={<UserList/>} />


          </Routes>

      </Router>
  );
};

export default Register;
