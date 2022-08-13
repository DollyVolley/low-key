import React, {FC, useEffect, useRef} from 'react'
import {MessageCard} from "@/components/ChannelThread/components/MessageCard";
import styled from "styled-components";
import {MessageInput} from "@/components/ChannelThread/components/MessageInput";
import { makeMessage } from '@/utils/channel';
import { currentChatIDAtom } from '@/store/chat';
import { useRecoilValue } from 'recoil';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/types/chat';
import { useNavigate } from 'react-router-dom';


export const ChannelThread: FC = () => {
    const channelID = useRecoilValue(currentChatIDAtom)
    const {messages, postMessage: sendMessage} = useChat(channelID)
    
    const navigate = useNavigate()
    const bottomRef = useRef<HTMLDivElement>(null);
    const {is1300PxOrLess} = useMediaQueries()


    useEffect(function onChannelChange() { 
        if(!channelID) navigate('/')
    },[channelID])
 
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
    --channel-header-height: 80px;
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