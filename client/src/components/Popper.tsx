import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button, makeStyles } from "@material-ui/core";
import { color, border } from "../themes";
import { usePopper } from "react-popper";
import copy from "copy-to-clipboard";

export type PopperProps = {
  link: string;
};

type PopoverProps = {
  open: boolean;
};

const Popover = styled.div<PopoverProps>(({ open }) => ({
  padding: "0.5rem",
  marginTop: "0.1rem",
  backgroundColor: color.lightColor,
  color: color.darkColorB,
  borderRadius: border.ContainerRadius,
  visibility: open ? "visible" : "hidden",
}));

const PopperContainer = styled.div({
  position: "relative",
});

const Popper = ({ link }: PopperProps) => {
  const refEl = useRef<HTMLButtonElement | null>(null);
  const popperEl = useRef<HTMLDivElement | null>(null);
  const [popperState, setPopperState] = useState(false);

  // User Popper Js for the popper
  const { styles, attributes } = usePopper(refEl.current, popperEl.current);

  const handleClick = () => {
    copy(link);
    setPopperState(true);

    // Dismiss the popover after 3s
    setTimeout(() => setPopperState(false), 1500);
  };

  return (
    <PopperContainer>
      <Button ref={refEl} variant="outlined" onClick={handleClick}>
        Copy Invite Link
      </Button>
      <Popover
        open={popperState}
        ref={popperEl}
        style={styles.popper}
        {...attributes.popper}
      >
        Link Copied !
      </Popover>
    </PopperContainer>
  );
};

export default Popper;
