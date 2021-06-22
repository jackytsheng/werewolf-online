import React from 'react';
import styled from 'styled-components';
import { color } from '../themes';

type IconTextProps = {
  disabled?: boolean;
  textColor?: string;
};

export const IconText = styled.span(
  ({ disabled = false, textColor = color.text }: IconTextProps) => ({
    margin: '0 0.4rem',
    ...(!disabled && { color: textColor }),
  })
);

type TextType = {
  textColor?: string;
};

export const Text = styled.span(({ textColor = color.text }: TextType) => ({
  color: textColor,
}));
