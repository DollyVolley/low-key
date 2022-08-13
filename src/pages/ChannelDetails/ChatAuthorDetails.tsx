import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import { UIButton } from '@/components/ui/button/UIButton';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useRecoilValue } from 'recoil';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { useChatManager } from '@/hooks/useChatManager';
import { useChat } from '@/hooks/useChat';
import { currentChatIDAtom } from '@/store/chat';


export const ChatAuthorDetails: FC = () => {
    const currentChatID = useRecoilValue(currentChatIDAtom)
    const {name, links} = useChat(currentChatID)
    const {startChat} = useChatManager()

    const {subLink} = useParams()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false);
    const [subscriptionLink, setSubscriptionLink] = useState('');


    useEffect(() => { 
        if(!subLink) return
        setSubscriptionLink(subLink)
    }, [])


    async function onStartChannel() {
        setLoading(true)
        try {
            await startChat(subscriptionLink)
            navigate('/chat')
        } catch (error) {
            alert((error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <UiBoxContainer title='Created Chat'>
                <SectionWrapperStyled>
                    <TextWrapperStyled> <strong>1. </strong>Invite {name} to this chat with this Join Link</TextWrapperStyled>
                    <UITextField label="Join Link:" value={links.announcement} isCopyable={true} />
                </SectionWrapperStyled>

                <SectionWrapperStyled>
                    <TextWrapperStyled><strong>2. </strong>Wait for {name} Subscription Link and paste it below</TextWrapperStyled>
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