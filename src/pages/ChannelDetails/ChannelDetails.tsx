import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { currentChannelSelector } from '@/store';
import { ClientType } from '@/logic/message-service';
import { UIButton } from '@/components/ui/button/UIButton';
import { ChannelSubscriberDetails } from './ChannelSubscriberDetails';
import { ChannelAuthorDetails } from './ChannelAuthorDetails';
import { Button } from '@mui/material';

export const ChannelDetails: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)
    const [hasStarted, setHasStarted] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setHasStarted(!!channel?.links.lastMessage)
    }, [channel])

    function goBack() {
        if(!hasStarted) return
        navigate('/chat')
    }

    function onRemoveChannel() {
        setChannel(null)
        navigate('/')
    }

    return (<PageWrapper> 
        
        <FormWrapperStyled>
        {channel && <>
            <ChannelNameStyled>{channel.name}</ChannelNameStyled>

            <ChannelActorWrapper>
                {!channel.links.lastMessage && <>
                    {channel.clientType === ClientType.AUTHOR && <ChannelAuthorDetails/>}
                    {channel.clientType === ClientType.SUBSCRIBER && <ChannelSubscriberDetails/>}
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


