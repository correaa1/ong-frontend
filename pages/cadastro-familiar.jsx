import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Avatar,
    useColorModeValue,
    Container,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useRouter } from "next/router";
  import { registerFamilyMember } from "../app/services/family";
  
  const Register = () => {
    const bgColor = 'blue.100';
    const router = useRouter();
    const { userId } = router.query; 
  
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
      mainUserId: userId, 
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
        console.log('Submitting form with data:', formData);
        console.log('User ID:', userId);
      
        try {
          const response = await registerFamilyMember(formData, userId); 
          console.log('Response:', response);
          router.push('/'); // Exemplo de redirecionamento para a página inicial após o cadastro
        } catch (error) {
          console.error('Erro ao registrar familiar:', error.message);
        }
      };
      
  
    return (
      <Flex >
        <Flex  bg='blue.50' minH='57rem'  direction="column" w="full">
        <Text  align='center' fontSize='2xl' fontWeight='bold' mx='2rem' mt='2rem'>Cadastro</Text>
        <Container maxWidth="full" px="2rem" py='1rem'>
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
                      Cadastrar familiar
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
              <Flex direction="column" maxW="50rem" w="full" p="1rem" rounded="lg">
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
  