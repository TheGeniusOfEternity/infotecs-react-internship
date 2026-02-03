import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { UsersList } from "../components/lists/UsersList";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const UsersPage = () => {
  const mockUsers = [
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
    { id: 1, name: "Ivanov Ivan", avatarLink: "https://www.google.com", createdAt: "23.10.2001" },
  ]
  return (
    <StyledPage>
      <Button
        type="primary"
        title="Выход"
      />
      <UsersList users={mockUsers} />
    </StyledPage>
  )
}