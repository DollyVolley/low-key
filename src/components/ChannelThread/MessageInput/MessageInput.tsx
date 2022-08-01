import React, {FC, FormEvent, useState} from "react";
import styled from "styled-components";

export interface MessageInputProps {
    submitMessage: (text: string) => void
}

export const MessageInput: FC<MessageInputProps> = ({submitMessage}) => {
    const [text, setText] = useState("")

    function updateText(event: FormEvent) {
        setText((event.target as HTMLTextAreaElement).value)
    }

    function onSubmitClick() {
        if(text === "") return
        submitMessage(text)
        setText("")
    }

    return <MessageInputWrapper>
            <InputStyled value={text} onInput={updateText} />
            <ButtonStyled onClick={onSubmitClick}>Send</ButtonStyled>
        </MessageInputWrapper>
}

const MessageInputWrapper = styled.div`
    --button-width: 75px;
    display: flex;
    width: 100%;
    height: 75px;
`

const InputStyled = styled.textarea`
    width: calc(100% - var(--button-width));
    padding: 0 10px;
`

const ButtonStyled = styled.button`
    width: var(--button-width);
`
