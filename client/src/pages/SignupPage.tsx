import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import AvatarPicker from "../components/AvatarPicker";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { CYBERBOOK_SERVER_BASE_URL, signup } from "../api";
import TitleContainer from "../components/TextContainer";

const SignupPage = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarImage: undefined as File | undefined,
  });

  const toast = useToast({
    isClosable: true,
    variant: "left-accent",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async () => {
    setLoading(true);

    await signup(
      input,
      (newUser) => auth.setUser(newUser),
      (error) => {
        toast({
          title: "Falló la creación de la cuenta",
          description: error,
          status: "error",
        });
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (auth.user) {
      toast({
        title: "Bienvenido, " + auth.user.fullName + "! 🎉",
        description:
          "Tu cuenta ha sido creada exitosamente. Ahora puedes comenzar a usar Cyberbook.",
        status: "success",
      });
      navigate("/home");
    }
  });

  return (
    <>
      <Center mt={24} pb="16px">
        <SimpleGrid
          columns={{
            base: 1,
            lg: 2,
          }}
          spacing={24}
          px={6}
        >
          <Box
            w={{
              base: "100%",
              md: "500px",
              lg: "560px",
            }}
          >
            <TitleContainer text="Crea tu cuenta" />
            <FormLabel mt={16}> Nombre completo </FormLabel>
            <Input
              placeholder="Ingrese su nombre completo"
              variant="primary"
              onChange={(e) => {
                setInput({ ...input, fullName: e.target.value });
              }}
            />
            <FormLabel mt={5}> Nombre de usuario </FormLabel>
            <Input
              placeholder="Ingrese su nombre de usuario"
              variant="primary"
              onChange={(e) => {
                setInput({ ...input, username: e.target.value });
              }}
            />
            <FormLabel mt={5}> Correo electrónico </FormLabel>
            <Input
              type="email"
              placeholder="Ingrese su correo electrónico"
              variant="primary"
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
            />
            <FormLabel mt={5}> Contraseña </FormLabel>
            <Input
              type="password"
              placeholder="Ingrese su contraseña, mínimo 5 carácteres"
              variant="primary"
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
            <FormLabel mt={5}> Confirmar contraseña </FormLabel>
            <Input
              type="password"
              placeholder="Confirme su contraseña"
              variant="primary"
              onChange={(e) => {
                setInput({ ...input, confirmPassword: e.target.value });
              }}
            />
            <Link to="/login">
              <Flex mt={7}>
                <Text>¿Ya tienes una cuenta? </Text>
                <Text
                  fontWeight="bold"
                  _hover={{
                    textDecoration: "underline",
                  }}
                  ml="12px"
                >
                  Inicia sesión
                </Text>
              </Flex>
            </Link>
          </Box>
          <VStack p={6}>
            <AvatarPicker
              initialImage={`${CYBERBOOK_SERVER_BASE_URL}/images/defaultAvatar.jpg`}
              onFileChanged={(file) => {
                setInput({ ...input, avatarImage: file });
              }}
            />
            <Spacer />
            <Button
              variant="primary"
              px={12}
              py={6}
              mt={24}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Envíar Solicitud
            </Button>
          </VStack>
        </SimpleGrid>
      </Center>
    </>
  );
};

export default SignupPage;
