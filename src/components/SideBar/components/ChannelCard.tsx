import React,{FC, useState} from "react";
import styled from "styled-components";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import { abbreviateText } from "@/utils/app/abbreviateText";
import { getFormattedDateTime } from "@/utils/app/getFormattedTime";
import { ChatDescription } from "@/types/chat";
import CircleIcon from '@mui/icons-material/Circle';
import { MOCK_CURRENT_CHAT_ID } from "@/mock/constants";

export const ChannelCard: FC<{description: ChatDescription}> = ({description}) => {
    // @todo: global current chat id should be used here
    const [currentChannelID, setCurrentChannelID] = useState(MOCK_CURRENT_CHAT_ID)
    const navigate = useNavigate()  


    function selectContact() {
        setCurrentChannelID(description.chatID)
        selectChannelView()
    }

    function selectChannelView(): void {
        if(description.started) {
            navigate('/chat')
        } else {
            navigate(`/channel/id/${description!.chatID}`)
        }
    }

    function getSecondaryText(): string{
        const lastChangeTime = getFormattedDateTime(description.lastChange)

        let messagePreview = ''
        if(!description.started || !description.lastMessage) {
            messagePreview = 'Created Channel'
        } else {
            messagePreview = abbreviateText(description.lastMessage.content, 17)
        }

        return `${messagePreview} - ${lastChangeTime}`
    }

    return (
            <ListItemStyled 
            disablePadding onClick={selectContact}
            className={`${description.chatID === currentChannelID ? "active" : ""}`}>
                <ListItemButton>
                    <ListItemText 
                        primary={<>
                        <span> {description.name}
                        {description.isNewMessage? 
                            <CircleIconStyled 
                                sx={{
                                    fontSize: "10pt"
                                }}
                                htmlColor="grey"
                            />
                            :''} 
                        </span>
                        </>} 
                        secondary={getSecondaryText()}/>
                </ListItemButton>
            </ListItemStyled>
             )
}

const CircleIconStyled = styled(CircleIcon)`
    margin-left: 5px;    
`

const ListItemStyled = styled(ListItem)`
    background-color: rgba(229, 229, 229, 0.8);
    color: black;

    &.active { 
        background-color: rgba(87, 87, 87, 0.8);
        color: white;
    }
`
