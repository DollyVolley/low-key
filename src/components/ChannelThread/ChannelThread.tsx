import React, {FC, useEffect, useRef} from 'react'
import {MessageCard} from "@/components/ChannelThread/components/MessageCard";
import styled from "styled-components";
import {MessageInput} from "@/components/ChannelThread/components/MessageInput";
import { makeMessage } from '@/utils/channel';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useCurrentChat } from '@/hooks/useCurrentChat';
import { ChatMessage } from '@/types/chat';
import { useNavigate } from 'react-router-dom';
import { useChatDataContext } from '@/state/chat-data';


export const ChannelThread: FC = () => {
    const {messages, postMessage: sendMessage, markMessagesSeen ,id} = useCurrentChat()
    
    const navigate = useNavigate()
    const bottomRef = useRef<HTMLDivElement>(null);
    const {is1300PxOrLess} = useMediaQueries()


    useEffect(function onChannelChange() { 
        if(!id) {
            navigate('/')
        } else {
            markMessagesSeen()
        }
    },[id])
 
    async function onMessageSubmit(content: string) {
        const message = makeMessage(content, true)
        await sendMessage(message)
    }

    useEffect(function scrollToBottom() {
        bottomRef.current?.scrollIntoView({behavior: 'auto'});
      }, [messages]);

    return (
    <MessageThreadWrapper >
        <MessagesWrapper>
                {messages.map((message: ChatMessage) => {
                    return <MessageWrapper key={message.timestamp}>
                        <MessageCard message={message} isOwnMessage={message.isOwn} />
                    </MessageWrapper>
                })}
                <div ref={bottomRef} />
            </MessagesWrapper>

        <MessageInputStyled submitMessage={onMessageSubmit}/>
    </MessageThreadWrapper>
    )
}

const MessageThreadWrapper = styled.div`
    --max-width: 1300px;
    --input-height: 110px;
    --channel-header-height: 90px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const MessagesWrapper = styled.div`
    height: calc(100vh  - var(--input-height) - var(--channel-header-height));
    --max-width-padding: calc((100% - var(--max-width))/2);
    padding: 0 var(--max-width-padding);
    overflow-y: auto;
`
const MessageWrapper = styled.div`
    margin: 10px;
`
const MessageInputStyled = styled(MessageInput)`
    width: var(--max-width);
`