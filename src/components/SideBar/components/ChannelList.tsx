import { ChannelDescription as ChannelDescriptor } from "@/types/channel";
import React,{FC} from "react";
import styled from "styled-components";
import List from '@mui/material/List';
import { useRecoilValue } from "recoil";
import { channelDescriptionsSelector } from "@/store/channelDescriptions/state/channelDescriptions";
import { ChannelCard } from "./ChannelCard";

export const ChannelList: FC = () => {
    const channelDescriptions = useRecoilValue(channelDescriptionsSelector)

    return (
    <ContactWrapper>
        <List>
            {channelDescriptions.length !== 0 && channelDescriptions.map((description: ChannelDescriptor) => {
             return <ChannelCard 
                        key={description.channelID} 
                        description={description} 
                        />
            })}
        </List>

    </ContactWrapper>
)}

const ContactWrapper = styled.div`
        display: flex;
        flex-direction: column;
        vertical-align: center;
    `