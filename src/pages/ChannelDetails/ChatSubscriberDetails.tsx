import React, {FC} from 'react';
import styled from "styled-components";
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useRecoilValue } from 'recoil';
import { currentChatIDAtom } from '@/store/chat';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';
import { useChat } from '@/hooks/useChat';

export const ChannelSubscriberDetails: FC = () => {
    const currentChannelID = useRecoilValue(currentChatIDAtom);
    const {name, links} = useChat(currentChannelID!)

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
