import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import {  StreamsService } from './logic/streams-service';
import { SwipeableDrawer } from '@mui/material';
import { testStreamsToTheBonez } from './streams-test';

export const App: FC = () => {
    // @todo get from global (app) state
    const setIsStreamsLoaded = (x: boolean)=>{}
    const [showDrawer, setShowDrawer] = [false,(x: boolean)=>{}]
    const {is1200PxOrLess} = useMediaQueries()

    useEffect(()=> {
        preFetchAsyncImport()
    }, [])

    useEffect(function manageDrawerVisibility() {
        setShowDrawer(!is1200PxOrLess)

    }, [is1200PxOrLess])

    // Loads the asyncronously imported stream library used in the message service immediately
    async function preFetchAsyncImport() {
        await StreamsService.loadStreams()
        setIsStreamsLoaded(true)

        testStreamsToTheBonez()
    }


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