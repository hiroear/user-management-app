// LoginUserProvider のコンテキスト(グローバルな state)を参照するためのカスタムフック (いちいち型指定などをする必要がなくなる)
import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProvider";

// useContext で指定したコンテキストの値を参照できる。LoginUserContextの型は LoginUserProviderで定義しているので同じものを持ってくる
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
