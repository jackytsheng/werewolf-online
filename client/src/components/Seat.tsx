import React from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { color } from "../themes";
import { breakpoint } from "../themes/breakpoint";

type UserCircleProps = {
  useMobileSize?: boolean;
} & Pick<SeatProps, "isPlaceHolder">;

const UserCircle = styled.div<UserCircleProps>(
  ({ isPlaceHolder, useMobileSize = false }) => ({
    width: useMobileSize ? "3rem" : "3.5rem",
    height: useMobileSize ? "3rem" : "3.5rem",
    border: `solid 0.25rem ${color.darkBlue}`,
    borderRadius: "50%",
    backgroundColor: color.lightBlue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(isPlaceHolder && { visibility: "hidden" }),
  })
);

const NumberIcon = styled.span<Pick<UserCircleProps, "useMobileSize">>(
  ({ useMobileSize }) => ({
    fontSize: useMobileSize ? "1.6rem" : "2rem",
    fontWeight: "bold",
    color: color.darkBlue,
    marginTop: "0.9rem",
    fontFamily: "'Baloo Tammudu 2', cursive",
  })
);

const SeatSlot = styled.div<Pick<SeatProps, "namePos">>(({ namePos }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.3rem",
  flexDirection: namePos === "left" ? "row-reverse" : undefined,
}));

const NameTag = styled.span({
  color: color.beige,
  width: "6rem",
  margin: "0 0.5rem",
  overflowWrap: "break-word",
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
}: SeatProps) => {
  const { width } = useWindowSize();
  const useMobileSize = width! < breakpoint.medium;

  return (
    <SeatSlot namePos={namePos}>
      <UserCircle isPlaceHolder={isPlaceHolder} useMobileSize={useMobileSize}>
        <NumberIcon useMobileSize={useMobileSize}>{seatNumber}</NumberIcon>
      </UserCircle>
      {!useMobileSize && <NameTag>{name}</NameTag>}
    </SeatSlot>
  );
};

export default Seat;
