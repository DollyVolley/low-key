import React, { FormEvent } from "react";
import { FC } from "react";
import styled from "styled-components";
import { FormStateType } from "./types";
import TextField from '@mui/material/TextField';


interface UIFormRowProps {
    label: string,
    state: FormStateType<string>
}

export const UIFormRow: FC<UIFormRowProps> = (props) => {

    function updateValue(event: FormEvent) {
        props.state.setValue((event.target as HTMLInputElement).value)
    }

    return (
        <WrapperStyled> 
            <TextFieldStyled 
                id="standard-basic" 
                label={props.label} 
                variant="standard" 
                value={props.state.value} 
                onInput={updateValue}
            />
        </WrapperStyled>
    )
}

const WrapperStyled = styled.div`
    margin: 10px auto;
    height: 100%;
    vertical-align: center;
`

const TextFieldStyled = styled(TextField)`
    width: 70%;
`