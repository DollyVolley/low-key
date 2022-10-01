import { useContext, useMemo } from "react";
import { ChatClientContext } from "./ChatClientContext";

export function useChatClientContext(chatID?: string) {
    const {clientMap, setClient, isReady, removeClient} = useContext(ChatClientContext);

    const client = useMemo(() => {
        if(chatID) return clientMap[chatID]
    }, [clientMap, chatID])

    return {client, clientMap, setClient, isReady, removeClient};
}
  