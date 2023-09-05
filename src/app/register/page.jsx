"use client"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Form from "@/app/register/userRegister";

import React from "react";
import UserList from "@/app/list/userList";

const Register = () => {
    const isClient = typeof window !== 'undefined';
    if (!isClient) {
        return null; // Retorna null no lado do servidor
    }
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
