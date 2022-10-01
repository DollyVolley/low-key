import { createContext } from "react";
import { AppOption } from "./types";

export const AppContext = createContext<AppOption>({
    setIsMenuOpen: () => {},
    isMenuOpen: false
});

