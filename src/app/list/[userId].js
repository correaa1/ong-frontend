import React from 'react';
import { useRouter } from 'next/router';

const UserDetail = () => {
    const router = useRouter()
    const userId = router.query.userId
    return (
        <div>
            <h1> exibindo tudo: {userId}</h1>
        </div>
    );
};

export default UserDetail;

