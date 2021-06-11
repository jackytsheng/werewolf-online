import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { color, border } from "../themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWolfPackBattalion } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import useQuery from "../hooks/urlQuery";

const Layout = styled.div({
  background: color.lightColor,
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: "100vw",
  height: "100vh",
});

const Panel = styled.div({
  maxWidth: "31.25rem",
  margin: "5rem auto",
});

const JoinHeader = styled.header({
  textAlign: "center",
  padding: "1.25rem",
  background: color.darkColorA,
  borderTopLeftRadius: border.ContainerRadius,
  borderTopRightRadius: border.ContainerRadius,
});

const JoinTitleText = styled.h1({
  color: color.white,
});

const FormContainer = styled.form({
  height: "15rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const JoinMain = styled.main({
  padding: "1.875rem 2.5rem",
  background: color.white,
  borderBottomLeftRadius: border.ContainerRadius,
  borderBottomRightRadius: border.ContainerRadius,
});

const IconText = styled.span({
  margin: "0 0.4rem",
});

const LobbyHome = ({}: any) => {
  const [name, setName] = useState("");
  const roomId = useQuery("room");

  useEffect(() => {
    console.log(`Room is set to be ${roomId}`);
  }, [roomId]);

  const onEnterName = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const { value } = event.target;
    setName(value.trim());
  };

  return (
    <Layout>
      <Panel>
        <JoinHeader>
          <JoinTitleText>
            <FontAwesomeIcon icon={faWolfPackBattalion} />
            <IconText>Werewolf Lobby</IconText>
          </JoinTitleText>
        </JoinHeader>
        <JoinMain>
          <FormContainer
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl fullWidth={true} variant="outlined" margin="normal">
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="Name"
                placeholder="Enter Your Name"
                onChange={onEnterName}
              />
            </FormControl>
            <Button
              component={Link}
              to={
                roomId
                  ? `/lobby?room=${roomId}&username=${encodeURI(name)}`
                  : `/lobby?username=${name}`
              }
              fullWidth={true}
              variant="outlined"
              disabled={!name}
            >
              <FontAwesomeIcon icon={faPlay} />
              <IconText>{roomId ? "Join" : "Play"} </IconText>
            </Button>
            <Button
              component={Link}
              to="/dealer"
              fullWidth={true}
              variant="outlined"
            >
              Dealer
            </Button>
          </FormContainer>
        </JoinMain>
      </Panel>
    </Layout>
  );
};

export default LobbyHome;
