import React,{FC} from "react";
import styled from "styled-components";
import List from '@mui/material/List';
import { useRecoilValue } from "recoil";
import { ChannelCard } from "./ChannelCard";
import { chatDescriptionsSelector } from "@/store/chat";
import { ChatDescription } from "@/types/chat";

export const ChannelList: FC = () => {
    const chatDescriptions = useRecoilValue(chatDescriptionsSelector)

    return (
    <ContactWrapper>
        <List>
            {chatDescriptions.length !== 0 && chatDescriptions.map((description: ChatDescription) => {
             return <ChannelCard 
                        key={description.chatID} 
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