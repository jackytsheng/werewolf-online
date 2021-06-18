import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWolfPackBattalion } from '@fortawesome/free-brands-svg-icons';
import { breakpoint, color } from '../themes';
import useWindowSize from '../hooks/useWindowSize';
import { IconText } from '.';

type TitleTextProps = {
  useMobileSize?: boolean;
};

const TitleText = styled.h1(({ useMobileSize = false }: TitleTextProps) => ({
  color: color.beige,
  ...(useMobileSize && { fontSize: '1.5rem' }),
}));

export const SubtitleText = styled.p({
  color: color.text,
  fontWeight: 'bold',
  fontSize: '1.3rem',
});

export type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  const { width } = useWindowSize();
  const useMobileSize = width! < breakpoint.medium;
  return (
    <TitleText useMobileSize={useMobileSize}>
      <FontAwesomeIcon icon={faWolfPackBattalion} />
      <IconText>{text}</IconText>
    </TitleText>
  );
};

export default Title;
