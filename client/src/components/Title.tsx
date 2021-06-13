import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWolfPackBattalion } from "@fortawesome/free-brands-svg-icons";
import { color } from "../themes";

const TitleText = styled.h1({
  color: color.beige,
});

const IconText = styled.span({
  margin: "0 0.4rem",
});

export type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => (
  <TitleText>
    <FontAwesomeIcon icon={faWolfPackBattalion} />
    <IconText>{text}</IconText>
  </TitleText>
);

export default Title;
