import React, {FC} from 'react';
import styled from "styled-components";

import { Link } from 'react-router-dom';
import { ChannelList } from './components/ChannelList';

const LogoImage = require('@/assets/images/logo.png');


export const SideBar: FC = () => {
    return (
    <div>
        <LogoContainer to="/home">
            <LogoStyled src={LogoImage} alt="logo" />
        </LogoContainer>

        <NewContactMenuStyled>
            <MenuButtonStyled to="/channel/create">Create Chat</MenuButtonStyled> 
            <MenuButtonStyled to="/channel/join">Join Chat</MenuButtonStyled> 
        </NewContactMenuStyled>

        <ChannelList/>

    </div>
    )
}

const LogoContainer = styled(Link)`
    margin: 0 65px 0 ;
    padding: 10px; 

`

const LogoStyled = styled.img`
    width: 100px;
    height: 100px;
`

const NewContactMenuStyled = styled.div`
    text-align: center;
    padding: 20px 0;
`

const MenuButtonStyled = styled(Link)`
    color: #3a3a3e;
    text-decoration: none;
    font-size: 16pt;
    font-weight: bold;
    margin: 10px 0;
    display: block;
`

