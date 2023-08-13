// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
import { useCallback, useState } from "react";
import { User } from "../types/api/user";

// UserManagement.tsx から渡される propsの型
type Props = {
  id: number; //ユーザーの id
  users: Array<User>; // jsonplaceholderから取得した users一覧
  onOpen: () => void;
};

// クリックした userを特定しモーダルを表示
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); //クリックされたユーザー。型は User 又は null

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    // propsで受け取った対象のidと users一覧の各ユーザーを順番に見ていき、同じ　idに該当するユーザーを探す
    // find: 条件に一致する最初の要素を返す
    const targetUser = users.find((user) => user.id === id);
    setSelectedUser(targetUser ?? null);
    /* targetUserが User型か、undefined型になっていて、setSelectedUserの state定義時の型 useState<User | null> と一致していません。
      というエラーが出る。 これは、findメソッドは必ずしも users配列の中に一致するものがあるとは限らない為、返却値の型に undefinedも含まれてしまうことを示唆している。
      (ユーザーが見つかる or undefined )という結果になる。 
      この対処法はいくつかあり、 ① targetUser関数実行後に if文で targetUserが取得できていなければエラーメッセージを出す方法
      ② setSelectedUser(targetUser ?? null) という風に書いて、 targetUserが undefinedだったら nullを設定する方法 (??: 左辺が null 又は undefinedの時右辺を実行する)
      ③ 基本的にはほぼ間違いなく targetUserを正常に取得できるという前提がある場合、setSelectedUser(targetUser!) のように ! マークをつけて undefinedの可能性を排除することをコンパイラに伝える方法 */
    onOpen();
  }, []);

  return { onSelectUser, selectedUser };
};
