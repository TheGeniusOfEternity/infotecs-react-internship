import {
  App,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useCreateUserMutation } from "@/entities/user/api/useCreateUserMutation";
import { useUpdateUserMutation } from "@/entities/user/api/useUpdateUserMutation";
import type { UpdateUserRequestDto } from "@/entities/user/model/update-user-request.dto";
import { useDeleteUserMutation } from "@/entities/user/api/useDeleteUserMutation";
const { Title } = Typography;

interface UserData {
  id?: number;
  name: string;
  avatar: string;
  createdAt?: string
}

interface UserCrudModalProps {
  user: UserData | null;
  toggleModal: () => void;
  isOpened: boolean;
}
export const UserCrudModal = ({ user, toggleModal, isOpened }: UserCrudModalProps) => {

  const { notification } = App.useApp();
  const [form] = Form.useForm<UserData>();

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(createUserMutation.isPending || updateUserMutation.isPending || deleteUserMutation.isPending);
  }, [createUserMutation, updateUserMutation]);

  const deleteUser = async (id: number) => {
   try {
     await deleteUserMutation.mutateAsync(id);
     notification.success({
       message: "Успех",
       description: `Пользователь успешно удалён`,
     });
     toggleModal();
   } catch (error: unknown) {
     notification.error({
       message: "Ошибка при удалении пользователя",
       description: (error as Error).message || "Неизвестная ошибка",
     });
   }
  }

  const saveUser = async (data: UserData) => {
    try {
      data.id
        ? await updateUserMutation.mutateAsync(data as UpdateUserRequestDto)
        : await createUserMutation.mutateAsync(data);
      notification.success({
        message: "Успех",
        description: data.id
          ? `Информация о пользователе ${data.name} успешно обновлена`
          : `Пользователь с именем ${data.name} успешно зарегистрирован`,
      });
      toggleModal();
    } catch (error: unknown) {
      notification.error({
        message: data.id
          ? "Ошибка обновления данных пользователя"
          : "Ошибка регистрации нового пользователя",
        description: (error as Error).message || "Неизвестная ошибка",
      });
    }
  }

  useEffect(() => {
    if (!form) return;
    user !== null
      ? form.setFieldsValue(user)
      : form.resetFields();
  }, [user, form]);

  return (
    <>
      <Modal
        open={isOpened}
        footer={null}
        forceRender={true}
        onCancel={toggleModal}
      >
        <Title level={4}>
          {user?.id ? "Редактирование" : "Создание"} пользователя
        </Title>
        <Form
          onFinish={saveUser}
          form={form}
          name="user-crud"
          layout="vertical"
          size="middle"
          requiredMark={false}
        >
          {user?.id && (
            <Form.Item name="id" label="Id">
              <InputNumber disabled={true} style={{ width: "100%" }} />
            </Form.Item>
          )}
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Введите имя!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Ссылка на аватарку"
            rules={[
              { required: true, message: "Введите ссылку на аватарку!" },
              { min: 3, message: "Пароль минимум 3 символа" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item hidden={true} name="createdAt"><Input /></Form.Item>
          <Form.Item>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              {user?.id && (
                <Button
                  onClick={() => deleteUser(user.id as number)}
                  className="cancel-btn"
                  style={{ marginRight: "auto" }}
                  danger={true}
                  loading={deleteUserMutation.isPending}
                  disabled={isPending}
                >
                  Удалить
                </Button>
              )}
              <Button
                onClick={toggleModal}
                disabled={isPending}
              >
                Отмена
              </Button>
              <Button
                loading={createUserMutation.isPending || updateUserMutation.isPending}
                disabled={isPending}
                type="primary"
                htmlType="submit"
                block
                style={{ width: "auto" }}
              >
                {user?.id ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}