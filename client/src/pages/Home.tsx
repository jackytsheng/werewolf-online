import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { color, border } from '../themes';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  withStyles,
} from '@material-ui/core';
import useQuery from '../hooks/urlQuery';
import { Credit, Title, Text, IconText } from '../components';
import { Path, setUrl } from '../utils/url';
import { Item, storeToSession } from '../utils/storeToSession';

const Layout = styled.div({
  background: color.lightBlue,
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
});

const Panel = styled.div({
  maxWidth: '31.25rem',
  margin: '5rem auto',
});

const JoinHeader = styled.header({
  textAlign: 'center',
  padding: '1.25rem',
  background: color.framingBrown,
  borderTopLeftRadius: border.ContainerRadius,
  borderTopRightRadius: border.ContainerRadius,
});

const FormContainer = styled.form({
  height: '15rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
});

const JoinMain = styled.main({
  padding: '1.875rem 2.5rem',
  background: color.beige,
  borderBottomLeftRadius: border.ContainerRadius,
  borderBottomRightRadius: border.ContainerRadius,
});

const StyleInputLabel = withStyles({
  root: {
    '&.Mui-focused': {
      color: color.framingBrown,
    },
  },
})(InputLabel);

const StyleOutlinedInput = withStyles({
  root: {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: color.framingBrown,
    },
  },
  input: {
    color: color.text,
  },
})(OutlinedInput);

const Home = ({}: any) => {
  const [name, setName] = useState('');

  const storedUsername = sessionStorage.getItem(Item.UserName);
  const storedRoomId = sessionStorage.getItem(Item.RoomId);
  const roomId = useQuery('room');
  // if session have record both room Id and name then direct it to the lobby
  // if roomId exist, user probably pasted another game url here
  // if working correctly session should not just have either username or roomId
  const shouldRedirect = !roomId && storedUsername && storedRoomId;
  const NAME_LIMIT = 20;

  useEffect(() => {
    if (!roomId) return;
    storeToSession({ roomId });
    setUrl(Path.Home);
  }, [roomId]);

  const onEnterName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // max 20 character
    setName(value.slice(0, NAME_LIMIT).trim());
  };

  return (
    <Layout>
      <Panel>
        <JoinHeader>
          <Title text='Werewolf Home' />
        </JoinHeader>
        <JoinMain>
          <FormContainer
            autoComplete='off'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl fullWidth={true} variant='outlined' margin='normal'>
              <StyleInputLabel htmlFor='component-outlined'>
                Name
              </StyleInputLabel>
              <StyleOutlinedInput
                id='component-outlined'
                label='Name'
                placeholder={`Less than ${NAME_LIMIT} characters`}
                onChange={onEnterName}
              />
            </FormControl>
            <Button
              component={Link}
              to='/lobby'
              onClick={() => sessionStorage.setItem('username', name)}
              fullWidth={true}
              variant='outlined'
              disabled={!name}
            >
              <FontAwesomeIcon
                icon={faPlay}
                color={name ? color.text : undefined}
              />
              <IconText disabled={!name}>{roomId ? 'Join' : 'Play'}</IconText>
            </Button>
            <Button
              component={Link}
              to='/dealer'
              fullWidth={true}
              variant='outlined'
            >
              <Text>Dealer</Text>
            </Button>
          </FormContainer>
        </JoinMain>
      </Panel>
      <Credit />
    </Layout>
  );
};

export default Home;
