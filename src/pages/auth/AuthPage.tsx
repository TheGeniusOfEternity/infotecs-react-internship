import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  notification,
  Spin,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useLoginMutation } from "../../entities/auth/api/useLoginMutation";
import "./AuthPage.css";

const { Title } = Typography;

interface LoginFormData {
  login: string;
  password: string;
}

export const AuthPage = () => {
  const [form] = Form.useForm<LoginFormData>();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const onFinish = async (values: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(values);
      notification.success({
        message: "Успешный вход",
        description: "Перенаправление на главную...",
      });
      navigate("/users", { replace: true });
    } catch (err: unknown) {
      notification.error({
        message: "Ошибка входа",
        description: (err as Error).message || "Проверьте логин/пароль",
      });
    }
  };

  const onFieldsChange = () => {
    notification.destroy();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <LockOutlined style={{ fontSize: 48, color: "#ad3df5" }} />
          <Title level={2} style={{ margin: "16px 0 8px" }}>
            Вход в систему
          </Title>
        </div>

        <Spin spinning={loginMutation.isPending}>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            layout="vertical"
            size="large"
          >
            <Form.Item
              className="field"
              name="login"
              rules={[
                { required: true, message: "Введите логин!" },
                { min: 3, message: "Логин минимум 3 символа" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Логин" />
            </Form.Item>

            <Form.Item
              className="field"
              name="password"
              rules={[
                { required: true, message: "Введите пароль!" },
                { min: 3, message: "Пароль минимум 3 символа" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ backgroundColor: "#ad3df5" }}
                type="primary"
                htmlType="submit"
                block
                loading={loginMutation.isPending}
                size="large"
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};