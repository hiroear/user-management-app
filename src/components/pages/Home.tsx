import { FC, memo } from "react";
import { useLoginUser } from "../../hooks/useLoginUser"; // LoginUserProvider のコンテキスト(グローバルな state)を参照するためのカスタムフック

export const Home: FC = memo(() => {
  // LoginUserProviderのコンテキスト valueの内、ログイン画面から正常にログインユーザーの情報が取れているか確認するため loginUserを受け取る
  const { loginUser } = useLoginUser();
  // console.log(loginUser); //コンソールでログインユーザーを確認

  return <p>Homeページです</p>;
});
