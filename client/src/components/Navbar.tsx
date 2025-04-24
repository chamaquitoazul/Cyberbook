import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";

const Navbar = () => {
  const { books } = useBooks();
  return (
    <Box position="sticky" zIndex="100">
      <Flex
        as="nav"
        px="3vh"
        bg="surface"
        borderBottom="1px solid"
        borderColor="surfaceDarker"
        alignItems="center"
      >
        <Flex alignItems="center" justifyContent="center" ml="auto" mr="auto">
          <Image
            src="/assets/images/logo-cyberbook.png"
            alt="Segun Adebayo"
            maxW="200px"
            maxH="200px"
          />
        </Flex>

        <Spacer />
        <Link to="/home">
          <Button colorScheme="teal" variant="primary" mr={6}>
            INICIO
          </Button>
        </Link>
        <Link to="/home/profile" state={{ books }}>
          <Button colorScheme="teal" variant="primary" mr={6}>
            PERFIL
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
