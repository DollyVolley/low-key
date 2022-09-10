import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import { SwipeableDrawer } from '@mui/material';

export const App: FC = () => {
    // @todo get from global (app) state
    const [showDrawer, setShowDrawer] = [false,(x: boolean)=>{}]
    const {is1200PxOrLess} = useMediaQueries()


    useEffect(function manageDrawerVisibility() {
        setShowDrawer(!is1200PxOrLess)

    }, [is1200PxOrLess])

    return (
    <ApplicationWrapperStyled>
        <Router >
            <SwipeableDrawer
                anchor={'left'}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                onOpen={() => setShowDrawer(true)}
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
        margin-left: 250px;
    }
`