// ChakraUIのハンバーガーメニューアイコン
import { FC, memo } from "react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  /* 親コンポーネント(Header.tsx)から chakraUIの useDisclosureの onOpen関数を propsで受け取る。
    引数のないただの関数なので、引数なしの返却値もない関数を受け渡す型定義は以下のように書く */
  onOpen: () => void;
};

export const MenuIconButton: FC<Props> = memo((props) => {
  const { onOpen } = props;

  return (
    // ChakraUIのハンバーガーメニュー。@chakra-ui/react とは別に @chakra-ui/icons もインストールして使う
    <IconButton
      aria-label="メニューボタン"
      icon={<HamburgerIcon />}
      size="sm"
      variant="unstyled" // リンクの枠を消す
      display={{ base: "block", md: "none" }} //画面幅 md以上になったらハンバーガーアイコンを消す
      onClick={onOpen} // useDisclosureの ハンバーガーメニューを開く関数を実行
    />
  );
});
