import React, {FC} from 'react';
import styled from "styled-components";

import { Link, useNavigate } from 'react-router-dom';
import { ChannelList } from './components/ChannelList';
import { useAppContext } from '@/state/app';

const LogoImage = require('@/assets/images/logo.png');


export const SideBar: FC = () => {
    const {setIsMenuOpen} = useAppContext()
    const navigate = useNavigate()


    function navigateTo(path: string) {
        navigate(path)
        setIsMenuOpen(false)
    }

    return (
    <div>
        <LogoContainer onClick={() => navigateTo('/home')}>
            <LogoStyled src={LogoImage} alt="logo" />
        </LogoContainer>

        <NewContactMenuStyled>
            <MenuButtonStyled onClick={() => navigateTo('/channel/create')}>Create Chat</MenuButtonStyled> 
            <MenuButtonStyled onClick={() => navigateTo('/channel/join')}>Join Chat</MenuButtonStyled> 
        </NewContactMenuStyled>

        <ChannelList/>

    </div>
    )
}

const LogoContainer = styled.div`
    margin: 0 65px 0 ;
    padding: 10px; 
    cursor: pointer;
`

const LogoStyled = styled.img`
    width: 100px;
    height: 100px;
`

const NewContactMenuStyled = styled.div`
    text-align: center;
    padding: 20px 0;
`

const MenuButtonStyled = styled.div`
    color: #3a3a3e;
    text-decoration: none;
    font-size: 16pt;
    font-weight: bold;
    margin: 10px 0;
    display: block;
    cursor: pointer;
`

