import React, { FC } from 'react';
import {App} from "./App";
import {createRoot} from "react-dom/client";

import 'typeface-roboto'
import { ChatDataContextProvider } from './state/chat-data';
import { ChatClientProvider } from './state/chat-client';

const container = document.getElementById('root')
const root = createRoot(container!)

const RootComponent: FC = () => {
    return (
        <ChatDataContextProvider>
            <ChatClientProvider>
                <App/>
            </ChatClientProvider>
        </ChatDataContextProvider>
    )
}

root.render(<RootComponent/>)
