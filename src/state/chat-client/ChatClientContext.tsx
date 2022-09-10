import { ActiveClient } from '@/logic/streams-service';
import React, { createContext } from 'react';
import { ChatClientOption } from './types';

export const ChatClientContext = createContext<ChatClientOption>({
    clientMap: {} as Record<string, ActiveClient>,
    setClient: (client: ActiveClient) => ({} as Promise<void>),
    isReady: false,
});

