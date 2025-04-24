import { Avatar, Box, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { PiPencil } from "react-icons/pi";

interface Props {
  initialImage: string | undefined;
  onFileChanged: (file: File) => void;
}

const AvatarPicker = ({ initialImage, onFileChanged }: Props) => {
  const [image, setImage] = useState<string | undefined>(initialImage);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileChanged(file);
    }
  };
  return (
    <Box
      position="relative"
      borderRadius="100%"
      border="2px solid"
      borderColor="#a79277"
    >
      <Avatar src={image} w={320} h={320} bg="#d1bb9e" />
      <IconButton
        borderRadius={20}
        border="3px solid"
        icon={<PiPencil size="32px" />}
        aria-label="Edit Avatar"
        position="absolute"
        bottom={4}
        right={5}
        color="grey.800"
        bg="#a79277"
        _active={{ bg: "#a79277" }}
        _hover={{ bg: "#a79277" }}
      />
      <Input
        type="file"
        position="absolute"
        bottom={0}
        left={0}
        w="100%"
        h="100%"
        borderRadius="30%"
        opacity={0}
        cursor="pointer"
        onChange={onFileChange}
        accept="image/*"
      />
    </Box>
  );
};

export default AvatarPicker;
