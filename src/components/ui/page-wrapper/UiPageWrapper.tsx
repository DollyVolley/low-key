import { useMediaQueries } from "@/hooks";
import { useAppContext } from "@/state/app";
import { Paper } from "@mui/material";
import React, { FC, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface UiBoxContainerProps {
    children: ReactElement | ReactElement[],
}

export const UiPageWrapper: FC<UiBoxContainerProps> = (props) => {
    const {isMobile} = useAppContext()

    return (
        <Wrapper className={isMobile? 'mobile' : ''}> 
            {props.children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5vh auto;
    text-align: center;
    
    &.mobile {
        margin: 0 auto;
    }
`
