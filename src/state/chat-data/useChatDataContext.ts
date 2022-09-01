import { useContext } from "react";
import { ChatDataContext } from "./ChatDataContext";

export function useChatDataContext() {
    const mockData = useContext(ChatDataContext);
    return mockData;
  }
  
  