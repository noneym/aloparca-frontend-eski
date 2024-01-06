import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useOnClickOutside from '../hooks/useOnClickOutside';
import useWindowSize from '../hooks/useWindowSize';

const StyledDropdown = styled.div`
    position: relative;
    display: inline-block;
`;

const Trigger = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const TriggerArrowDown = styled.div`
    margin-left: 15px;
    border: 4px solid #666;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 2px;
    transform: rotate(-45deg) translateY(-2px);
`;

const OpenedItem = styled.div`
    position: absolute;
    top: 100%;
    right: ${({ onRight }) => onRight ? 0 : "auto"};
    left: ${({ onRight }) => onRight ? "auto" : 0};
    margin: 1em 0 0;
    background: white;
    text-align: left;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    z-index: 10;

    &:before {
        position: absolute;
        content: "";
        border: 4px solid #FFFFFF;
        border-top-color: transparent;
        border-right-color: transparent;
        top: -5px;
        right: ${({ onRight, autoCenter }) => onRight ? `${(autoCenter / 2) - 3}px` : "auto"};
        left: ${({ onRight, autoCenter }) => onRight ? "auto" : `${(autoCenter / 2) - 5}px`};
        border-radius: 2px;
        transform: rotate(135deg) translateY(-2px);
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.05);
    }
`;

const Dropdown = ({ trigger, arrow, children, onRight, autoClose }) => {
    const ref = useRef();
    const [isModalOpen, setModalOpen] = useState(false);
    useOnClickOutside(ref, () => setModalOpen(false));
    return (
        <StyledDropdown ref={ref}>
            <Trigger onClick={() => setModalOpen(!isModalOpen)}>
                <div>{trigger}</div>
                {arrow && (<TriggerArrowDown />)}
            </Trigger>
            {isModalOpen && (
                <OpenedItem onRight={onRight} autoCenter={ref.current.offsetWidth} onClick={() => autoClose ? setModalOpen(false) : {}}>
                    {children}
                </OpenedItem>
            )}
        </StyledDropdown>
    )
};

Dropdown.defaultProps = {
    arrow: false,
    onRight: false,
    autoClose: false
};

export default Dropdown;