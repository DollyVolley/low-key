import React, { FC } from 'react';
import {App} from "./App";
import {createRoot} from "react-dom/client";

import 'typeface-roboto'
import { ChatDataContextProvider } from './state/chat-data';
import { ChatClientProvider } from './state/chat-client';
import { AppProvider } from './state/app/AppProvider';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root')
const root = createRoot(container!)

const RootComponent: FC = () => {
    return (
        <AppProvider>
            <ChatDataContextProvider>
                <ChatClientProvider>
                    <App/>
                </ChatClientProvider>
            </ChatDataContextProvider>
        </AppProvider>
    )
}

root.render(<RootComponent/>)

serviceWorker.register()
