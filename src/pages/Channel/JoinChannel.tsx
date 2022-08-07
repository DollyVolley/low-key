import React, {FC, useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { UIButton } from '@/components/ui/button/UIButton';
import { MessageService } from '@/logic/message-service';
import { currentChannelSelector } from '@/store/channels/getters/currentChannel';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';

export const JoinChannel: FC = () => {
    const setChannel = useSetRecoilState(currentChannelSelector)
    const navigate = useNavigate()
    const {annLink} = useParams()

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => { 
        if(!annLink) return
        setLink(annLink)
    }, [])


    async function onJoin() {
        if(link === '') return
        setLoading(true)
        const channel = await MessageService.joinChannel(name, link)
    
        setChannel(channel)
        navigate(`/channel/id/${channel.channelID}`)   
    }

    function isButtonDisabled() {
        return !name || !link
    }

    return (
    <PageWrapper> 
        <UiBoxContainer title={'Join existing Chat'}>
            
            <SectionWrapperStyled>
                <UITextField label={'Name'} value={name} setValue={setName} />
            </SectionWrapperStyled>

            <SectionWrapperStyled>
                <TextWrapperStyled>
                    If you don't have a Join Link you can create a new chat and invite your chat partner <Link to={'/channel/create'}>here</Link>
                </TextWrapperStyled>
                <UITextField label={'Join Link'} value={link} setValue={setLink} />
            </SectionWrapperStyled>

            <ButtonWrapperStyled>
                <UIButton text="Join" isLoading={loading} onClick={onJoin} disabled={isButtonDisabled()}/>
            </ButtonWrapperStyled>

        </UiBoxContainer>
    </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
`

const TextWrapperStyled = styled.div`
    margin-bottom: 20px;
`

const SectionWrapperStyled = styled.div`
    margin-bottom: 30px;
`

const ButtonWrapperStyled = styled.div`
    text-align: center;
`