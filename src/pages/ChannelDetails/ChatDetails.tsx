import React, {FC} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ClientType } from '@/logic/streams-service';
import { ChannelSubscriberDetails } from './ChatSubscriberDetails';
import { ChatAuthorDetails } from './ChatAuthorDetails';
import { Button } from '@mui/material';
import { useCurrentChat } from '@/hooks';
import { useChatManager } from '@/hooks/useChatManager';
import { useChatClientContext } from '@/state/chat-client';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';

export const ChatDetails: FC = () => {
    const {name, isStarted, clientType, isClientLoaded, id } = useCurrentChat()
    const {client} = useChatClientContext(id)
    const {removeChat} = useChatManager()
    
    const navigate = useNavigate()


    function goBack() {
        if(!isStarted) return
        navigate('/chat')
    }

    function onRemoveChannel() {
        removeChat(id)
        navigate('/')
    }

    return (<PageWrapper> 
        
        <FormWrapperStyled>
        {isClientLoaded && <>
            <ChannelNameStyled>{name}</ChannelNameStyled>

            {isStarted?
                <UiBoxContainer title='Details'>
                    <SectionWrapperStyled>
                        <UITextFieldStyled label="Index" value={String(client?.index) || ''} />

                    </SectionWrapperStyled>

                    <SectionWrapperStyled>
                        <UITextFieldStyled label="Last Message" value={client?.links.lastMessage || ''} />
                    </SectionWrapperStyled>

                </UiBoxContainer>
            :
                <ChannelActorWrapper>
                    {clientType === ClientType.AUTHOR && <ChatAuthorDetails/>}
                    {clientType === ClientType.SUBSCRIBER && <ChannelSubscriberDetails/>}
                </ChannelActorWrapper>
            } 

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

const SectionWrapperStyled = styled.div`
    margin-bottom: 30px;
`

const FormWrapperStyled = styled.div`
    width: 100%;
    margin: 5vh auto;
    text-align: center;
`

const UITextFieldStyled = styled(UITextField)`
    width: 10%;
    margin-bottom: 20px;
`

const ChannelNameStyled = styled.h1`
    font-size: 4em;
`

const ChannelActorWrapper = styled.div`
    margin-bottom: 100px;
`


