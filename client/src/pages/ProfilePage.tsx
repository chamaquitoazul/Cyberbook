import {
  Box,
  Button,
  Flex,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ProfileAvatar from "../components/ProfileAvatar";
import BookCard, { MinimalBookCard } from "../components/BookCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Book, logout } from "../api";
import { BiPlusCircle } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const ProfilePage = () => {
  const location = useLocation();
  const { books } = location.state as { books: Book[] };
  const { user } = useAuth();
  let book = books[0];

  const [loggingOut, setLoggingOut] = useState(false);

  const toast = useToast({
    isClosable: true,
    variant: "left-accent",
  });

  const onLogout = async () => {
    setLoggingOut(true);
    await logout(
      () => {
        window.location.href = "/";
      },
      (error) => {
        toast({
          title: "Error al cerrar sesión",
          description: error,
          status: "error",
        });
      }
    );
    setLoggingOut(false);
  };

  const navigate = useNavigate();
  return (
    <VStack align="stretch" spacing={0}>
      <Flex borderBottom="1px solid" borderColor="surfaceDarker">
        <Box bg="surfaceLighter" display="inline-block" px="4rem">
          <ProfileAvatar user={user!} />
          <Flex p="6">
            <Button
              variant="primary"
              mr="3"
              onClick={() => {
                navigate("/home/profile-edit");
              }}
            >
              Editar Perfil
            </Button>
            <Button isLoading={loggingOut} variant="primary" onClick={onLogout}>
              Cerrar Sesión
            </Button>
          </Flex>
        </Box>
        <Box py="14px" mx="3rem">
          <Text
            fontSize="24px"
            fontWeight="bold"
            color="text"
            textAlign="center"
            mb={4}
          >
            Progreso de lectura
          </Text>
          <BookCard book={books[0]} compact />
          <Flex mt="16px">
            <Text fontSize="sm" ml="3">
              50%
            </Text>
            <Progress
              value={50}
              size="xs"
              w="65%"
              ml={3}
              mt={2}
              variant="primary"
            />
          </Flex>
        </Box>

        <Box py="20px">
          <VStack h="100%" align="flex-start" mt="3rem">
            <Box onClick={() => {}}>
              <Text fontSize="lg" mb="8px">
                <strong>Título:</strong> {book.title}
              </Text>
              <Text fontSize="lg" mb="8px">
                <strong>Autor:</strong> {book.authorName}
              </Text>
              <Text fontSize="lg" mb="8px">
                <strong>Fecha de publicación: </strong>
                {book.publicationYear}
              </Text>
              <Text
                fontSize="lg"
                mb="8px"
                whiteSpace="pre-wrap"
                overflowWrap="break-word"
                maxW="700px"
              >
                <strong>Descripción:</strong> {book.synopsis}
              </Text>
            </Box>
            <Button variant="primary" bg="surface" mt="6rem">
              Continuar
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Box bg="surface" boxShadow="md" py={6}>
        <Tabs variant="primary" align="center">
          <TabList mb={5}>
            <Tab> Mis libros</Tab>
            <Tab> Mis Listas de lectura</Tab>
          </TabList>

          <TabPanels
            bg="background"
            borderTop="1px solid"
            borderColor="surfaceDarker"
          >
            <TabPanel>
              <Flex overflowX="auto">
                {books.map((book) => (
                  <Flex key={book.idBook} p="20px">
                    <MinimalBookCard book={book} />
                  </Flex>
                ))}
              </Flex>
            </TabPanel>
            <TabPanel pb={16}>
              <Flex mt={4}>
                <Box
                  mx="auto"
                  bg="surface"
                  fontWeight="400"
                  borderRadius={20}
                  px={7}
                  py={3}
                  display="inline-block"
                  onClick={() => {}}
                >
                  <Text> Lista de lectura </Text>
                </Box>

                <Button
                  variant="primary"
                  mx="auto"
                  fontWeight="400"
                  onClick={() => {}}
                >
                  <Text mr="3">Crear nueva lista</Text>
                  <BiPlusCircle size="20px" />
                </Button>
              </Flex>
              <Text fontSize="sm" mt={16}>
                Aún no has creado ninguna lista de lectura ;/
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
};

export default ProfilePage;
