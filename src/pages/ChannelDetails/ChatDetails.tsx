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
import { useAppContext } from '@/state/app';
import { UiPageWrapper } from '@/components/ui/page-wrapper/UiPageWrapper';

export const ChatDetails: FC = () => {
    const {name, isStarted, clientType, isClientLoaded, id } = useCurrentChat()
    const {client} = useChatClientContext(id)
    const {removeChat} = useChatManager()
    const {isMobile} = useAppContext()
    const navigate = useNavigate()

    function onRemoveChannel() {
        removeChat(id)
        navigate('/')
    }

    return (
    <UiPageWrapper> 
        <span>        
        {isClientLoaded && <>
            <ChannelNameStyled className={isMobile? 'mobile' : ''}>{name}</ChannelNameStyled>

            <ButtonStyled  color="error" onClick={onRemoveChannel}>Remove Chat</ButtonStyled>

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
        </>
        }
        </span>
    </UiPageWrapper>
    )
}

const SectionWrapperStyled = styled.div`
    margin-bottom: 30px;
`


const UITextFieldStyled = styled(UITextField)`
    width: 10%;
    margin-bottom: 20px;
`

const ChannelNameStyled = styled.h1`
    font-size: 4em;

    &.mobile {
        font-size: 2em;
    }
`

const ChannelActorWrapper = styled.div`
    margin-bottom: 100px;
`

const ButtonStyled = styled(Button)`
    margin-bottom: 20px;
    `

