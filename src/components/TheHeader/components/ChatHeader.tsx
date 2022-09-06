import React, {FC} from 'react';
import styled from "styled-components";

import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_CHAT_DESCRIPTIONS } from '@/mock/constants';

export const ChatHeader: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    // @ todo: current chat description id should be used here
    const description = MOCK_CHAT_DESCRIPTIONS[0]

    function onTitleClick(): void {
        if(location.pathname.includes("chat")) {
            navigate(`/channel/id/${description!.chatID}`)
        } else {
            navigate("/chat")
        }
    }

    return (
        <HeaderWrapperStyled>
            <TitleStyled onClick={onTitleClick}>{description?.name}</TitleStyled>
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
`

const TitleStyled = styled.div`
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;

`
