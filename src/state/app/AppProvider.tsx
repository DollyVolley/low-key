import React,{ FC, PropsWithChildren, useMemo, useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const contextValue = useMemo(() => {
        return {
            isMenuOpen,
            setIsMenuOpen,
        }
    }, [isMenuOpen])

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}


