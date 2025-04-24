import {
  Input,
  FormLabel,
  Button,
  Text,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import TitleContainer from "../components/TextContainer";
import { useEffect, useState } from "react";
import { login } from "../api";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState({
    emailOrUsername: "",
    password: "",
  });

  const toast = useToast({
    isClosable: true,
    variant: "left-accent",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const onLogin = async () => {
    setLoading(true);
    await login(
      input.emailOrUsername,
      input.password,
      (newUser) => auth.setUser(newUser),
      (error) => {
        if (!error) {
          toast({
            title: "No se pudo iniciar sesión",
            description: "Debe completar todos los campos",
            status: "error",
          });
        } else {
          toast({
            title: "No se pudo iniciar sesión",
            description: error,
            status: "error",
          });
        }
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (auth.user) {
      toast({
        title: "Bienvenido nuevamente, " + auth.user.fullName + "! 🎉",
        status: "success",
      });
      navigate("/home");
    }
  });

  return (
    <Box maxWidth="700px" mx="auto" my="auto" mt={24}>
      <TitleContainer text="Iniciar sesión" />
      <Flex></Flex>
      <FormLabel mt={10}>Email o nombre de usuario</FormLabel>
      <Input
        type="email"
        onChange={(event) => {
          setInput({ ...input, emailOrUsername: event.target.value });
        }}
        variant="primary"
        placeholder="Ingrese su correo o nombre de usuario"
      />
      <FormLabel mt={5}>Contraseña</FormLabel>
      <Input
        type="password"
        onChange={(event) => {
          setInput({ ...input, password: event.target.value });
        }}
        variant="primary"
        placeholder="Ingrese su contraseña"
      />
      <Flex>
        <Flex mt={5} alignItems="center">
          <Link
            to="/signup"
            style={{
              display: "flex",
            }}
          >
            <Text>¿No tienes cuenta?</Text>
            <Text fontWeight="bold" ml="10px">
              Registrate
            </Text>
          </Link>
        </Flex>
        <Button
          variant="primary"
          mt={7}
          px={7}
          py={3}
          ml="auto"
          onClick={onLogin}
          isLoading={loading}
        >
          Enviar
        </Button>
      </Flex>
    </Box>
  );
};

export default LoginPage;
