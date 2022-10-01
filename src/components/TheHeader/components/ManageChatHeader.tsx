import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";

import { useNavigate, useLocation } from 'react-router-dom';
import { useChatDataContext } from '@/state/chat-data';

export const ManageChatHeader: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {currentChatData} = useChatDataContext()
    
    const [routeName, setRouteName] = useState('')


    useEffect(() => {
        let routeName = ''
        switch(location.pathname.split('/')[2]){
            case 'id': routeName = 'Manage Chat'; break;
        }
        setRouteName(routeName)

    }, [location])


    function onTitleClick(): void {
        if(currentChatData?.isStarted) {
            navigate("/chat")
        }
    }

    return (
        <HeaderWrapperStyled>
            <TitleStyled onClick={onTitleClick}>{routeName}</TitleStyled>
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
