import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { border, color } from '../themes';
import { flexCenter, windowFix } from '../utils/styles';
import { Button } from '@material-ui/core';
import { Text } from './';
const Back = styled.div({
  ...windowFix,
  ...flexCenter,
  backgroundColor: color.modal,
  zIndex: 1,
});

const Wrapper = styled.div({
  borderRadius: border.ContainerRadius,
  padding: '1rem',
  backgroundColor: color.beige,
  display: 'flex',
  flexDirection: 'column',
});

type ModalProps = {
  children: ReactNode;
  onClickClose: () => void;
};

const Modal = ({ children, onClickClose }: ModalProps) => (
  <Back>
    <Wrapper>
      {children}
      <Button onClick={onClickClose} variant='contained'>
        <Text>Close</Text>
      </Button>
    </Wrapper>
  </Back>
);

export default Modal;
