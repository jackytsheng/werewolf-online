import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { color, border } from "../themes";
import { usePopper } from "react-popper";
import copy from "copy-to-clipboard";
import { IconText } from ".";
import useWindowSize from "../hooks/useWindowSize";
import { breakpoint } from "../themes/breakpoint";

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
  color: color.midBlue,
  borderRadius: border.ContainerRadius,
  visibility: open ? "visible" : "hidden",
  minWidth: "5rem",
  zIndex: 1,
}));

const PopperContainer = styled.div({
  position: "relative",
});

const CopyLinkPopper = ({ link }: PopperProps) => {
  const refEl = useRef<HTMLButtonElement | null>(null);
  const popperEl = useRef<HTMLDivElement | null>(null);
  const [popperState, setPopperState] = useState(false);
  const { width } = useWindowSize();
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
      <Button ref={refEl} variant="contained" onClick={handleClick}>
        <FontAwesomeIcon icon={faLink} color={color.text} />
        {width! > breakpoint.medium && <IconText>Copy Invite Link</IconText>}
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

export default CopyLinkPopper;
