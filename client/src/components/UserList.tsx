import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../hooks/type';
import { IconText } from './';
import { color } from '../themes';

const Wrapper = styled.div({
  width: '20rem',
  maxHeight: '20rem',
  overflowY: 'scroll',
  marginBottom: '1rem',
});
const UserItem = styled.div({
  width: '100%',
  padding: '0.2rem',
});

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => (
  <Wrapper>
    {users.map((user: User) => (
      <UserItem key={user.userId}>
        <FontAwesomeIcon icon={faUser} color={color.text} />
        <IconText>{user.userName}</IconText>
      </UserItem>
    ))}
  </Wrapper>
);

export default UserList;
