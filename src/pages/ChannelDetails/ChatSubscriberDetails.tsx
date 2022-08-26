import React, {FC} from 'react';
import styled from "styled-components";
import { UITextField } from '@/components/ui/text-field/UITextField';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { useChat } from '@/hooks/useChat';
import { MOCK_CURRENT_CHAT_ID } from '@/mock/constants';

export const ChannelSubscriberDetails: FC = () => {
    const {name, links} = useChat(MOCK_CURRENT_CHAT_ID!)

    return (
        <>
            <UiBoxContainer title={'Requested to Join'}>
                <SectionWrapper>
                    <TextWrapperStyled>
                        <div>Send the Subscription Link below back to {name}</div>
                    </TextWrapperStyled>
                    <UITextField label="Subscription Link:" value={links.subscription} isCopyable={true} />

                </SectionWrapper>
            </UiBoxContainer>
        </>
    )
}

const SectionWrapper = styled.div`
    margin-bottom: 30px;
`

const TextWrapperStyled = styled.div`
    margin-bottom: 20px;
`
