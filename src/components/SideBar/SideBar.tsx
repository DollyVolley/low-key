import React, {FC, useEffect} from 'react';
import styled from "styled-components";

import '@/styling/burger.css'
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import { ChannelList } from './components/ChannelList';
import { UIButton } from '../ui/button/UIButton';


export const SideBar: FC = () => {
    return (
    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <Link to="/home">
            <Logo>low key</Logo>
        </Link>
        <Link to="/channel/create"><UIButton text='Create Channel' variant='text' onClick={()=>{}} /></Link>
        <Link to="/channel/join"><UIButton text='Join Channel' variant='text' onClick={()=>{}} /></Link>
        <hr/>

        <ChannelList/>

    </Menu>
    )
}

const Logo = styled.h2`
    color: white;
    margin-top: 0;
`

