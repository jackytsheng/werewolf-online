import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubtitleText, Text } from '.';
import { border, color } from '../themes';
import getRolesObj, {
  getFullRolesCategory,
  Role,
  RolesCategory,
  validateGameSetting,
} from './GameType';

const Wrapper = styled.div({
  paddingBottom: '0.7rem',
});

const RoleOptionWrapper = styled.div({
  margin: '0.3rem 0',
  display: 'flex',
  width: '20rem',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

type ItemProps = {
  textColor?: string;
} & Pick<RoleItemProps, 'isPlaceHolder'>;

const Item = styled.div<ItemProps>(
  ({ textColor = color.beige, isPlaceHolder }) => ({
    borderRadius: border.ContainerRadius,
    border: `solid 0.0625rem ${color.framingBrown}`,
    padding: '0.2rem 0.4rem',
    margin: '0.3rem',
    width: '3rem',
    display: 'flex',
    justifyContent: 'center',
    color: textColor,
    '&:hover': {
      cursor: 'pointer',
    },
    ...(isPlaceHolder && { visibility: 'hidden' }),
  })
);

type RoleItemProps = {
  role?: Role;
  onClick?: () => void;
  isPlaceHolder?: boolean;
};
const RoleItem = ({ role, onClick, isPlaceHolder }: RoleItemProps) => {
  return !isPlaceHolder ? (
    <Item textColor={role!.color} onClick={onClick}>
      {role!.shortName}
    </Item>
  ) : (
    <Item isPlaceHolder={isPlaceHolder}>空</Item>
  );
};

type GameSettingProps = {
  roles: RolesCategory[];
  setRoles: (roles: RolesCategory[]) => void;
};

// For adding filler item to make flex works
const ROLES_DISPLAY_PER_ROW = 5;
const GameSetting = ({ roles, setRoles }: GameSettingProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timeOutAsync: NodeJS.Timeout;
    if (errorMessage) {
      timeOutAsync = setTimeout(() => setErrorMessage(''), 2000);
    }
    return () => {
      clearTimeout(timeOutAsync);
    };
  }, [errorMessage]);
  return (
    <Wrapper>
      <SubtitleText>Current Game Setting</SubtitleText>
      <Text>Currently {roles.length} Players. Click to remove</Text>

      <RoleOptionWrapper>
        {roles.map((role: RolesCategory, i: number) => (
          <RoleItem
            key={`${getRolesObj(role).shortName}_${i}`}
            role={getRolesObj(role)}
            onClick={() => {
              const newRoles = roles.filter((_, j) => i !== j);
              const error = validateGameSetting(newRoles).errorMessage;
              setErrorMessage(error);
              !error && setRoles(newRoles.sort());
            }}
          />
        ))}
        {Array(
          roles.length % ROLES_DISPLAY_PER_ROW
            ? ROLES_DISPLAY_PER_ROW - (roles.length % ROLES_DISPLAY_PER_ROW)
            : 0
        )
          .fill(0)
          .map((_, i: number) => {
            return <RoleItem key={`PlaceHolder_${i}`} isPlaceHolder={true} />;
          })}
      </RoleOptionWrapper>

      <SubtitleText>Role Setting</SubtitleText>
      <Text>Click to add</Text>

      <RoleOptionWrapper>
        {getFullRolesCategory().map((role: RolesCategory, i: number) => (
          <RoleItem
            key={`${getRolesObj(role).shortName}_${i}`}
            role={getRolesObj(role)}
            onClick={() => {
              const newRoles = [...roles, role];
              const error = validateGameSetting(newRoles).errorMessage;
              setErrorMessage(error);
              !error && setRoles(newRoles.sort());
            }}
          />
        ))}
        {Array(
          getFullRolesCategory().length % ROLES_DISPLAY_PER_ROW
            ? ROLES_DISPLAY_PER_ROW -
                (getFullRolesCategory().length % ROLES_DISPLAY_PER_ROW)
            : 0
        )
          .fill(0)
          .map((_, i: number) => (
            <RoleItem key={`PlaceHolder_${i}`} isPlaceHolder={true} />
          ))}
      </RoleOptionWrapper>
      {errorMessage ? (
        <Text textColor={color.errorColor}>{errorMessage}</Text>
      ) : (
        <Text>Close to save</Text>
      )}
    </Wrapper>
  );
};

export default GameSetting;
