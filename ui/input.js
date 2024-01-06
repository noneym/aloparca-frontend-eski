import React from "react";
import styled from "styled-components";
import MaskedInput from 'react-text-mask';

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputForm = styled.input`
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: #525355;
    border-radius: 0;
    padding: 10px 15px;
    border: 1px solid #dddddd;
    outline: none;
`;

const InputFormMasked = styled(MaskedInput)`
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: #525355;
    border-radius: 0;
    padding: 10px 15px;
    border: 1px solid #dddddd;
    outline: none;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: black;
    margin-left: 10px;
    margin-bottom: 5px;
`;

const Input = ({
    text,
    required,
    ref,
    defaultValue,
    value,
    onChange,
    name
}) => {
    return (
        <StyledInput>
            <Label>{text}</Label>
            <InputForm
                required={required}
                defaultValue={defaultValue}
                value={value}
                ref={ref}
                onChange={onChange}
                name={name}
            />
        </StyledInput>
    )
};

Input.defaultProps = {
    text: "",
    required: false
};

const MaskInput = ({
    text,
    required,
    ref,
    mask,
    defaultValue,
    value,
    onChange,
    guide,
    placeholder
}) => {
    return (
        <StyledInput>
            <Label>{text}</Label>
            <InputFormMasked
                guide={guide}
                mask={mask}
                required={required}
                defaultValue={defaultValue}
                value={value}
                ref={ref}
                onChange={onChange}
                type="text"
                name="mask_input"
                placeholder={placeholder}
            />
        </StyledInput>
    )
};

MaskInput.defaultProps = {
    text: "",
    required: false,
    guide: false,
    mask: ""
};

export { Input, MaskInput };