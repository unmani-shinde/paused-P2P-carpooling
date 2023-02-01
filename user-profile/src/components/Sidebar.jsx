import React from "react";
import styled from "styled-components";
import { ImTwitch, ImBook } from "react-icons/im";
import { FaSteam } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import AvatarImage from "../assets/avatarImage.jpeg";
import Controller from "../assets/controller.png";
import Link from "./Link";

function Sidebar() {
  const defaultStyle = { fill: "url(#gradient)" };
  return (
    <SidebarContainer>
      <ProfileContainer>
      <i class="fa fa-user" aria-hidden="true"></i>
        <Name>John Doe</Name>
        <Title>Location</Title>
      </ProfileContainer>
      <LinksContainer>
        <Link title="Upcoming Rides">
          <ImTwitch style={defaultStyle} />
        </Link>
        <Link title="Travel History">
          <FaSteam style={defaultStyle} />
        </Link>
        <Link title="Notifications">
          <IoLogoGameControllerB style={defaultStyle} />
        </Link>
        <Link title="Support">
          <ImBook style={defaultStyle} />
        </Link>
      </LinksContainer>
      <ProBox>
        <ProText>Join pro for free games.</ProText>
        <Image src={Controller} />
      </ProBox>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 24vw;
  height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(14px);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* border-right: 1px solid #e7e7e7; */
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 25vh;
  padding: 3vh 0 1vh 0;
`;

const Avatar = styled.img`
  height: 7vh;
  border-radius: 5rem;
`;

const Name = styled.h1`
  color: black;
  font-size: 1.3rem;
  margin: 1rem 0 0.2rem 0;
`;

const Title = styled.h2`
  color: black;
  font-size: 1rem;
`;

const LinksContainer = styled.div`
  padding-left: 3vw;
  margin: 2vh 0;
  color: black;
`;

const ProBox = styled.div`
  background: #ee0979; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff6a00,
    #ee0979
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff6a00,
    #ee0979
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 10vh;
  border-radius: 1rem;
  padding: 1vw;
  margin: auto auto;
`;

const ProText = styled.span`
  color: #e7e7e7;
  font-weight: bolder;
`;

const Image = styled.img`
  height: 4rem;
  transform: rotate(-60deg);
`;

export default Sidebar;
