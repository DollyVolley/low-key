import React, {FC, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { UIButton } from '@/components/ui/button/UIButton';
import { UIFormRow } from '@/components/ui/form';
import { MessageService } from '@/logic/message-service';
import { currentChannelSelector } from '@/store/channels/getters/currentChannel';

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
        <h1>Join Channel</h1>

        <FormWrapperStyled>
            <UIFormRow label={'Channel Name'} state={{value: name, setValue: setName}} />
            <UIFormRow label={'Join Link'} state={{value: link, setValue: setLink}} />

            <UIButton text="Join" isLoading={loading} onClick={onJoin} disabled={isButtonDisabled()}/>
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
    margin: 0 auto;
    text-align: center;
`
