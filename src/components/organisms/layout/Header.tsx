// atoms molecules に作った部品をまとめ、ヘッダーとして一つにしたコンポーネント
import { FC, memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Heading, Link, Box, useDisclosure } from "@chakra-ui/react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton"; // ハンバーガーメニューアイコン
import { MenuDrawer } from "../../molecules/MenuDrawer"; // ハンバーガーメニューを開いた時に出るメニュー一覧

export const Header: FC = memo(() => {
  // ChakraUIの useDisclosure の中に 開く/閉じる 動作を簡単に実装できるコンポーネントがある。isOpen=開いているかどうか | onOpen=開く | onClose=閉じる
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  // 各ページに遷移させる関数3つ
  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    [history]
  );
  const onClickSetting = useCallback(() => history.push("/home/setting"), [
    history
  ]); //第二引数は eslintのエラーが出なければ []でもOK

  return (
    <>
      {/* Flexは ChakraUIの横並びにするコンポーネント */}
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }} // 基本の paddingは 3(0.75rem)、画面が md 以上になったら 5(1.25rem) に設定
      >
        {/*↓ onClick関数は as="a" と書いたところに書く */}
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          {/*↓ ChakraUI。アプリ名の文字の基本の大きさは "md"、ブレークポイントとして画面が md 以上になったら文字サイズを "lg" にする */}
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            ユーザー管理アプリ
          </Heading>
        </Flex>

        {/*↓ flexGrow: 伸び率、左端に寄せる。 display: 画面の調整、基本は表示させず画面幅が md 以上になったら flex(表示) */}
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>
          <Link onClick={onClickSetting}>設定</Link>
        </Flex>

        {/*↓ ChakraUIのハンバーガーメニュー */}
        <MenuIconButton onOpen={onOpen} />
      </Flex>

      {/* ↓ ハンバーガーメニューを開いた時に出るメニュー一覧。 ヘッダー要素を囲む <Flex> の外に書く。
      onClose / isOpen 関数は ChakraUIの useDisclosureを使用 */}
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
});
