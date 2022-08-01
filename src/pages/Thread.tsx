import React, {FC, useEffect, useState} from 'react'
import {MessageCard} from "@/components/ChannelThread/MessageCard/MessageCard";
import styled from "styled-components";
import {ChatMessage} from "@/logic/message-service/types";
import {MessageInput} from "@/components/ChannelThread/MessageInput/MessageInput";
import { useNavigate } from 'react-router-dom';
import { MessageService } from '@/logic/message-service';
import { useMutex } from '@/hooks/utils/useMutex';
import { makeMessage } from '@/utils/channel';
import { currentChannelSelector } from '@/store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useInterval } from '@/hooks/utils/useInterval';
import { increaseSyncCountSelector, decreaseSyncCountSelector } from '@/store/app';


export const MessageThread: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)
    const increaseSyncCount = useSetRecoilState(increaseSyncCountSelector)
    const decreaseSyncCount = useSetRecoilState(decreaseSyncCountSelector)

    const navigate = useNavigate()

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const {getLock, releaseLock} = useMutex()

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

        if(channel.channelID === updatedChannel.channelID && // channel has changed in the meantime
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

    function onChannelNameClick() {
        navigate(`/channel/id/${channel!.channelID}`)
    }

    return (
    <MessageThreadWrapper >
        {!!channel && <>
            <MessagesWrapper>
                {messages.map((message: ChatMessage) => {
                    return <MessageWrapper key={message.timestamp}>
                        <MessageCard message={message} isOwnMessage={message.isOwn} />
                    </MessageWrapper>
                })}
            </MessagesWrapper>

            <MessageInput submitMessage={onMessageSubmit}/>
            </>
        }
    </MessageThreadWrapper>
    )
}

const MessageThreadWrapper = styled.div`
    --input-height: 100px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`

const MessagesWrapper = styled.div`
    height: calc(100vh  - var(--input-height) - 60px);
    overflow-y: auto;
`

const ContactLabel = styled.h1`
    margin: 28px auto;
    color: grey;
    cursor: pointer;
`

const MessageWrapper = styled.div`
    margin: 10px 0;
`
