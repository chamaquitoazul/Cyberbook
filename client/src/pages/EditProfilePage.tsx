import {
 
  Box,
  Button,
  Flex,

  IconButton,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { TextContainer } from "../components/TextContainer";
import { BiLeftArrowCircle } from "react-icons/bi";
import AvatarPicker from "../components/AvatarPicker";

const EditProfilePage = () => {
  const auth = useAuth();
  return (
    <Flex>
      <IconButton
        m="10px"
        _hover={{ bg: "transparent" }}
        aria-label="Go back"
        bg="transparent"
        color="brown"
        icon={<BiLeftArrowCircle size="xl" />}
        onClick={() => {
          window.history.back();
        }}
      />
      <VStack>
        <Flex
          direction="column"
          align="center"
          justify="center"
          h="100vh"
          w="100%"
        >
          <AvatarPicker
            initialImage={auth.user?.avatarImageUrl}
            onFileChanged={(file) => {
              console.log(file);
            }}
          />
          <Box>
            <TextContainer>
              <h1></h1>
            </TextContainer>
          </Box>
        </Flex>
        <Flex>
          <Button>Cancel</Button>
          <Button>Save</Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default EditProfilePage;
