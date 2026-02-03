import { Button, Form, Input, InputNumber, Modal, Typography } from "antd";
import React, { useEffect } from "react";
const { Title } = Typography;

interface UserData {
  id?: number;
  name: string;
  avatar: string;
}

interface UserCrudModalProps {
  user: UserData | null;
  toggleModal: () => void;
  isOpened: boolean;
}
export const UserCrudModal = ({ user, toggleModal, isOpened }: UserCrudModalProps) => {
  const [form] = Form.useForm<UserData>();

  const deleteUser = (id: number) => {
    console.log(`deleteById: ${id}`);
  }

  const saveUser = (data: UserData) => {
    console.log("save", data);
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
            <Input/>
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
                >
                  Удалить
                </Button>
              )}
              <Button onClick={toggleModal}>Отмена</Button>
              <Button
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