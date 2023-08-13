// ChakraUIのトースト機能をカスタムフックとして設定
import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error"; // ChakraUIで設定されている 4つの型しか受け取れないようにする
};

export const useMessage = () => {
  const toast = useToast(); // ChakraUIの useToastを展開

  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;

      toast({
        title, // トーストメッセージ
        status, // "info" | "warning" | "success" | "error" のどれか
        position: "top", // 画面の上部にメッセージが出る
        duration: 2000, // 2秒間
        isClosable: true // 閉じることができる
      });
    },
    [toast]
  );

  return { showMessage };
};
