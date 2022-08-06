import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import { loadStreams } from './logic/message-service/MessageService';
import { isStreamsLoadedAtom } from './store/app';
import { SwipeableDrawer } from '@mui/material';
import { showDrawerAtom } from './store/app/drawer/showDrawer';

export const App: FC = () => {
    const setIsStreamsLoaded = useSetRecoilState(isStreamsLoadedAtom)
    const [showDrawer, setShowDrawer] = useRecoilState(showDrawerAtom)

    useEffect(()=> {
        preFetchAsyncImport()
    }, [])

    // Loads the asyncronously imported stream library used in the message service immediately
    async function preFetchAsyncImport() {
        await loadStreams()
        setIsStreamsLoaded(true)
    }

    const {is515PxOrLess} = useMediaQueries()

    return (
    <ApplicationWrapperStyled>
        <Router >
            <SwipeableDrawer
                anchor={'left'}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                onOpen={() => setShowDrawer(true)}
                variant={is515PxOrLess ? 'temporary' : 'persistent'}
            >
                <SideBar/>
            </SwipeableDrawer>
            <AppRoutes />
        </Router>
    </ApplicationWrapperStyled>
    )
}

const ApplicationWrapperStyled = styled.div` 
    font-family: 'Roboto', sans-serif;
    `