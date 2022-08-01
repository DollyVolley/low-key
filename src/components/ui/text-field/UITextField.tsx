import React, { FormEvent } from "react";
import { FC } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { UIButton } from "../button/UIButton";


interface UITextFieldProps {
    text: string,
    label?: string, 
    isCopyable?: boolean,
}

export const UITextField: FC<UITextFieldProps> = (props) => {
    const [isCopied, setIsCopied] = React.useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(props.text);
        setIsCopied(true);
    }

    function getButtonText(): string {
        return isCopied ? "Copied" :  "Copy";
    }

    return (
        <WrapperStyled> 
            <TextFieldStyled value={props.text} label={props.label} variant="filled"/>

            {!!props.isCopyable && <>
                <UIButton 
                    variant="outlined" 
                    text={getButtonText()} 
                    onClick={copyToClipboard} 
                    disabled={isCopied}
                    />
            </>}

        </WrapperStyled>
    )
}

const WrapperStyled = styled.div`
    height: 100%;
`

const TextFieldStyled = styled(TextField)`
    width: 90%;
`
