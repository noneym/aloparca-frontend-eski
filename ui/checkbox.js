import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
`;

const Confirm = styled.div`
    background: ${({ check, dark }) => dark ? "#fff" : check ? "#ff8900" : "#fff"};
    border: 1px solid ${({ dark, check }) => dark ? "#fff" : check ? "#ff8900" : "#dddddd"};
    height: 20px;
    width: 20px;
    border-radius: 3px;
    margin-right: 7px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        display: ${({ check }) => check ? "block" : "none"};
        top: 45%;
        left: 50%;
        width: 12px;
        height: 8px;
        border: 3px solid ${({ dark }) => dark ? "#ff8900" : "#fff"};
        border-left: none;
        border-bottom: none;
        transform: translate(-50%, -50%) rotate(135deg);
    }
`;

const Text = styled.p`
    margin: 0;
    color: ${({ dark }) => dark ? "#fff" : "#000"};
    font-size: 14px;
`;

const Checkbox = ({ text, checked, setChecked, dark }) => {
    return (
        <StyledCheckbox onClick={() => setChecked(!checked)}>
            <Confirm check={checked} dark={dark} />
            <Text dark={dark}>{text}</Text>
        </StyledCheckbox>
    )
};

Checkbox.defaultProps = {
    checked: false,
    dark: false
};

export default Checkbox;