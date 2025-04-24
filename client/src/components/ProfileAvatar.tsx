import { Avatar, Flex, Text } from "@chakra-ui/react";
import { CYBERBOOK_SERVER_BASE_URL, User } from "../api";

interface Props {
  user: User;
}
const ProfileAvatar = ({ user }: Props) => {
  return (
    <Flex align="center" p="2.6rem" borderColor="gray.200">
      <Avatar
        size="xl"
        src={`${CYBERBOOK_SERVER_BASE_URL}` + "/" + user.avatarImageUrl}
      />
      <Flex flexDirection="column" justifyContent="center" ml={4}>
        <Text fontSize="xl" fontWeight="bold">
          {user.userName}
        </Text>
        <Text fontSize="md">{user.email}</Text>
        <Text fontSize="sm">
          Miembro desde: {new Date(user.signupDate).toLocaleDateString()}
        </Text>
      </Flex>
    </Flex>
  );
};
export default ProfileAvatar;
