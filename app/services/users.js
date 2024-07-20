import Axios from "axios";

// Configuração do Axios
const api = Axios.create({
    baseURL: 'http://localhost:8080/v1',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Função para registrar o usuário
const registerUser = async (userData) => {
    try {
        const { data } = await api.post("/users", userData);
        console.log("Usuário registrado:", data);
        return data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error("Erro de validação:", error.response.data.message);
            } else if (error.response.status === 401) {
                console.error("Erro de autenticação: Nome ou whatsapp inválidos.");
            } else {
                console.error("Erro de rede:", error.message);
            }
        } else {
            console.error("Erro desconhecido:", error.message);
        }
        throw error;
    }
};

export { registerUser };
