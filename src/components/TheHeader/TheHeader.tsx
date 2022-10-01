import React, {FC} from 'react';
import styled from "styled-components";

import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Menu } from '@mui/icons-material';
import { useAppContext } from '@/state/app';

interface HeaderProps {
    children?: React.ReactNode;
}

export const TheHeader: FC<HeaderProps> = (props) => {

    const {setIsMenuOpen, isMenuOpen} = useAppContext()

    const {is1200PxOrLess} = useMediaQueries()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div>
            <HeaderWrapperStyled>
                {is1200PxOrLess && <MenuItemStyled onClick={toggleMenu} sx={{fontSize: 30}} />}
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

