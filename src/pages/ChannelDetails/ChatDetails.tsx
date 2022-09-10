import React, {FC} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ClientType } from '@/logic/streams-service';
import { ChannelSubscriberDetails } from './ChatSubscriberDetails';
import { ChatAuthorDetails } from './ChatAuthorDetails';
import { Button } from '@mui/material';
import { useCurrentChat } from '@/hooks';

export const ChatDetails: FC = () => {
    const {name, isStarted, clientType, isClientLoaded } = useCurrentChat()
    const navigate = useNavigate()


    function goBack() {
        if(!isStarted) return
        navigate('/chat')
    }

    function onRemoveChannel() {
        console.log('lol')
        navigate('/')
    }

    return (<PageWrapper> 
        
        <FormWrapperStyled>
        {isClientLoaded && <>
            <ChannelNameStyled>{name}</ChannelNameStyled>

            <ChannelActorWrapper>
                {clientType === ClientType.AUTHOR && <ChatAuthorDetails/>}
                {clientType === ClientType.SUBSCRIBER && <ChannelSubscriberDetails/>}
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


