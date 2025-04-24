import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="surfaceDarker"
      color="onSurface"
      py="4"
      px="4"
      mt="auto"
    >
      <Flex justify="center">
        <Text 
          fontWeight="bold"
        >© 2024 - CyberBook</Text>
      </Flex>
      <Flex
        justify="center"
        mt="2"
        fontSize="sm"
        color="onSurfaceLight"
        align="center"
      >
        <Text>Hecho con</Text>
        <Box as="span" mx="1" color="red.500">
          ❤
        </Box>
        <Text>por Gabriela Báez, Luis De La Cruz y Manuel Alejandro G.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
