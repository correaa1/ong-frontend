// pages/UserListSelect.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const UserListSelect = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedUserIds = queryParams.get('users');
    const selectedUsers = selectedUserIds ? selectedUserIds.split(',') : [];

    return (
        <div>
            <h1>Selected Users:</h1>
            <ul>
                {selectedUsers.map((userId) => (
                    <li key={userId}>{`User ${userId}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserListSelect;
