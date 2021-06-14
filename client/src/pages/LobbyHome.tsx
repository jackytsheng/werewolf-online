import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { color, border } from "../themes";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  withStyles,
} from "@material-ui/core";
import useQuery from "../hooks/urlQuery";
import { Credit, Title, Text, IconText } from "../components";

const Layout = styled.div({
  background: color.lightBlue,
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const Panel = styled.div({
  maxWidth: "31.25rem",
  margin: "5rem auto",
});

const JoinHeader = styled.header({
  textAlign: "center",
  padding: "1.25rem",
  background: color.framingBrown,
  borderTopLeftRadius: border.ContainerRadius,
  borderTopRightRadius: border.ContainerRadius,
});

const FormContainer = styled.form({
  height: "15rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const JoinMain = styled.main({
  padding: "1.875rem 2.5rem",
  background: color.beige,
  borderBottomLeftRadius: border.ContainerRadius,
  borderBottomRightRadius: border.ContainerRadius,
});

const StyleInputLabel = withStyles({
  root: {
    "&.Mui-focused": {
      color: color.framingBrown,
    },
  },
})(InputLabel);

const StyleOutlinedInput = withStyles({
  root: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: color.framingBrown,
    },
  },
  input: {
    color: color.text,
  },
})(OutlinedInput);

const LobbyHome = ({}: any) => {
  const [name, setName] = useState("");
  const roomId = useQuery("room");
  const NAME_LIMIT = 20;

  useEffect(() => {
    console.log(`Room is set to be ${roomId}`);
  }, [roomId]);

  const onEnterName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // max 20 character
    setName(value.slice(0, NAME_LIMIT).trim());
  };

  return (
    <Layout>
      <Panel>
        <JoinHeader>
          <Title text="Werewolf Home" />
        </JoinHeader>
        <JoinMain>
          <FormContainer
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl fullWidth={true} variant="outlined" margin="normal">
              <StyleInputLabel htmlFor="component-outlined">
                Name
              </StyleInputLabel>
              <StyleOutlinedInput
                id="component-outlined"
                label="Name"
                placeholder={`Less than ${NAME_LIMIT} characters`}
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
              <FontAwesomeIcon
                icon={faPlay}
                color={name ? color.text : undefined}
              />
              <IconText disabled={!name}>{roomId ? "Join" : "Play"}</IconText>
            </Button>
            <Button
              component={Link}
              to="/dealer"
              fullWidth={true}
              variant="outlined"
            >
              <Text>Dealer</Text>
            </Button>
          </FormContainer>
        </JoinMain>
      </Panel>
      <Credit />
    </Layout>
  );
};

export default LobbyHome;
