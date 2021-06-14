import React from "react";
import styled from "styled-components";
import { color } from "../themes";

const UserCircle = styled.div<Pick<SeatProps, "isPlaceHolder">>(
  ({ isPlaceHolder }) => ({
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "50%",
    backgroundColor: color.lightBlue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `solid 0.25rem ${color.darkBlue}`,
    ...(isPlaceHolder && { visibility: "hidden" }),
  })
);

const NumberIcon = styled.span({
  fontSize: "2rem",
  fontWeight: "bold",
  color: color.darkBlue,
  marginTop: "0.9rem",
  fontFamily: "'Baloo Tammudu 2', cursive",
});

const SeatSlot = styled.div<Pick<SeatProps, "namePos">>(({ namePos }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.3rem",
  flexDirection: namePos === "left" ? "row-reverse" : undefined,
}));

const NameTag = styled.span({
  color: color.beige,
  flex: 1,
  margin: "0 0.5rem",
});

export type SeatProps = {
  namePos: "left" | "right" | "none";
  seatNumber?: number;
  name?: string;
  isPlaceHolder?: boolean;
};

const Seat = ({
  namePos,
  seatNumber,
  name,
  isPlaceHolder = false,
}: SeatProps) => (
  <SeatSlot namePos={namePos}>
    <UserCircle isPlaceHolder={isPlaceHolder}>
      <NumberIcon>{seatNumber}</NumberIcon>
    </UserCircle>
    <NameTag>{name}</NameTag>
  </SeatSlot>
);

export default Seat;
