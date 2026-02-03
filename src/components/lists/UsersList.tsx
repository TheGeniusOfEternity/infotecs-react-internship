import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Divider } from "antd";
import { gray } from "@ant-design/colors";

interface UserListProps {
  users: {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
  }[],
  onUserSelected: (id: number) => void,
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;

  .user {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 1.2rem;
    row-gap: 0.5rem;
    padding: 1.2rem;
  }

  .name,
  .created-at {
    margin: 0;
  }

  .created-at {
    color: ${gray[0]};
  }

  .avatar {
    grid-row: 1 / -1;
    aspect-ratio: 1 / 1;
    width: 3rem;
    border-radius: 25%;
  }

  .divider {
    margin: 0;
  }
`;

export const UsersList = ({ users, onUserSelected }: UserListProps
) => {
  return (
    <>
      <StyledList>
        {users.map((user, index) => (
          <div className="wrapper" key={user.id}>
            <div className="user">
              <img
                className="avatar"
                src={user.avatar}
                alt="user-avatar"
                onClick={() => onUserSelected(user.id)}
              />
              <h4
                className="name"
                onClick={() => onUserSelected(user.id)}
              >
                {user.name}
              </h4>
              <p className="created-at">
                Зарегистрирован {dayjs(user.createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
            {users.length - 1 !== index ? (
              <Divider className="divider" />
            ) : (
              <></>
            )}
          </div>
        ))}
      </StyledList>
    </>
  );
}