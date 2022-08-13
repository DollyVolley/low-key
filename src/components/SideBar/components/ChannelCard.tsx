import React,{FC} from "react";
import styled from "styled-components";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { abbreviateText } from "@/utils/app/abbreviateText";
import { getFormattedDateTime } from "@/utils/app/getFormattedTime";
import { currentChatIDAtom } from "@/store/chat";
import { ChatDescription } from "@/types/chat";


export const ChannelCard: FC<{description: ChatDescription}> = ({description}) => {
    const [currentChannelID, setCurrentChannelID] = useRecoilState(currentChatIDAtom);
    const navigate = useNavigate()  


    function selectContact() {
        setCurrentChannelID(description.chatID)
        selectChannelView()
    }

    function selectChannelView(): void {
        console.log(description)
        if(description.started) {
            navigate('/chat')
        } else {
            navigate(`/channel/id/${description!.chatID}`)
        }
    }

    function getSecondaryText(): string {
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
                        primary={description.name} 
                        secondary={getSecondaryText()}/>
                </ListItemButton>
            </ListItemStyled>
             )
}

const ListItemStyled = styled(ListItem)`
    background-color: rgba(229, 229, 229, 0.8);
    color: black;

    &.active { 
        background-color: rgba(87, 87, 87, 0.8);
        color: white;
    }
`
