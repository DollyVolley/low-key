import React, {FC, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useNavigate, useLocation } from 'react-router-dom';
import { useChatDataContext } from '@/state/chat-data';
import { useAppContext } from '@/state/app';

export const ManageChatHeader: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {currentChatData} = useChatDataContext()
    const {isMobile} = useAppContext()
    
    const [routeName, setRouteName] = useState('')


    useEffect(() => {
        let routeName = ''
        switch(location.pathname.split('/')[2]){
            case 'id': routeName = 'Manage Chat'; break;
            case 'create': routeName = 'Add Chat'; break;
            case 'join': routeName = 'Add Chat'; break;
        }
        setRouteName(routeName)

    }, [location])

    const canGoBack = useMemo(() => {
        return currentChatData?.isStarted && routeName !== 'Add Chat'
    }, [currentChatData, routeName])


    function onTitleClick(): void {
        if(currentChatData?.isStarted ) {
            navigate("/chat")
        }
    }

    return (
        <HeaderWrapperStyled>
            {canGoBack && <ArrowBackIosIcon onClick={onTitleClick} className='arrow-icon' /> }
            <TitleStyled className={isMobile? 'mobile' : ''}>{routeName}</TitleStyled>
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

    .arrow-icon { 
        margin-top: 25px;
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

    &.mobile {
        font-size: 1.5rem;
    }
`
