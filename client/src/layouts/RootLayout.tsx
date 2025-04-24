import { Box, Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
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
        <Flex >
          <Image
            src="/assets/images/logo-cyberbook.png"
            alt="Segun Adebayo"
            maxW="200px"
            maxH="200px"
          />
        </Flex>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default RootLayout;
