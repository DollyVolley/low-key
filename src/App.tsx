import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import { SwipeableDrawer } from '@mui/material';
import { useMessageSyncService } from './hooks';
import { useAppContext } from './state/app';

export const App: FC = () => {
    const {isMenuOpen, setIsMenuOpen} = useAppContext()
    const {is1200PxOrLess} = useMediaQueries()

    const syncDaemon = useMessageSyncService()


    useEffect(function manageDrawerVisibility() {
        setIsMenuOpen(!is1200PxOrLess)
    }, [is1200PxOrLess])

    return (
    <ApplicationWrapperStyled>
        <Router >
            <SwipeableDrawer
                anchor={'left'}
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpen={() => setIsMenuOpen(true)}
                variant={is1200PxOrLess ? 'temporary' : 'permanent'}
            >
                <SideBar/>
            </SwipeableDrawer>
            <RouteWrapperStyled className={is1200PxOrLess? '' : 'persistentDrawer'}>
                <AppRoutes />
            </RouteWrapperStyled>
        </Router>
    </ApplicationWrapperStyled>
    )
}

const ApplicationWrapperStyled = styled.div` 
    font-family: 'Roboto', sans-serif;
    `
const RouteWrapperStyled = styled.div`
    &.persistentDrawer {
        margin-left: 200px;
    }
`