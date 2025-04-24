import { Box, Heading, Text } from "@chakra-ui/react";

interface TitleContainerProps {
  text: string;
  fontSize?: string;
}

export const TitleContainer = (props: TitleContainerProps) => {
  return (
    <Heading
      maxW="115vh"
      bg="surface"
      borderRadius={20}
      px={7}
      py={3}
      fontSize={props.fontSize || "36px"}
      display="inline-block"
    >
      {props.text}
    </Heading>
  );
};

interface TextContainerProps {
  children: React.ReactNode;
}

export const TextContainer = ({ children }: TextContainerProps) => {
  return (
    <Box borderRadius={20} py={3} maxW="120vh">
      <Text fontSize="22px">{children}</Text>
    </Box>
  );
};

export default TitleContainer;
