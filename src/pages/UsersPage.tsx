import React from "react";
import styled from "styled-components";
import { Button, Spin } from "antd";
import { UsersList } from "@/components/lists/UsersList";
import { clearToken } from "@/shared/api/token";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUsersQuery } from "@/entities/user/api/useGetUsersQuery";
import { UserCrudModal } from "@/components/modals/UserCrudModal";
import type { User } from "@/entities/user/api/types";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .users-wrapper {
    width: 80vw;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .exit-btn {
    position: absolute;
    z-index: 10;
    top: 1rem;
    right: 1rem;
  }

  .create-user-btn {
    display: flex;
    margin: 1rem auto 1rem 1rem;
  }

  @media screen and (orientation: portrait) {
    .users-wrapper {
      width: 100%;
      height: 100vh;
      padding-top: 15%;
      box-sizing: border-box;
    }

    .create-user-btn {
      position: absolute;
      z-index: 10;
      top: 1rem;
      left: 1rem;
      margin: 0;
    }
  }
`;

export const UsersPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUsersQuery();
  const [open, setOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const selectUser = (id: number) => {
    setSelectedUser(data?.find(user => user.id === id) ?? null);
    setOpen(true);
  }

  const logout = () => {
    clearToken();
    queryClient.removeQueries({ queryKey: ["auth"] });
    navigate("/login", { replace: true });
  }

  return (
    <StyledPage>
      <Button type="primary" size="large" className="exit-btn" onClick={logout}>
        Выход
      </Button>
      <Spin
        spinning={isLoading}
      >
        <div className="users-wrapper">
          {data &&
            <UsersList
              users={data}
              onUserSelected={selectUser}
            />
          }
        </div>
      </Spin>
      <Button
        className="create-user-btn"
        type="primary"
        size="large"
        onClick={() => selectUser(-1)}
      >
        Создать пользователя
      </Button>
      <UserCrudModal
        user={selectedUser}
        isOpened={open}
        toggleModal={() => setOpen(!open)}
      />
    </StyledPage>
  );
}