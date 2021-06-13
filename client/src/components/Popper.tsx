import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button, Popover, makeStyles } from "@material-ui/core";
import { color, border } from "../themes";

export type PopperProps = {
  link: string;
};

const useStyles = makeStyles({
  paper: {
    padding: "0.5rem",
    backgroundColor: color.lightColor,
    color: color.darkColorB,
    borderRadius: border.ContainerRadius,
  },
});

const PopperContainer = styled.div({
  position: "relative",
});

const Popper = ({ link }: PopperProps) => {
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const [popperState, setPopperState] = useState(false);
  // overwrite popover style
  const classes = useStyles();

  const handleClick = () => {
    navigator.clipboard.writeText(link);
    setPopperState(true);

    // Dismiss the popover after 3s
    setTimeout(() => setPopperState(false), 1500);
  };

  const handleClose = () => {
    setPopperState(false);
  };

  return (
    <PopperContainer>
      <Button ref={anchorEl} variant="outlined" onClick={handleClick}>
        Copy Invite Link
      </Button>
      <Popover
        open={popperState}
        classes={classes}
        onClose={handleClose}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        Link Copied !
      </Popover>
    </PopperContainer>
  );
};

export default Popper;
