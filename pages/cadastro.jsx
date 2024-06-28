import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Avatar,
    useColorModeValue,
    Container,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { registerUser } from "../app/services/users";
  
  const Register = () => {
    const bgColor = useColorModeValue('gray.200', 'gray.700');
  
    const [formData, setFormData] = useState({
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Submitting form with data:", formData);
      try {
        const response = await registerUser(formData);
        console.log("Response:", response);
      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
      }
    };
  
    return (
      <Flex>

        <Flex direction="column" w="full">
          <Container maxWidth="full" p="4">
            <Flex
              direction="row"
              bg={bgColor}
              p="1.5rem"
              justifyContent="center"
              rounded="xl"
            >
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
                 
                    <Flex direction="column" gap={4}>
                      <FormControl>
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
                        <Input
                          borderColor="gray.500"
                          type="text"
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        />
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
              <Flex direction="column" maxW="50rem" w="full" p="1rem"  rounded="lg">
                <FormControl>
                  <Flex direction="column" gap={4}>
                    <FormLabel fontWeight="bold" fontSize="xl">Contato</FormLabel>
                    <FormControl>
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
                  <Button w="15rem" mt="1rem" colorScheme="linkedin" type="submit" onClick={handleSubmit}>
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
  