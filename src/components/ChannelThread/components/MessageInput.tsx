import { TextFieldsOutlined } from "@mui/icons-material";
import { Button, Input, TextField } from "@mui/material";
import React, {FC, FormEvent, useState} from "react";
import styled from "styled-components";


export interface MessageInputProps {
    submitMessage: (text: string) => void
}

export const MessageInput: FC<MessageInputProps> = ({submitMessage}) => {
    const [text, setText] = useState("")

    function updateText(event: FormEvent) {    
        const value = (event.target as HTMLTextAreaElement).value
        if(value[value.length - 1] === "\n") {
            onSubmit()
        } else {
            setText(value)
        }
    }

    function onSubmit() {
        if(text === "") return
        submitMessage(text)
        setText("")
    }

    return <MessageInputWrapper>
                <GroupContainerStyled>
                    <InputStyled 
                        value={text} 
                        onInput={updateText}
                        placeholder="Type a message..."
                        multiline={true}
                        minRows={2}/>
                    <ButtonStyled onClick={onSubmit}>Send</ButtonStyled>
                </GroupContainerStyled>

        </MessageInputWrapper>
}

const MessageInputWrapper = styled.div`
    --button-width: 75px;
    --max-height: 80px;
    height: var(--max-height);
    box-shadow: 0 -10px 10px 1px rgba(0,0,0,0.1);
`
const GroupContainerStyled = styled.div`
    display: flex;
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: calc((var(--input-height) - var(--max-height)) / 2) 0;
`
const InputStyled = styled(TextField)`
    width: calc(100% - var(--button-width));
    padding: 5px 20px;
    max-height: var(--max-height) !important;
    resize: vertical;
    overflow: auto;
`

const ButtonStyled = styled(Button)`
    width: var(--button-width);
    height: var(--max-height);
`
