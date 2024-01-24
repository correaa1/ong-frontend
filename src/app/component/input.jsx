import axios from 'axios';

const ApiButton = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://ong.majinbooimports.com/v1/users');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <button onClick={fetchData}/>


  );
};

export default ApiButton;
