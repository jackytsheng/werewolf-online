import React from 'react';
import { Button } from '@material-ui/core';
import { IconText } from './';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '../hooks/useWindowSize';
import { breakpoint, color } from '../themes';

const ButtonContainer = styled.div({
  padding: '1rem',
});

type BarButtonProps = {
  variant: 'setting' | 'users';
  onClick: () => void;
};

const iconText = {
  setting: 'Setting',
  users: 'Players',
};

const icon = {
  setting: faSlidersH,
  users: faUsers,
};

const BarButton = ({ variant, onClick }: BarButtonProps) => {
  const { width } = useWindowSize();
  return (
    <ButtonContainer>
      <Button variant='contained' onClick={onClick}>
        <FontAwesomeIcon icon={icon[variant]} color={color.text} />
        {width! > breakpoint.medium && <IconText>{iconText[variant]}</IconText>}
      </Button>
    </ButtonContainer>
  );
};

export default BarButton;
