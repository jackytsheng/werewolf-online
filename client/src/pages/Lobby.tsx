import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextField, withStyles, Button } from '@material-ui/core';
import { color } from '../themes';
import { Message } from '../hooks/type';
import useSocket from '../hooks/socket';
import useQuery from '../hooks/urlQuery';
import { BarButton, ChatBubble, CopyLinkPopper, Title } from '../components';
import Seat from '../components/Seat';
import Modal from '../components/Modal';
import UserList from '../components/UserList';
import GameSetting from '../components/GameSetting';
import { RolesCategory, validateGameSetting } from '../components/GameType';
import { Redirect } from 'react-router-dom';
import { initialGameSetting } from '../configs/gameSetting';
import { Item } from '../utils/storeToSession';
import { Path } from '../utils/url';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: color.text,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: color.midBlue,
    },
    '& .MuiFilledInput-underline:after': {
      border: `0.125rem solid ${color.midBlue}`,
    },
    '& .MuiFilledInput-root': {
      backgroundColor: color.beige,
    },
  },
})(TextField);

const BackWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
});

const Bar = styled.div({
  backgroundColor: color.framingBrown,
  display: 'flex',
  width: '100%',
});

const HeaderBar = styled(Bar)({
  height: '10%',
  padding: '0 2rem',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const BottomBar = styled(Bar)({
  height: '15%',
  justifyContent: 'center',
  paddingTop: '1.5rem',
});

const Main = styled.div({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  height: '75%',
  backgroundColor: color.darkBlue,
});

const ChatSpace = styled.div({
  maxWidth: '60.5rem',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: color.midBlue,
});

const MessageContainer = styled.div({
  maxWidth: '28.125rem',
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  padding: '1.875rem',
  overflowY: 'auto',
  backgroundColor: color.beige,
});

const InputContainer = styled.div({
  width: '18rem',
  height: '3.4rem',
  display: 'flex',
});

const SeatContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const MenuBar = styled.div({
  padding: '0.5rem',
  height: '30%',
  right: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
});

const Lobby = () => {
  // get username and room from uri
  const userName = sessionStorage.getItem(Item.UserName) || '';
  const roomId = sessionStorage.getItem(Item.RoomId) || '';
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const hasUserName = !!userName;

  const { send, messages, lobbyInfo } = useSocket({
    roomId,
    userName,
    enabled: hasUserName,
  });

  const [value, setValue] = useState('');
  const [userModal, setUserModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [roles, setRoles] = useState(initialGameSetting);

  useEffect(() => {
    const el = messageContainerRef?.current;
    el?.scroll(0, el?.scrollHeight);
  }, [messages]);

  const onType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'Enter') {
      setValue('');
      value.trim() && send(value);
      event.preventDefault();
    }
  };
  return (
    <BackWrapper>
      {!hasUserName && <Redirect to={Path.Home} />}
      <HeaderBar>
        <Title text='Werewolf Lobby' />
        <CopyLinkPopper
          link={`${window.location.origin}/home?room=${lobbyInfo.currentRoomId}`}
        />
      </HeaderBar>
      <Main>
        <ChatSpace>
          <SeatContainer>
            {/* TODO: Replace this with Player Slot */}
            {Array(roles.length < 8 ? roles.length : 8)
              .fill(undefined)
              .map((_, i) => (
                <Seat
                  key={`Seat-${i}`}
                  namePos='right'
                  name='Jacky'
                  seatNumber={i + 1}
                />
              ))}
            {Array(roles.length < 8 ? 8 - (roles.length % 8) : 0)
              .fill(undefined)
              .map((_, i) => (
                <Seat
                  key={`placeHolder-${i}`}
                  namePos='right'
                  isPlaceHolder={true}
                />
              ))}
          </SeatContainer>
          <MessageContainer ref={messageContainerRef}>
            {messages.map((message: Message) => (
              <ChatBubble
                {...message}
                key={`${message.userName.replaceAll(' ', '')}_${
                  message.time
                }_${message.content.replaceAll(' ', '')}`}
              />
            ))}
          </MessageContainer>
          <SeatContainer>
            {Array(roles.length > 8 ? roles.length - 8 : 0)
              .fill(undefined)
              .map((_, i) => (
                <Seat
                  key={`Seat-${i + 9}`}
                  namePos='left'
                  name='Jacky'
                  seatNumber={i + 9}
                />
              ))}
            {Array(roles.length < 9 ? 8 : 8 - (roles.length % 8 || 8))
              .fill(undefined)
              .map((_, i) => (
                <Seat
                  key={`PlaceHolder-${i + 9}`}
                  namePos='left'
                  isPlaceHolder={true}
                />
              ))}
          </SeatContainer>
        </ChatSpace>
      </Main>
      <BottomBar>
        <BarButton variant='users' onClick={() => setUserModal(true)} />
        <InputContainer>
          <CssTextField
            id='multi-line-input'
            label='Enter Message'
            variant='filled'
            multiline
            fullWidth={true}
            rowsMax={2}
            value={value}
            onChange={onType}
            onKeyDown={onEnter}
          />
        </InputContainer>

        <BarButton variant='setting' onClick={() => setSettingModal(true)} />
      </BottomBar>

      {userModal && (
        <Modal onClickClose={() => setUserModal(false)}>
          <UserList users={lobbyInfo.users} />
        </Modal>
      )}
      {settingModal && (
        <Modal onClickClose={() => setSettingModal(false)}>
          <GameSetting
            roles={roles}
            setRoles={(roles: RolesCategory[]) => setRoles(roles)}
          />
        </Modal>
      )}
    </BackWrapper>
  );
};

export default Lobby;
