import { useContext } from "react";
import { ChatClientContext } from "./ChatClientContext";

export function useChatClientContext() {
    const mockData = useContext(ChatClientContext);
    return mockData;
}
  