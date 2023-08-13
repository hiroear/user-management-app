// loginUser, setLoginUser というグローバルな stateを定義したコンポーネント(Provider) createContextの中に Provider というものがあり、それを返却していく
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { User } from "../types/api/user";

/* 擬似的に、管理者ユーザーのみユーザーの内容を編集できるように実装していく。
  loginUser の型 <User | null> に、管理者フラグ(isAdmin)を追加で設定し、loginUserの idが 10 のuserを管理者として実装する。
  ↓ typescriptの機能で、 & で型を追加して新しい型を生成することができる。今回は元々ある型 Userに対して isAdminというプロパティも追加していきたい。 */
type LoginUser = User & { isAdmin: boolean };

// 他の画面でも LoginUserContextを参照できるよう export しておく
export type LoginUserContextType = {
  loginUser: LoginUser | null; // ログインした user(管理者ユーザー含む)
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>; //ログインする user
  //useState等の更新関数の型は、reactの中にある Dispatch と SetStateAction を使って定義する
};

// コンテキストを作りますという意味で createContextを展開。他の画面でも LoginUserContextを参照できるよう export しておく
export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType //初期値は空のオブジェクトを渡しており、コンテキストにどんな型を保持するか、 typescriptの asで強制的にこの型ですよと認識させておく
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props; //親コンポーネントから childrenをまとめて受け取れるようにしておく
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  // Providerの valueという propsにコンテキストとして渡していくことで、グローバルな stateを提供できる
  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
