// users一覧画面に表示するカード型の usersテンプレート
import { FC, memo } from "react";
import { Box, Stack, Image, Text } from "@chakra-ui/react";

// UserManagement.tsx から渡される propsの型
type Props = {
  id: number;
  imageUrl: string;
  userName: string;
  fullName: string;
  onClick: (id: number) => void; // クリックした userを特定しモーダルを開く関数
};

export const UserCard: FC<Props> = memo(
  ({ id, imageUrl, userName, fullName, onClick }) => {
    return (
      // ChakraUIにとって<Box>は<div>のようなもの
      <Box
        w="260px"
        h="260px"
        bg="white"
        borderRadius="10px"
        shadow="md"
        p={4}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
        onClick={() => onClick(id)} //ユーザーの idを引数にとって onClickUser関数を実行
      >
        {/* Stack: Box要素内を一定の間隔を空けてくれる。 borderRadius="full": 画像が丸くなる */}
        <Stack textAlign="center">
          <Image
            boxSize="160px"
            borderRadius="full"
            m="auto"
            src={imageUrl}
            alt={userName}
          />
          <Text fontSize="lg" fontWeight="bold">
            {userName}
          </Text>
          <Text fontSize="sm" color="gray">
            {fullName}
          </Text>
        </Stack>
      </Box>
    );
  }
);
