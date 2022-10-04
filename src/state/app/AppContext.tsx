import { createContext } from "react";
import { AppOption } from "./types";

export const AppContext = createContext<AppOption>({
    isMobile: false,
    setIsMenuOpen: () => {},
    isMenuOpen: false
});

