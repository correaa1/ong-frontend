import axios from 'axios';

export default function User({ user }) {
  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <div>
      <h1>Detalhes do Usuário</h1>
      <p>Nome: {user.name}</p>
      <p>Telefone: {user.phone}</p>
      {/* Coloque aqui os outros detalhes que deseja exibir */}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`SUA_API_REST/usuarios/${params.id}`);
    const user = response.data;
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
}
