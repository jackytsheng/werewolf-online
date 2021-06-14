import React from "react";
import styled from "styled-components";
import { color } from "../themes";

type Props = {
  textColor?: string;
  hoverColor?: string;
};

const Link = styled.a<Pick<Props, "hoverColor">>(({ hoverColor }) => ({
  textDecoration: "underline",
  textUnderlineOffset: "0.05rem",
  paddingLeft: "0.2rem",
  "&:visited": {
    color: "inherit",
  },
  "&:hover": {
    color: hoverColor,
  },
}));

const Text = styled.p<Pick<Props, "textColor">>(({ textColor }) => ({
  color: textColor,
  display: "flex",
  justifyContent: "center",
}));

const Credit = ({
  textColor = color.darkBlue,
  hoverColor = color.beige,
}: Props) => (
  <Text textColor={textColor}>
    Credit to
    <Link
      hoverColor={hoverColor}
      target="_blank"
      href="https://github.com/jackytsheng"
    >
      jackytsheng
    </Link>
  </Text>
);

export default Credit;
