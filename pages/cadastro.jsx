import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Container,
  Text,
  Select, // Importando Select
} from "@chakra-ui/react";
import { registerUser } from "../app/services/users";

const Register = () => {
  const bgColor = 'white';

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    status: "", // Status inicial
    phone: "",
    clothingSize: "",
    shoe: "",
    whatsapp: "",
    email: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name) {
      setError("O nome é obrigatório.");
      return;
    }

    if (!formData.phone && !formData.whatsapp) {
      setError("O telefone ou WhatsApp é obrigatório.");
      return;
    }

    const formattedData = {
      name: formData.name,
      age: parseInt(formData.age, 10),
      stats: formData.status === "true", // Convertendo o status para booleano
    };

    try {
      console.log("Enviando dados para a API:", formattedData); // Log dos dados enviados
      const response = await registerUser(formattedData);
      setSuccess("Usuário registrado com sucesso!");
      setFormData({
        name: "",
        age: "",
        status: "",
        phone: "",
        clothingSize: "",
        shoe: "",
        whatsapp: "",
        email: "",
        notes: "",
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error.message); // Log do erro
      setError("Erro ao registrar usuário: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Flex>
      <Flex bg="whitesmoke" minH="57rem" direction="column" w="full">
        <Text align="center" fontSize="2xl" fontWeight="bold" mx="2rem" mt="2rem">
          Cadastro
        </Text>
        <Container maxWidth="full" px="2rem" py="1rem">
          <Flex direction="row" bg={bgColor} p="1.5rem" justifyContent="center" rounded="xl">
            <Flex direction="column" w="full" p="1rem" rounded="lg">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel
                    htmlFor="name"
                    pb="1rem"
                    fontWeight="bold"
                    fontSize="xl"
                  >
                    Cadastrar um usuário
                  </FormLabel>

                  {error && (
                    <Alert status="error" mb="1rem">
                      <AlertIcon />
                      <AlertTitle mr={2}>Erro!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                      <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError("")} />
                    </Alert>
                  )}

                  {success && (
                    <Alert status="success" mb="1rem">
                      <AlertIcon />
                      <AlertTitle mr={2}>Sucesso!</AlertTitle>
                      <AlertDescription>{success}</AlertDescription>
                      <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccess("")} />
                    </Alert>
                  )}

                  <Flex direction="column" gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Nome</FormLabel>
                      <Input
                        borderColor="gray.500"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Idade</FormLabel>
                      <Input
                        borderColor="gray.500"
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Select
                        borderColor="gray.500"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Selecione...</option>
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Tamanho de roupa</FormLabel>
                      <Input
                        borderColor="gray.500"
                        type="text"
                        id="clothingSize"
                        name="clothingSize"
                        value={formData.clothingSize}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Número de calçado</FormLabel>
                      <Input
                        borderColor="gray.500"
                        type="text"
                        id="shoe"
                        name="shoe"
                        value={formData.shoe}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Flex>
                </FormControl>
              </form>
            </Flex>
            <Flex direction="column" maxW="50rem" w="full" p="1rem" rounded="lg">
              <FormControl>
                <Flex direction="column" gap={4}>
                  <FormLabel fontWeight="bold" fontSize="xl">Contato</FormLabel>
                  <FormControl isRequired>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      borderColor="gray.500"
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Whatsapp</FormLabel>
                    <Input
                      borderColor="gray.500"
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      borderColor="gray.500"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Notas</FormLabel>
                    <Input
                      borderColor="gray.500"
                      type="text"
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Flex>
              </FormControl>
              <Flex justify="center">
                <Button w="15rem" mt="1rem" colorScheme="blue" type="submit" onClick={handleSubmit}>
                  Salvar
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Register;
