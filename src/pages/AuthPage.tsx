import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  App,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useLoginMutation } from "@/entities/auth/api/useLoginMutation";
import styled from "styled-components";
import { primary } from "@/index";

const { Title } = Typography;

interface LoginFormData {
  login: string;
  password: string;
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;

  .field {
    margin-bottom: 2.25rem;
  }
`;

export const AuthPage = () => {

  const [form] = Form.useForm<LoginFormData>();
  const { notification } = App.useApp();

  const loginMutation = useLoginMutation();

  const onFinish = async (values: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(values);
      notification.success({
        message: "Успешный вход",
        description: "Перенаправление на главную...",
      });
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
    <StyledPage>
      <Spin spinning={loginMutation.isPending}>
        <Card style={{ width: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <LockOutlined style={{ fontSize: 48, color: primary[5] }} />
            <Title level={2} style={{ margin: "16px 0 8px" }}>
              Авторизация
            </Title>
          </div>

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
        </Card>
      </Spin>
    </StyledPage>
  );
};