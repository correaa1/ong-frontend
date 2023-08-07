
import React from 'react';
import { useNavigationContext } from '../components/NavigationContext';

const UserListSelect = () => {
    const { selectedUsers } = useNavigationContext();

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
