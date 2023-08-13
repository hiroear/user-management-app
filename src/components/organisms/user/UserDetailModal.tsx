// users一覧の userをクリックすると開くモーダル
import { FC, memo, useState, ChangeEvent, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

// UserManagement.tsx から渡される propsの型
type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean; //必須ではないので ?をつける
};

export const UserDetailModal: FC<Props> = memo(
  // ↓ propsの isAdminは true/falseどちらも渡ってこない場合 初期値は falseにしておく
  ({ isOpen, onClose, user, isAdmin = false }) => {
    // 各Inputに入る state
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    //初回レンダリング時に Input欄に userの初期値を設定
    useEffect(() => {
      setUserName(user?.username ?? ""); // ??: 左辺が undefined | null の時 右辺を返す
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
      setPhone(user?.phone ?? "");
    }, [user]);

    // 各 Inputに onChange関数
    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
      setUserName(e.target.value);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value);
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value);
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
      setPhone(e.target.value);

    // 更新ボタン
    const onClickUpdate = () => alert("更新！");

    return (
      // ユーザーをクリックすると出るモーダル部分
      // autoFocus={false}： 開いたら自動で ❌ にフォーカスが当たるのを防ぐ。　isReadOnly: 入力欄を編集できなくする。 motionPreset="slideInBottom": モーダルの出し方(下からスライド)
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay /> {/* モーダルの背景が暗くなる */}
        <ModalContent pb={2}>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack apacing={4}>
              <FormControl>
                <FormLabel>名前</FormLabel>
                <Input
                  value={username}
                  onChange={onChangeUserName}
                  isReadOnly={!isAdmin}
                />
                {/* 型定義 User | null なので nullの可能性もある為 ?(オプショナルチェイニング) つける */}
              </FormControl>
              <FormControl>
                <FormLabel>フルネーム</FormLabel>
                <Input
                  value={name}
                  onChange={onChangeName}
                  isReadOnly={!isAdmin}
                />
                {/* isAdminが trueの時は管理者ユーザーになるので その反対 !isAdmin　とすることで、一般ユーザーのみ isReadOnlyとする */}
              </FormControl>
              <FormControl>
                <FormLabel>MAIL</FormLabel>
                <Input
                  value={email}
                  onChange={onChangeEmail}
                  isReadOnly={!isAdmin}
                />
              </FormControl>
              <FormControl>
                <FormLabel>TEL</FormLabel>
                <Input
                  value={phone}
                  onChange={onChangePhone}
                  isReadOnly={!isAdmin}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          {isAdmin && (
            <ModalFooter>
              <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  }
);
