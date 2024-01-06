import React, { useState, useRef } from "react";
import styled from "styled-components";
import useOnClickOutside from '../hooks/useOnClickOutside';

const StyledSelect = styled.div`
    min-width: 200px;
    width: ${({ width, fullWidth }) => fullWidth ? "100%" : `${width}px`};
    position: relative;
    ${({ disabled }) => !disabled && "cursor: pointer"};
`;

const SelectInput = styled.div`
    border-radius: 5px;
    width: 100%;
    height: 40px;
    border: 1px solid ${({ open }) => open ? "rgba(34,36,38,.30)" : "rgba(34,36,38,.15)"};
    color: rgba(0,0,0,.87);
    background: ${({ disabled }) => disabled ? "rgba(255, 255, 255, 0.5)" : "#fff"};
    white-space: normal;
    transition: all .3s;
    transform: rotateZ(0);
    padding: 0 30px 0 15px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom-left-radius: ${({ open }) => open && 0};
    border-bottom-right-radius: ${({ open }) => open && 0};
    border-bottom: ${({ open }) => open && "none"};

    ${({ disabled, open }) => !disabled && `
        &:hover {
            border: 1px solid rgba(34,36,38,.30);
            border-bottom: ${open && "none"};
        }
    `}
`;

const HiddenInput = styled.input``;

const TextPlaceholder = styled.p`
    color: rgba(191,191,191,.87);
    margin: 0;
`;

const TextInput = styled.p`
    color: rgba(0,0,0,.87);
    margin: 0;
`;

const ArrowIcon = styled.div`
    position: absolute;
    right: 15px;
    z-index: 3;
    margin-left: 15px;
    border: 4px solid #666;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 2px;
    transform: rotate(-45deg);
`;

const StyledOption = styled.ul`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid ${({ open }) => open ? "rgba(34,36,38,.30)" : "rgba(34,36,38,.15)"};
    border-top: ${({ open }) => open && "none"};
    display: ${({ open }) => open ? "block" : "none"};
    max-height: 320px;
    overflow-y: auto;
    z-index: 100;

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ff8900;
        border-radius: 2px;
    }
`;

const Option = styled.li`
    height: 40px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    color: rgba(0,0,0,.7);
    font-weight: ${({ active }) => active && "700"};
    background: ${({ active }) => active && "rgba(0,0,0,.09)"};

    &:hover {
        background: ${({ active }) => active ? "rgba(0,0,0,.09)" : "rgba(0,0,0,.03)"};
        color: rgba(0,0,0,.95);
        font-weight: ${({ active }) => active && "700"};
    }
`;

const Select = ({
    options,
    selected,
    setSelected,
    fullWidth,
    width,
    placeholder,
    id,
    name,
    onChange,
    disabled
}) => {
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    const handleChangeOnValue = value => {
        setSelected(value);
        setIsOpen(false);
    };

    return (
        <StyledSelect ref={ref} fullWidth={fullWidth} width={width} disabled={disabled}>
            <SelectInput disabled={disabled} open={isOpen} onClick={() => {!disabled && setIsOpen(!isOpen)}}>
                <HiddenInput hidden id={id} name={name} value={selected} onClick={onChange} />
                {selected === "" ? (
                    <TextPlaceholder>{placeholder}</TextPlaceholder>
                ) : (
                    <TextInput>{selected}</TextInput>
                )}
                <ArrowIcon />
            </SelectInput>
            <StyledOption open={isOpen}>
                {options.map(item => (
                    <Option
                        key={item.key}
                        onClick={() => handleChangeOnValue(item.value)}
                        active={selected === item.value}
                        >
                        {item.text}
                    </Option>
                ))}
            </StyledOption>
        </StyledSelect>
    )
};

Select.defaultProps = {
    options: [],
    width: 200,
    fullWidth: false,
    placeholder: "",
    selected: "",
    name: "",
    disabled: false
};

export default Select;