import React,{FC} from "react";
import styled from "styled-components";
import List from '@mui/material/List';
import { ChannelCard } from "./ChannelCard";
import { ChatDescription } from "@/types/chat";
import { MOCK_CHAT_DESCRIPTIONS } from "@/mock/constants";

export const ChannelList: FC = () => {
    const chatDescriptions = MOCK_CHAT_DESCRIPTIONS

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