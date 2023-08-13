// ログインしてHOMEページに遷移するためのカスタムフック
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user"; // jsonplaceholder から取得する users一覧の型
import { useMessage } from "./useMessage"; // トースト専用のカスタムフック
import { useLoginUser } from "./useLoginUser"; // LoginUserProvider のコンテキスト(グローバルな state)を参照するためのカスタムフック

export const useAuth = () => {
  const history = useHistory();

  const { showMessage } = useMessage(); // トースト。カスタムフックの useMessageから showMessage関数を受け取る

  // LoginUserProviderのコンテキスト valueの内、ログインユーザーの更新をしたいので setLoginUserを受け取る
  const { setLoginUser } = useLoginUser();

  // データ取得中はボタンにローディングアイコンが出るようにする stateを用意
  const [loading, setLoading] = useState(false);

  // login するための関数
  const login = useCallback(
    (id: string) => {
      setLoading(true); //データ取得中に変更

      axios
        //ログイン画面の input(入力)から渡される(id)をテンプレートリテラル ${id} で埋め込んで、該当idの userデータを取得
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin = res.data.id === 10 ? true : false; // res.dataの idが 10 の時、isAdminプロパティに trueを入れる
            //↓ 取得した res.dataに対して isAdminプロパティを追加して LoginUserProviderのコンテキストを更新 (取得した userを入れる)
            setLoginUser({ ...res.data, isAdmin }); // スプレッド構文でオブジェクトの中身を展開、追加、再設定
            showMessage({ title: "ログインしました", status: "success" }); //トースト
            history.push("/home"); // 正常に dataが取れて dataが存在すれば HOMEページに遷移
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
            setLoading(false); // 最後に必ずデータ取得終了にしておく
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser] // eslintがエラーにならなければ [] でもOK
  );

  // カスタムフックとして login関数と、データ取得中かどうかの状態をもつ stateを返す
  return { login, loading };
};
