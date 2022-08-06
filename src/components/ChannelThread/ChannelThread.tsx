import React, {FC, useEffect, useRef, useState} from 'react'
import {MessageCard} from "@/components/ChannelThread/components/MessageCard";
import styled from "styled-components";
import {ChatMessage} from "@/logic/message-service/types";
import {MessageInput} from "@/components/ChannelThread/components/MessageInput";
import { useNavigate } from 'react-router-dom';
import { MessageService } from '@/logic/message-service';
import { useMutex } from '@/hooks/utils/useMutex';
import { makeMessage } from '@/utils/channel';
import { currentChannelSelector } from '@/store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useInterval } from '@/hooks/utils/useInterval';
import { increaseSyncCountSelector, decreaseSyncCountSelector } from '@/store/app';
import { useMediaQueries } from '@/hooks/useMediaQueries';


export const ChannelThread: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)
    const increaseSyncCount = useSetRecoilState(increaseSyncCountSelector)
    const decreaseSyncCount = useSetRecoilState(decreaseSyncCountSelector)

    const navigate = useNavigate()

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const {getLock, releaseLock} = useMutex()
    
    const bottomRef = useRef<HTMLDivElement>(null);
    const {is1300PxOrLess} = useMediaQueries()


    useEffect(function onChannelChange() { 
        if(!channel) {
            navigate('/')
            return
        }
        setMessages(channel.messages)
        syncMessages()
    },[channel])
 
    useInterval(syncMessages, 5000)

    async function syncMessages() {
        if(!channel) return

        await getLock()
        increaseSyncCount()
        const updatedChannel = await MessageService.fetchMessages(channel)
        decreaseSyncCount()

        if(channel.channelID === updatedChannel.channelID && 
            updatedChannel.messages.length > channel.messages.length) {
                setChannel(updatedChannel)
        }
        releaseLock()
    }

    async function onMessageSubmit(content: string) {
        const message = makeMessage(content, true)
        const updatedMessages = [...messages, message]
        setMessages(updatedMessages)

        await getLock()
        
        const updatedChannel = await MessageService.sendMessage(channel!, message)
        setChannel(updatedChannel)
        releaseLock()
    }

    useEffect(function scrollToBottom() {
        bottomRef.current?.scrollIntoView({behavior: 'auto'});
      }, [messages]);

    return (
    <MessageThreadWrapper >
        {!!channel && <>
            <MessagesWrapper className={is1300PxOrLess? 'md': ''}>
                {messages.map((message: ChatMessage) => {
                    return <MessageWrapper key={message.timestamp}>
                        <MessageCard message={message} isOwnMessage={message.isOwn} />
                    </MessageWrapper>
                })}
                <div ref={bottomRef} />
            </MessagesWrapper>

            <MessageInputStyled submitMessage={onMessageSubmit}/>
            </>
        }
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

    &.md {
        padding: 0 10px;
    }
`
const MessageWrapper = styled.div`
    margin: 10px 0;
`
const MessageInputStyled = styled(MessageInput)`
    width: var(--max-width);
`