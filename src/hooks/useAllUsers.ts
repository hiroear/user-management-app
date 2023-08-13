// users一覧情報を取得するカスタムフック
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage"; //トーストのカスタムフック

export const useAllUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const { showMessage } = useMessage();

  const getUsers = useCallback(() => {
    setLoading(true); //データ取得中に変更
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() =>
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
      )
      .finally(() => setLoading(false)); //最後にデータ取得終了に変更
  }, []);

  // カスタムフックとして getUsers関数、stateの loading、users を返す
  return { getUsers, loading, users };
};
