// services/family.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/v1'; // Seu endpoint base

export const registerFamilyMember = async (formData, userId) => {
  try {
    const response = await axios.post(`${API_URL}/family-members/${userId}`, formData);
    return response.data; // Se desejar retornar algum dado específico da resposta
  } catch (error) {
    throw new Error(`Erro ao cadastrar familiar: ${error.message}`);
  }
};
