import React from "react";
import styled from "styled-components";
import Game from "./Game";
import { FiSearch } from "react-icons/fi";
import Assassin from "../assets/assassins.jpg";
import Spiderman from "../assets/spiderman.jpg";
import Batman from "../assets/batman.jpeg";

function MainContent() {
  return (
    <MainContentContainer>
      <MainTitle>Active Ride</MainTitle>
      <GamesContainer>
        <Game/>

      </GamesContainer>
    </MainContentContainer>
  );
}
const MainContentContainer = styled.div`
  margin: 5rem 5rem 0 5rem;
  color: #aa0537;
  
`;

const MainTitle = styled.h1`
color: black;
`;

const InputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 10rem;
    top: 1.5rem;
  }
`;

const Input = styled.input`
  border-radius: 2rem;
  border: none;
  width: 15rem;
  padding: 0.6rem 1rem;
  margin: 1rem 0 0 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 0.9rem;
  color: #bd063d;
  &::placeholder {
    color: #bd063d;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

const GamesContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default MainContent;
