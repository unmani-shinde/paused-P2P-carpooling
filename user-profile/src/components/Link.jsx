import React from "react";
import styled from "styled-components";
function Link({ title, children }) {
  return (
    <LinkContainer>
      <Icon>
        <svg width="0" height="0">
          <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#E975A8" offset="0%" />
            <stop stopColor="#726CF8" offset="100%" />
          </linearGradient>
        
        </svg>
        {children}
      </Icon>
      <LinkText>{title}</LinkText>
    </LinkContainer>
  );
}

const LinkContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  color: black;

  font-weight: 500;
`;
const Icon = styled.div`
  svg {
    height: 2rem;
    width: 2rem;
  }
  cursor: pointer;
`;
const LinkText = styled.div`
  padding-left: 0.5rem;
  padding-top: 0.2rem;
  cursor: pointer;
`;

export default Link;
