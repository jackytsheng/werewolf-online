import React from 'react';
import styled from 'styled-components';
import { SubtitleText, Text } from '.';
import { border, color } from '../themes';
import getRolesObj, {
  getFullRoleObjects,
  Role,
  RolesCategory,
} from './GameType';

const Wrapper = styled.div({});

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
    '& hover': {
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
  return (
    <Wrapper>
      <SubtitleText>Current Game Setting</SubtitleText>
      <Text>{'(Click to remove)'}</Text>
      <RoleOptionWrapper>
        {roles.map((role: RolesCategory, i: number) => (
          <RoleItem
            key={`${getRolesObj(role).shortName}_${i}`}
            role={getRolesObj(role)}
            onClick={() => {}}
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
        {}
      </RoleOptionWrapper>
      <SubtitleText>Role Setting</SubtitleText>
      <Text>{'(Click to add)'}</Text>
      <RoleOptionWrapper>
        {getFullRoleObjects().map((role: Role, i: number) => (
          <RoleItem
            key={`${role.shortName}_${i}`}
            role={role}
            onClick={() => {}}
          />
        ))}
        {Array(
          getFullRoleObjects().length % ROLES_DISPLAY_PER_ROW
            ? ROLES_DISPLAY_PER_ROW - (roles.length % ROLES_DISPLAY_PER_ROW)
            : 0
        )
          .fill(0)
          .map((_, i: number) => (
            <RoleItem key={`PlaceHolder_${i}`} isPlaceHolder={true} />
          ))}
      </RoleOptionWrapper>
    </Wrapper>
  );
};

export default GameSetting;
