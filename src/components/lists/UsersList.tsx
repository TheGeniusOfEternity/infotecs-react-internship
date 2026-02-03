import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Divider } from "antd";

interface UserListProps {
  users: {
    id: number;
    name: string;
    avatarLink: string;
    createdAt: string;
  }[]
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const UsersList = ({ users }: UserListProps
) => {
  return (
    <>
      <StyledList>
        {users.map((user) => (
          <>
            <div className="user" key={user.id}>
              <img src={user.avatarLink} alt="user" />
              <h3>{user.name}</h3>
              <p>
                Зарегистрирован {dayjs(user.createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
            <Divider />
          </>
        ))}
      </StyledList>
    </>
  );
}