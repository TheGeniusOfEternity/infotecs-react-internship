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
import type { User } from "@/entities/user/api/types";
const { Title } = Typography;

type UserData= Required<Pick<User, "name" | "avatar">> &
  Partial<Pick<User, "id" | "createdAt">>;

interface UserCrudModalProps {
  user: Partial<User> | null;
  closeModal: () => void;
  open: boolean;
}
export const UserCrudModal = ({ user, closeModal, open }: UserCrudModalProps) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<UserData>();

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(
      createUserMutation.isPending ||
        updateUserMutation.isPending ||
        deleteUserMutation.isPending,
    );
  }, [createUserMutation, updateUserMutation, deleteUserMutation]);

  const deleteUser = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      notification.success({
        message: "Успех",
        description: `Пользователь успешно удалён`,
      });
      closeModal();
    } catch (error: unknown) {
      notification.error({
        message: "Ошибка при удалении пользователя",
        description: (error as Error).message || "Неизвестная ошибка",
      });
    }
  };

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
      closeModal();
    } catch (error: unknown) {
      notification.error({
        message: data.id
          ? "Ошибка обновления данных пользователя"
          : "Ошибка регистрации нового пользователя",
        description: (error as Error).message || "Неизвестная ошибка",
      });
    }
  };

  useEffect(() => {
    if (!form) return;
    user !== null && user.id
      ? form.setFieldsValue(user)
      : form.resetFields();
  }, [user, form]);

  return (
    <>
      <Modal
        open={open}
        footer={null}
        destroyOnHidden={true}
        forceRender={true}
        onCancel={closeModal}
        closable={!isPending}
        maskClosable={!isPending}
      >
        <Title level={4}>
          {user?.id ? "Редактирование" : "Создание"} пользователя
        </Title>
        <Form
          disabled={isPending}
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
              {
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  const trimmed = String(value).trim();
                  const imageUrlPattern =
                    /^(https?:)?\/\/.+\.(png|jpe?g|gif|webp|svg)$/i;
                  if (!imageUrlPattern.test(trimmed)) {
                    return Promise.reject(
                      new Error(
                        "Введите корректную ссылку на изображение (http(s):// или //)!",
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item hidden={true} name="createdAt">
            <Input />
          </Form.Item>
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
              <Button onClick={closeModal} disabled={isPending}>
                Отмена
              </Button>
              <Button
                loading={
                  createUserMutation.isPending || updateUserMutation.isPending
                }
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
};