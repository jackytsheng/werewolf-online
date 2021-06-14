import React from "react";
import styled from "styled-components";
import { color } from "../themes";

type IconText = {
  disabled?: boolean;
};

export const IconText = styled.span<IconText>(({ disabled = false }) => ({
  margin: "0 0.4rem",
  ...(!disabled && { color: color.text }),
}));

export const Text = styled.span({
  color: color.text,
});
