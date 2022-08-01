import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ClientType, MessageService } from '@/logic/message-service';
import { useDidMountEffect } from '@/hooks/utils/didMountEffect';
import { UIFormRow } from '@/components/ui/form';
import { UIButton } from '@/components/ui/button/UIButton';
import { UITextField } from '@/components/ui/text-field/UITextField';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentChannelSelector } from '@/store';

export const ChannelDetails: FC = () => {
    const [channel, setChannel] = useRecoilState(currentChannelSelector)

    const [keyloadSyncInterval, setKeyloadSyncInterval] = useState<number>()
    const [hasChannelStarted, setHasChannelStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscriptionLink, setSubscriptionLink] = useState('');

    const navigate = useNavigate()

    useEffect(()=> {
        return function onUnmount() {
            keyloadSyncInterval && window.clearInterval(keyloadSyncInterval!)
        }
    }, [keyloadSyncInterval])


    useEffect(() => { 
        if(!channel) return
        const hasStarted = !!channel.links.lastMessage
        setHasChannelStarted(hasStarted)
        if(!hasStarted && channel.clientType === ClientType.SUBSCRIBER) {
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

    async function onStartChannel() {
        setLoading(true)
        const updatedChannel = await MessageService.startChannel(channel!, channel!.links.announcement, subscriptionLink) 
        
        setChannel(updatedChannel)
        navigate('/chat')
    }

    function onRemoveChannel() {
        setChannel(null)
        navigate('/')
    }

    return (<PageWrapper> 
        <h1>Manage Channel</h1>
        {channel && <>
            <h2>Name: {channel.name}</h2>

            <UITextField label="Join Link:" text={channel.links.announcement} isCopyable={true} />

            {channel.links.subscription && 
                <UITextField label="Subscription Links:" text={channel.links.subscription} isCopyable={true} />
            }

            {channel.clientType === ClientType.AUTHOR && !hasChannelStarted &&     
                <FormWrapperStyled>
                    <UIFormRow label='Subscription Link' state={{value: subscriptionLink, setValue: setSubscriptionLink}} />
                    <UIButton text="Start Channel" isLoading={loading} onClick={onStartChannel}/>
                </FormWrapperStyled>               

            }

            <DangerZone>
                <UIButton text="Remove Channel" onClick={onRemoveChannel}/>
            </DangerZone>   
        </>
        }

  
        
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

const DangerZone = styled(FormWrapperStyled)`
    margin-top: 50vh;
`
