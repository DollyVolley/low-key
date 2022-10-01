import React, {FC} from 'react';
import styled from "styled-components";

import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Menu } from '@mui/icons-material';

interface HeaderProps {
    children?: React.ReactNode;
}

export const TheHeader: FC<HeaderProps> = (props) => {
    //@todo replace with global state
    const setShowDrawer = (x: boolean)=>{}
    const showDrawer = false
    
    const {is1200PxOrLess} = useMediaQueries()

    return (
        <div>
            <HeaderWrapperStyled>
                {is1200PxOrLess && <MenuItemStyled onClick={() => setShowDrawer(!showDrawer)} sx={{fontSize: 30}} />}
                {props.children}
            </HeaderWrapperStyled>
        </div>

    )
}

const HeaderWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    height: 80px;
    line-height: 80px;
    border-bottom: 2px solid #f0f0f0;
`

const MenuItemStyled = styled(Menu)`
    cursor: pointer;
    margin: 24px 24px 0 24px;

`

