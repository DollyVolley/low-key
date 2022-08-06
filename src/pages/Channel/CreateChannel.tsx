import React, {FC, FormEvent, useState} from 'react';
import styled from "styled-components";

import { MessageService } from '@/logic/message-service';
import { useNavigate } from 'react-router-dom';
import { UIButton } from '@/components/ui/button/UIButton';
import { useSetRecoilState } from 'recoil';
import { currentChannelSelector } from '@/store';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { TextField } from '@mui/material';
import { UITextField } from '@/components/ui/text-field/UITextField';


export const CreateChannel: FC = () => {
    const setChannel = useSetRecoilState(currentChannelSelector)
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    function updateName(event: FormEvent): void {
        const value = (event.target as HTMLTextAreaElement).value
        if(value[value.length - 1] === "\n") {
            onCreate()
        } else {
            setName(value)
        }
    }


    async function onCreate() {
        if(name === '') return
        setLoading(true)
        const channel = await MessageService.createChannel(name)
    
        setChannel(channel)
        navigate(`/channel/id/${channel.channelID}`)   
    }

    return ( 
        <PageWrapperStyled>
            <UiBoxContainer title='Create a new Chat'>
                <SectionWrapperStyled>
                    <UITextField label="Chat Name" value={name} setValue={setName} />
                </SectionWrapperStyled>

                <ButtonWrapperStyled> 
                    <UIButton text="Create" isLoading={loading} onClick={onCreate} />
                </ButtonWrapperStyled>
            </UiBoxContainer>
        </PageWrapperStyled>
    )
}

const PageWrapperStyled = styled.div`
    width: 100%;
    margin: 5vh auto;
    text-align: center;
`

const SectionWrapperStyled = styled.div`
margin-bottom: 30px;
`

const ButtonWrapperStyled = styled.div`
text-align: center;
`