import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Упс, этой страницы не существует"
      extra={<Button onClick={() => navigate("/users")}>На главную</Button>}
    />
  );
}