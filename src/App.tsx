import React, {FC, useEffect} from 'react';
import {useMediaQueries} from "@/hooks/useMediaQueries";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AppRoutes } from '@/routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { SideBar } from '@/components/SideBar/SideBar';
import styled from 'styled-components';
import { accountAtom } from './store/account/state/account';
import { loadStreams } from './logic/message-service/MessageService';
import { isStreamsLoadedAtom } from './store/app';

export const App: FC = () => {
    const setIsStreamsLoaded = useSetRecoilState(isStreamsLoadedAtom)

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
            <div id='outer-container'>

                <SideBar/>
                <div id='page-wrap'>
                    <AppRoutes />
                </div>
            </div>
        </Router>
    </ApplicationWrapperStyled>
    )
}

const ApplicationWrapperStyled = styled.div` 
    font-family: 'Roboto', sans-serif;
    `



