import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ActiveClient, ClientType } from '@/logic/streams-service';
import { ChannelSubscriberDetails } from './ChatSubscriberDetails';
import { ChatAuthorDetails } from './ChatAuthorDetails';
import { Button } from '@mui/material';
import { ChatData } from '@/types/chat';
import { MOCK_CHAT } from '@/mock/constants';

export const ChatDetails: FC = () => {
    //@todo: global chat should be used here
    const [chat, setChat] = useState(MOCK_CHAT)
    const [isLoading, setIsLoading] = useState(true)
    const [hasStarted, setHasStarted] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(!chat.client) return
        setHasStarted(!!chat?.client.links.lastMessage)
        setHasStarted(false)

    }, [chat])

    function goBack() {
        if(!hasStarted) return
        navigate('/chat')
    }

    function onRemoveChannel() {
        setChat({...chat, client: (null as unknown as ActiveClient), data: (null as unknown as ChatData)})
        navigate('/')
    }

    return (<PageWrapper> 
        
        <FormWrapperStyled>
        {isLoading && <>
            <ChannelNameStyled>{chat.data?.name}</ChannelNameStyled>

            <ChannelActorWrapper>
                {!chat.client?.links.lastMessage && <>
                    {chat.client?.clientType === ClientType.AUTHOR && <ChatAuthorDetails/>}
                    {chat.client?.clientType === ClientType.SUBSCRIBER && <ChannelSubscriberDetails/>}
                </>}
            </ChannelActorWrapper>

            <Button  color="error" onClick={onRemoveChannel}>Remove Chat</Button>
        </>
        }

        </FormWrapperStyled>
    </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const FormWrapperStyled = styled.div`
    width: 100%;
    margin: 5vh auto;
    text-align: center;
`

const IconStyled = styled(ArrowBackIosNewIcon)`
    margin-right: 10px;
    cursor: pointer;
`

const ChannelNameStyled = styled.h1`
    font-size: 4em;
`

const ChannelActorWrapper = styled.div`
    margin-bottom: 100px;
`


