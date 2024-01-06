import React from "react";
import styled from "styled-components";

const StyledDimmer = styled.div`
  position: absolute;
  top: 0!important;
  left: 0!important;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.85);
  user-select: none;
  will-change: opacity;
  z-index: 1000;
`;

const Dimmer = ({ children }) => {
    return (
        <StyledDimmer>
            {children}
        </StyledDimmer>
    )
};

export default Dimmer;