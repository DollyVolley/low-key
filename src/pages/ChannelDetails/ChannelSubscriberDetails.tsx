import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ClientType, MessageService } from '@/logic/message-service';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentChannelSelector } from '@/store';
import { UiBoxContainer } from '@/components/ui/container/UiBoxContainer';

export const ChannelSubscriberDetails: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)
    const [keyloadSyncInterval, setKeyloadSyncInterval] = useState<number>()
    const navigate = useNavigate()

    useEffect(()=> {
        return function onUnmount() {
            keyloadSyncInterval && window.clearInterval(keyloadSyncInterval!)
        }
    }, [keyloadSyncInterval])


    useEffect(() => { 
        if(!channel) return
        if(!channel.links.lastMessage && channel.clientType === ClientType.SUBSCRIBER) {
            checkIsChannelStarted()
            setKeyloadSyncInterval(window.setInterval(checkIsChannelStarted, 2000))
        } else {
            setKeyloadSyncInterval(0)
        }
    }, [channel])


    async function checkIsChannelStarted() {
        const updatedChannel = await MessageService.getKeyloadLink(channel!)

        if(channel?.channelID === updatedChannel.channelID && // channel has changed in the meantime
            updatedChannel.links.lastMessage) {
            setChannel(updatedChannel)
            navigate('/chat')   
        }
    }

    return (
        <>
            <UiBoxContainer title={'Requested to Join'}>
                <SectionWrapper>
                    <TextWrapperStyled>
                        <div>Send the Subscription Link below back to {channel?.name}</div>
                    </TextWrapperStyled>
                    <UITextField label="Subscription Link:" value={channel!.links.subscription} isCopyable={true} />

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
