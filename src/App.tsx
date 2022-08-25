import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import {  StreamsService } from './logic/streams-service';
import { isStreamsLoadedAtom } from './store/app';
import { SwipeableDrawer } from '@mui/material';
import { showDrawerAtom } from './store/app/drawer/showDrawer';
import { useMessageService } from './hooks';

export const App: FC = () => {
    const setIsStreamsLoaded = useSetRecoilState(isStreamsLoadedAtom)
    const [showDrawer, setShowDrawer] = useRecoilState(showDrawerAtom)
    const {is1200PxOrLess} = useMediaQueries()

    const messageService = useMessageService()


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