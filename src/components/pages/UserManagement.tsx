// ユーザー一覧ページ
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect } from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { UserCard } from "../organisms/user/UserCard"; // users一覧画面に表示するカード型の userテンプレート
import { useAllUsers } from "../../hooks/useAllUsers"; // users一覧情報を取得するカスタムフック
import { useSelectUser } from "../../hooks/useSelectUser"; // クリックした user情報を特定しモーダルを表示するカスタムフック
import { UserDetailModal } from "../organisms/user/UserDetailModal"; // users一覧の userをクリックすると表示されるモーダル
import { useLoginUser } from "../../hooks/useLoginUser"; // LoginUserProvider のコンテキスト(グローバルな state)を参照するためのカスタムフック

export const UserManagement: FC = memo(() => {
  // カスタムフックの返り値を取得
  // jsonplaceholderから users一覧を取得する getUsers関数、取得した一覧の users、データ取得中かどうかをもつ loading
  const { getUsers, users, loading } = useAllUsers();
  // クリックした userを特定しモーダルを開く onSelectUser関数、クリックされた selectedUser
  const { onSelectUser, selectedUser } = useSelectUser();
  // LoginUserProviderのコンテキスト valueの内、ログイン画面から正常にログインユーザーの情報が取れているか確認するため loginUserを受け取る
  const { loginUser } = useLoginUser();
  console.log(loginUser); //コンソールでログインユーザーを確認

  // ChakraUIの useDisclosure の中に 開く/閉じる 動作を簡単に実装できるコンポーネントがある。isOpen=開いているかどうか | onOpen=開く | onClose=閉じる
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => getUsers(), []); //画面表示時に、初回一回のみ カスタムフックの getUsers関数を実行

  // クリックした userの id が UserCardコンポーネントから渡され、その userを特定しモーダルを開く関数
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen }); // onSelectUser関数を実行 (useSelectUserへ propsを渡す)
    },
    [users, onSelectUser, onOpen]
  ); /*↑ 依存配列に [] を設定すると最初に設定された usersが nullだった場合、その関数内で使う usersは常に nullとなってしまうので [users]とし usersが変更されるたびに関数に渡す引数の usersも設定し直す必要がある。
  詳細解説: useAllUsers.tsでユーザー一覧()usersの情報を取得し stateを定義しているが、初期値を空配列としているため、onClickUser内の usersは最初、空配列で設定される。
  useCallbackの第２引数に[]を設定する場合、最初に設定された値が使いまわされるので onClickUser内の usersはずっと空配列のままとなる。
  usersを第２引数に設定した場合は、一覧取得時に usersが更新されるのでそのタイミングで onClickUser内の usersも最新化されることで正常に機能するようになる。 */

  return (
    // loading=true(データ取得中)の時は ChakraUIの <Spinner />でローディングアイコンを中央寄せで表示、それ以外の時はユーザー一覧を表示
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {/* <WrapItem>を回す */}
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser} // クリックした userを特定しモーダルを開く関数
              />
            </WrapItem>
          ))}
        </Wrap>
      )}

      {/* ユーザーをクリックすると開かれるモーダル */}
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
        isAdmin={loginUser?.isAdmin}
      />
    </>
  );
});
