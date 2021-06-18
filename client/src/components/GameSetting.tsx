import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div({});

const RoleOptionWrapper = styled.div({});
const RoleItem = styled.div({});

export enum Role {
  WEREWOLF = 'werewolf',
  PROPHET = 'prophet',
  WITCH = 'witch',
  HUNTER = 'hunter',
  IDIOT = 'idiot',
  VILLAGER = 'villager',
  KNIGHT = 'knight',
  GUARD = 'guard',
  JUPITER = 'jupiter',
  WOLFKING = 'wolfking',
  MUSTEE = 'mustee',
  WHITE = 'whitewolf',
}

type GameSettingProps = {
  roles: Role[];
  setRoles: () => void;
};

const GameSetting = ({ roles, setRoles }: GameSettingProps) => {
  <></>;
};

export default GameSetting;
