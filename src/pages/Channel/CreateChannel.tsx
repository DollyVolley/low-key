import React, {FC, useState} from 'react';
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { UIButton } from '@/components/ui/button/UIButton';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useChatManager } from '@/hooks/useChatManager';
import { useMediaQueries } from '@/hooks';
import { useAppContext } from '@/state/app';


export const CreateChannel: FC = () => {
    const {createChat} = useChatManager()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const {isMobile} = useAppContext()



    async function onCreate() {
        if(name === '') return
        setLoading(true)
        const chatID = await createChat(name)
        navigate(`/channel/id/${chatID}`)   
    }

    return ( 
        <PageWrapperStyled className={isMobile? 'mobile' : ''}>
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

    &.mobile { 
        margin: 0 auto;
    }
`

const SectionWrapperStyled = styled.div`
margin-bottom: 30px;
`

const ButtonWrapperStyled = styled.div`
text-align: center;
`