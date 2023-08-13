import { ChangeEvent, FC, memo, useState } from "react";
import { Flex, Box, Heading, Divider, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth"; // ログインするカスタムフック

export const Login: FC = memo(() => {
  const { login, loading } = useAuth(); //カスタムフックの useAuthから login関数と データ取得中の状態をもつ loadingを受け取る
  const [userId, setUserId] = useState("");

  // inputの changeイベントの型指定は (e: ChangeEvent<HTMLInputElement>) 覚える
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onClickLogin = () => login(userId); //カスタムフックから受け取った login関数に、入力した userId を渡し、関数実行

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} /> {/* 横線 */}
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId} // setUserId に入力した文字を入れこみ userIdを更新
          />
          <PrimaryButton
            disabled={userId === ""} // 入力されていない時はボタンを非活性に
            loading={loading} // onClickLogin関数実行直後、loading=trueになり、axiosで user情報を取得しにいく
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
