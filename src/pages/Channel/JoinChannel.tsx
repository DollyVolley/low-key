import React, {FC, useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import { UIButton } from '@/components/ui/button/UIButton';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { useChatManager } from '@/hooks/useChatManager';
import { useAppContext } from '@/state/app';
import { UiPageWrapper } from '@/components/ui/page-wrapper/UiPageWrapper';

export const JoinChannel: FC = () => {
    const {joinChat} = useChatManager()

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
        try {
            const chatID = await joinChat(name, link)
            navigate(`/channel/id/${chatID}`)  
        } catch (error) {
            alert((error as any).message)
        } finally {
            setLoading(false)
        }
    }

    function isButtonDisabled() {
        return !name || !link
    }

    return (
    <UiPageWrapper> 
        <UiBoxContainer title={'Join existing Chat'}>

            <SectionWrapperStyled>
                <UITextField label={'Join Link'} value={link} setValue={setLink} />
                <TextWrapperStyled>
                    If you don't have a Join Link you can create a new chat and invite your chat partner <Link to={'/channel/create'}>here</Link>
                </TextWrapperStyled>
            </SectionWrapperStyled>
            
            <SectionWrapperStyled>
                <UITextField disabled={!link} label={'Name'} value={name} setValue={setName} />
            </SectionWrapperStyled>

            <ButtonWrapperStyled>
                <UIButton text="Join" isLoading={loading} onClick={onJoin} disabled={isButtonDisabled()} variant='outlined'/>
            </ButtonWrapperStyled>

        </UiBoxContainer>
    </UiPageWrapper>
    )
}

const TextWrapperStyled = styled.div`
    margin-top: 5px;
    font-size: 14px;
    color: #999;
`

const SectionWrapperStyled = styled.div`
    margin-bottom: 30px;
`

const ButtonWrapperStyled = styled.div`
    text-align: center;
`