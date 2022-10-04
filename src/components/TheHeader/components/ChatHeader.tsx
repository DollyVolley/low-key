import React, {FC} from 'react';
import styled from "styled-components";

import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate, useLocation } from 'react-router-dom';
import { useChatDataContext } from '@/state/chat-data';

export const ChatHeader: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const {currentChatData} = useChatDataContext()

    function onClick(): void {
        if(location.pathname.includes("chat")) {
            navigate(`/channel/id/${currentChatData!.id}`)
        }
    }

    return (
        <HeaderWrapperStyled>
            <TitleStyled>{currentChatData?.name}</TitleStyled>
            <SettingsIcon className='settings-icon' onClick={onClick}/>
        </HeaderWrapperStyled>
    )
}
const HeaderWrapperStyled = styled.div`
    --max-width: 1300px;
    display: flex;
    height: 80px;
    line-height: 80px;
    max-width: var(--max-width);
    --max-width-padding: calc((100% - var(--max-width))/2);
    padding: 0 var(--max-width-padding);

    .settings-icon {
        margin-top: 30px;
        margin-left: 10px;
        color: #bbb;
        cursor: pointer;

        &:hover {
            color: #000;
        }
    }
`

const TitleStyled = styled.div`
    margin-left: 10px;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
`