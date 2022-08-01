import React, {FC, useState} from 'react';
import styled from "styled-components";

import { MessageService } from '@/logic/message-service';
import { useNavigate } from 'react-router-dom';
import { UIFormRow } from '@/components/ui/form';
import { UIButton } from '@/components/ui/button/UIButton';
import { useSetRecoilState } from 'recoil';
import { currentChannelSelector } from '@/store';


export const CreateChannel: FC = () => {
    const setChannel = useSetRecoilState(currentChannelSelector)
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);


    async function onCreate() {
        if(name === '') return
        setLoading(true)
        const channel = await MessageService.createChannel(name)
    
        setChannel(channel)
        navigate(`/channel/id/${channel.channelID}`)   
    }

    return (<PageWrapperStyled> 
        <h1>Create Channel</h1>

        <FormWrapperStyled>
            <UIFormRow label={'Channel Name'} state={{value: name, setValue: setName}} />
            <UIButton text="Create" isLoading={loading} onClick={onCreate} />
        </FormWrapperStyled>

    </PageWrapperStyled>
    )
}

const PageWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
`

const FormWrapperStyled = styled.div`
    width: 70%;
    margin: 0 auto;
    text-align: center;
`

const InputWrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const LabelStyled = styled.label`
    width: 25%;
`

const InputStyled = styled.input`
    width: 70%;
`

const ButtonStyled = styled.button`
    margin-top: 20px;
`