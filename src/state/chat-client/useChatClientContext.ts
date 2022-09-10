import { useContext, useMemo } from "react";
import { ChatClientContext } from "./ChatClientContext";

export function useChatClientContext(chatID?: string) {
    const {clientMap, setClient, isReady} = useContext(ChatClientContext);

    const client = useMemo(() => {
        console.log(clientMap)
        if(chatID) return clientMap[chatID]
    }, [clientMap, chatID])

    return {client, clientMap, setClient, isReady};
}
  