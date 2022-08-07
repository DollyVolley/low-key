import React, {FC} from 'react';
import { useRecoilState } from 'recoil';
import styled from "styled-components";

import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Menu } from '@mui/icons-material';
import { showDrawerAtom } from '@/store/app/drawer/showDrawer';

interface HeaderProps {
    children?: React.ReactNode;
}

export const TheHeader: FC<HeaderProps> = (props) => {
    const [showDrawer, setShowDrawer] = useRecoilState(showDrawerAtom)
    const {is1200PxOrLess} = useMediaQueries()

    return (
        <HeaderWrapperStyled>
            {is1200PxOrLess && <MenuItemStyled onClick={() => setShowDrawer(!showDrawer)} sx={{fontSize: 30}} />}
            {props.children}
        </HeaderWrapperStyled>
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

