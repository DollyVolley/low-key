import { useMediaQueries } from "@/hooks";
import React,{ FC, PropsWithChildren, useMemo, useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {is600PxOrLess} = useMediaQueries()


    const isMobile = useMemo(() => {
        return is600PxOrLess
    }, [is600PxOrLess])

    const contextValue = useMemo(() => {
        return {
            isMobile,
            isMenuOpen,
            setIsMenuOpen,
        }
    }, [isMenuOpen])

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}


