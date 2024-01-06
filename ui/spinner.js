import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
    display: ${({ centered }) => centered ? "flex" : "inline-flex"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin-left: ${({ marginLeft }) => marginLeft}px;
`;

const Loader = styled.div`
    position: relative;
    background: transparent;
    height: ${({ size }) => 
        size === "tiny" ? 16 :
        size === "small" ? 24 :
        size === "medium" && 32
    }px;
    width: ${({ size }) => 
        size === "tiny" ? 16 :
        size === "small" ? 24 :
        size === "medium" && 32
    }px;
    margin: 0;
    left: 0;
    top: 0;
    -webkit-transform: none;
    transform: none;
    display: inline-block;
    ${({ centered }) => centered && `
        display: block;
        margin-left: auto;
        margin-right: auto;
    `};

    &:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: .2rem solid rgba(0,0,0,.1);
    }

    &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-animation: loader .6s infinite linear;
        animation: loader .6s infinite linear;
        border-top: .2em solid #3a3a3a;
        border-left: .2em solid transparent;
        border-bottom: .2em solid transparent;
        border-right: .2em solid transparent;
        border-radius: 50%;
    }
`;

const Content = styled.div`
    margin-top: 10px;
`;

const Spinner = ({ content, size, centered, marginLeft }) => {
    return (
        <StyledSpinner centered={centered} marginLeft={marginLeft}>
            <Loader size={size} centered={centered}/>
            {content !== "" && (
                <Content>{content}</Content>
            )}
        </StyledSpinner>
    )
};

Spinner.defaultProps = {
    content: "",
    size: "medium",
    centered: false,
    marginLeft: 0
};

export default Spinner;