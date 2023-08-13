// organismsに定義した<Header>をさらに一つにまとめたコンポーネント
import { FC, memo, ReactNode } from "react";
import { Header } from "../organisms/layout/Header";

type Props = {
  children: ReactNode; // ReactNodeは、Reactに備わっている、タグで囲った要素(children)を渡す際の型の宣言
};

export const HeaderLayout: FC<Props> = memo(({ children }) => {
  // childrenとして propsを受け取る
  return (
    //<Header />の下にこのアプリの様々な要素が入ってくる
    <>
      <Header />
      {children}
    </>
  );
});
