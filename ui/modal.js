import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
    position: fixed;
    display: ${({ open }) => open ? "block" : "none"};
    background-color: rgba(0, 0, 0, 0.85);
    line-height: 1;
    z-index: 1000;
    top: 0px !important;
    left: 0px !important;
    right: 0px !important;
    bottom: 0px !important;
    height: 100%;
    width: 100%;
    padding: 1em;
    transition: background-color 0.5s linear 0s;
`;

const Modal = ({ open, children }) => {
    return (
        <StyledModal open={open}>
            {children}
        </StyledModal>
    )
};

Modal.defaultProps = {
    open: false
};

export default Modal;