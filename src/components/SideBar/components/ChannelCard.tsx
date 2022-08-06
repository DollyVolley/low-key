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
import { abbreviateText } from "@/utils/app/abbreviateText";
import { getFormattedDateTime } from "@/utils/app/getFormattedTime";


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
    background-color: rgba(164, 164, 167, 0.8);
    color: black;

    &.active { 
        background-color: rgba(87, 87, 87, 0.8);
        color: white;
    }
`
