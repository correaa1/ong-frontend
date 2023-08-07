// Correct usage
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useRoutes} from 'react-router-dom';
import UserList from "@/app/list/userList";
import Home from "@/app/page";
import Form from "@/app/register/userRegister";

const MyComponent = () => {
    const element = useRoutes([
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Form />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetails />} />
            </Routes>
        </Router>  ]);

    return element;
};

const ParentComponent = () => {
    return (
        <div>
            <MyComponent /> {/* MyComponent is now a descendant of the Router */}
        </div>
    );
};

export default ParentComponent;
