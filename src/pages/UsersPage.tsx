import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { UsersList } from "../components/lists/UsersList";
import { clearToken } from "../shared/api/token";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .users-wrapper {
    width: 80%;
    height: 70%;
  }

  .exit-btn {
    position: absolute;
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
      height: 100%;
      padding-top: 20%;
      box-sizing: border-box;
    }

    .create-user-btn {
      position: absolute;
      top: 1rem;
      left: 1rem;
      margin: 0;
    }
  }
`;

export const UsersPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    clearToken();
    queryClient.removeQueries({ queryKey: ["auth"] });
    navigate("/login", { replace: true });
  }

  const mockUsers = [
    {
      createdAt: "2026-02-01T04:17:06.012Z",
      name: "Mr. Ellis Mayer",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/72.jpg",
      id: 1,
    },
    {
      createdAt: "2026-02-01T09:32:53.879Z",
      name: "Linda Becker",
      avatar: "https://avatars.githubusercontent.com/u/74274270",
      id: 2,
    },
    {
      createdAt: "2026-02-01T05:26:40.511Z",
      name: "Carmen Nienow",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/78.jpg",
      id: 3,
    },
    {
      createdAt: "2026-01-31T17:30:53.618Z",
      name: "Grant Schowalter",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/12.jpg",
      id: 4,
    },
    {
      createdAt: "2026-01-31T22:09:36.272Z",
      name: "Vernon Armstrong",
      avatar: "https://avatars.githubusercontent.com/u/92876611",
      id: 5,
    },
    {
      createdAt: "2026-02-01T04:17:06.012Z",
      name: "Mr. Ellis Mayer",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/72.jpg",
      id: 6,
    },
    {
      createdAt: "2026-02-01T09:32:53.879Z",
      name: "Linda Becker",
      avatar: "https://avatars.githubusercontent.com/u/74274270",
      id: 7,
    },
    {
      createdAt: "2026-02-01T05:26:40.511Z",
      name: "Carmen Nienow",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/78.jpg",
      id: 8,
    },
    {
      createdAt: "2026-01-31T17:30:53.618Z",
      name: "Grant Schowalter",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/12.jpg",
      id: 9,
    },
    {
      createdAt: "2026-01-31T22:09:36.272Z",
      name: "Vernon Armstrong",
      avatar: "https://avatars.githubusercontent.com/u/92876611",
      id: 10,
    },
    {
      createdAt: "2026-02-01T04:17:06.012Z",
      name: "Mr. Ellis Mayer",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/72.jpg",
      id: 11,
    },
    {
      createdAt: "2026-02-01T09:32:53.879Z",
      name: "Linda Becker",
      avatar: "https://avatars.githubusercontent.com/u/74274270",
      id: 12,
    },
    {
      createdAt: "2026-02-01T05:26:40.511Z",
      name: "Carmen Nienow",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/78.jpg",
      id: 13,
    },
    {
      createdAt: "2026-01-31T17:30:53.618Z",
      name: "Grant Schowalter",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/12.jpg",
      id: 14,
    },
    {
      createdAt: "2026-01-31T22:09:36.272Z",
      name: "Vernon Armstrong",
      avatar: "https://avatars.githubusercontent.com/u/92876611",
      id: 15,
    },
  ];
  return (
    <StyledPage>
      <Button
        type="primary"
        size="large"
        className="exit-btn"
        onClick={logout}
      >
        Выход
      </Button>
      <div className="users-wrapper">
        <UsersList users={mockUsers} />
      </div>
      <Button className="create-user-btn" type="primary" size="large">
        Создать пользователя
      </Button>
    </StyledPage>
  );
}