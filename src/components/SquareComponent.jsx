import React from 'react';
import styled from 'styled-components';

const Square = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.color};
  margin: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

const SquareComponent = ({ color, hoverColor }) => {
  return <Square color={color} hoverColor={hoverColor} />;
};

export default SquareComponent;