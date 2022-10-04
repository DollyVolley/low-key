import React, { FormEvent } from "react";
import { FC } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { UiCopyButton } from "../button/UiCopyButton";
import { PropaneSharp } from "@mui/icons-material";

interface UITextFieldProps {
    disabled?: boolean,
    value: string,
    label?: string, 
    isCopyable?: boolean,
    width?: string,
    setValue?: (value: string) => void
}

export const UITextField: FC<UITextFieldProps> = (props) => {
    const disabled = !props.setValue || props.disabled

    function updateValue(event: FormEvent) {
        if(disabled) return
        props.setValue!((event.target as HTMLInputElement).value)
    }

    return (
        <TextFieldStyled 
        value={props.value} 
        label={props.label}
        disabled={disabled}
        sx={{
            width: props.width || '100%',
        }}
        InputProps={{
            endAdornment: props.isCopyable ? <UiCopyButton text={props.value}/> : undefined,
        }}
        onChange={updateValue}
        />
    )
}

const TextFieldStyled = styled(TextField)`
    color: black;
    `