import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWolfPackBattalion } from "@fortawesome/free-brands-svg-icons";
import { breakpoint, color } from "../themes";
import useWindowSize from "../hooks/useWindowSize";

type TitleTextProps = {
  useMobileSize?: boolean;
};

const TitleText = styled.h1<TitleTextProps>(({ useMobileSize = false }) => ({
  color: color.beige,
  ...(useMobileSize && { fontSize: "1.5rem" }),
}));

const IconText = styled.span({
  margin: "0 0.4rem",
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
