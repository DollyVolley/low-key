import React,{FC} from 'react'
import styled from 'styled-components'

import DoneIcon from '@mui/icons-material/Done';

import {ChatMessage} from "@/logic/message-service/types";
import {getFormattedDateTime} from "@/utils/app/getFormattedTime";
import { getExplorerURL } from '@/utils/message/getExplorerURL';
import { CircularProgress, Paper } from '@mui/material';

type MessageCardProps = {
    message: ChatMessage,
    isOwnMessage: boolean
}

export const MessageCard: FC<MessageCardProps> = ({message, isOwnMessage}) => {

    function onClick(): void {
        window.open(getExplorerURL(message.msgId || ''), '_blank')
    }
    return <>
        <CardWrapper isOwnMessage={isOwnMessage}>
            <MessageContainer 
                className={`${!message.msgId && "pending"} ${isOwnMessage && "own"}`}
                onClick={onClick}
                elevation={message.msgId? 3: 10}>
                <MessageContent>{message.content}</MessageContent>
                <FooterStyled>
                    <span>{getFormattedDateTime(message.timestamp)}</span>
                    {message.msgId?
                        <DoneIcon sx={{ fontSize: 10 }} />
                    :
                        <CircularProgress size={10}/>
                    }
                </FooterStyled>
            </MessageContainer>
        </CardWrapper>
        </>
}

const CardWrapper = styled.div<{isOwnMessage: boolean}>`
    width: 100%;
    display: flex;
    justify-content: ${props => props.isOwnMessage? `right;`: `left;`}
`

const MessageContainer = styled(Paper)`
    padding: 10px;
    background: rgba(210, 210, 210, 0.8);
    border-radius: 4px;
    width: fit-content;
    min-width: 90px;
    max-width: 70%;

    &.own {
        background: rgba(203, 206, 212, 0.8);
    }
    
    &:hover {
        background: rgba(210, 210, 210, 1);
        cursor: pointer;
    }
`

const MessageContent = styled.span`
    word-break: break-word;
    text-overflow: ellipsis;
    `

const FooterStyled = styled.div` 
    display: flex;
    justify-content: space-between;
    padding-top: 3px;
    font-size: 10px;
    color: #4a4a4a;
    
    `