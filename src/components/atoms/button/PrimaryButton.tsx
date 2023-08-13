import { FC, memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

// Login.tsx から渡される propsの型
type Props = {
  children: ReactNode; // ReactNodeは、Reactに備わっている、タグで囲った要素(children)を渡す際の型の宣言
  disabled?: boolean; // ボタンを非活性にするかどうかを判別。disabled を渡さない場合は、ボタン非活性をしないので、オプションの propsとして ?をつけておく
  loading?: boolean; // データ取得中かどうか。 オプションの propsとして ?をつけておく
  onClick: () => void; // ログイン関数
};

export const PrimaryButton: FC<Props> = memo((props) => {
  // propsにデフォルトの初期値を設定しておく。 propが渡されない場合は falseに設定
  const { children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading} // disabled=trueの時、または loading=true の時　ボタンを非活性にする
      isLoading={loading} // isLoading： ChakraUIの<Button>で使うと true/falseを渡すだけでボタン上にローディングアイコンを表示
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
