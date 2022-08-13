import React, {FC, useState} from 'react';
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { UIButton } from '@/components/ui/button/UIButton';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { TextField } from '@mui/material';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useChatManager } from '@/hooks/useContact';


export const CreateChannel: FC = () => {
    const {createChat} = useChatManager()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);


    async function onCreate() {
        if(name === '') return
        setLoading(true)
        const chatID = await createChat(name)
        navigate(`/channel/id/${chatID}`)   
    }

    return ( 
        <PageWrapperStyled>
            <UiBoxContainer title='Create new Chat'>
                <SectionWrapperStyled>
                    <UITextField label="Name" value={name} setValue={setName} />
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