import axios from 'axios';
import Link from 'next/link';

export default function Profile({ users }) {
  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/profile/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8080/v1/users');
    const users = response.data;
    return {
      props: {
        users,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
      },
    };
  }
}
