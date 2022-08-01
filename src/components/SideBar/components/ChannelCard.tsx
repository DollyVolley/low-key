import { ChannelDescription as ChannelDescriptor } from "@/types/channel";
import React,{FC} from "react";
import styled from "styled-components";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilState } from "recoil";
import { currentChannelIDAtom } from "@/store/channels/state/currentChannelID";
import { useNavigate } from "react-router-dom";


export const ChannelCard: FC<{description: ChannelDescriptor}> = ({description}) => {
    const [currentChannelID, setCurrentChannelID] = useRecoilState(currentChannelIDAtom);
    const navigate = useNavigate()  


    function selectContact() {
        setCurrentChannelID(description.channelID)
        selectChannelView()
    }

    function selectChannelView(): void {
        if(description.started) {
            navigate('/chat')
        } else {
            navigate(`/channel/id/${description!.channelID}`)
        }
    }

    function getSecondaryText(): string {
        const lastChangeTime = new Date(description.lastChange).toLocaleTimeString()
        if(!description.started) return `Created channel ${lastChangeTime}`
        return `${description.lastMessage?.content} - ${lastChangeTime}`
    }

    return (
            <ListItemStyled 
            disablePadding onClick={selectContact}
            className={`${description.channelID === currentChannelID ? "active" : ""}`}>
                <ListItemButton>
                    <ListItemText 
                        primary={description.name} 
                        secondary={getSecondaryText()}/>
                </ListItemButton>
            </ListItemStyled>
             )
}

const ListItemStyled = styled(ListItem)`
    background-color: rgba(154, 154, 154, 0.8);

    &.active { 
        background-color: rgba(113, 113, 113, 0.8);
    }
`

