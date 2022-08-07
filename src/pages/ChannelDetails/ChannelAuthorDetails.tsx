import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { MessageService } from '@/logic/message-service';
import { UIButton } from '@/components/ui/button/UIButton';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentChannelSelector } from '@/store';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { TextField } from '@mui/material';


export const ChannelAuthorDetails: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)
    const [loading, setLoading] = useState(false);
    const [subscriptionLink, setSubscriptionLink] = useState('');

    const navigate = useNavigate()

    useEffect(() => { 
        if(!channel) return
    }, [channel])


    async function onStartChannel() {
        setLoading(true)
        const updatedChannel = await MessageService.startChannel(channel!, channel!.links.announcement, subscriptionLink) 
        
        setChannel(updatedChannel)
        navigate('/chat')
    }

    return (
        <>
            <UiBoxContainer title='Created Chat'>
                <SectionWrapperStyled>
                    <TextWrapperStyled> <strong>1. </strong>Invite {channel!.name} to this chat with this Join Link</TextWrapperStyled>
                    <UITextField label="Join Link:" value={channel!.links.announcement} isCopyable={true} />
                </SectionWrapperStyled>

                <SectionWrapperStyled>
                    <TextWrapperStyled><strong>2. </strong>Wait for {channel!.name} Subscription Link and paste it below</TextWrapperStyled>
                    <UITextFieldStyled label='Subscription Link' value={subscriptionLink} setValue={setSubscriptionLink} />
                </SectionWrapperStyled>

                <ButtonWrapperStyled>
                    <UIButton text="Start Chatting" disabled={!subscriptionLink} isLoading={loading} onClick={onStartChannel}/>    
                </ButtonWrapperStyled>
            </UiBoxContainer>
        </>
    )
}

const UITextFieldStyled = styled(UITextField)`
    width: 70%;
    margin-bottom: 20px;
`

const SectionWrapperStyled = styled.div`
    margin-bottom: 30px;
`

const TextWrapperStyled = styled.div`
    margin-bottom: 20px;
`

const ButtonWrapperStyled = styled.div`
    text-align: center;
`