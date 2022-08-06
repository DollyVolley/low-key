import { currentChannelDescriptionSelector } from '@/store/channelDescriptions';
import React, {FC, useEffect} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from "styled-components";

import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Menu } from '@mui/icons-material';
import { showDrawerAtom } from '@/store/app/drawer/showDrawer';

export const ChannelHeader: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const description = useRecoilValue(currentChannelDescriptionSelector)
    const [showDrawer, setShowDrawer] = useRecoilState(showDrawerAtom)


    function onTitleClick(): void {
        if(location.pathname.includes("chat")) {
            navigate(`/channel/id/${description!.channelID}`)
        } else {
            navigate("/chat")
        }
    }

    

    return (
        <HeaderWrapperStyled>
            <MenuItemStyled onClick={() => setShowDrawer(!showDrawer)}/>
            <TitleStyled onClick={onTitleClick}>{description?.name}</TitleStyled>
        </HeaderWrapperStyled>
    )
}
const HeaderWrapperStyled = styled.div`
    display: flex;
    height: 80px;
    max-width: 1300px;
    margin: 0 auto;
`

const TitleStyled = styled.div`
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
`
const MenuItemStyled = styled(Menu)`
    cursor: pointer;
    margin: 6px 24px 0 10px;
    font-size: 3rem;

`