import axios from 'axios';

const ApiButton = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/v1/users/Nany');
      console.log(response.data); // Aqui você pode processar a resposta conforme necessário
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <button onClick={fetchData}/>


  );
};

export default ApiButton;
