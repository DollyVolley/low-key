import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAppContext() {
    const context = useContext(AppContext);
    return context
}
  