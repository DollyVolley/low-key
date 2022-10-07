import { useMediaQueries } from "@/hooks";
import { useAppContext } from "@/state/app";
import { Paper } from "@mui/material";
import React, { FC, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface UiBoxContainerProps {
    title: string
    children: ReactElement | ReactElement[],
}

export const UiBoxContainer: FC<UiBoxContainerProps> = (props) => {
    const {isMobile} = useAppContext()

    return (
        <Wrapper className={isMobile? 'mobile' : ''}> 
            <UiBoxContainerStyled elevation={3} className={isMobile? 'mobile' : ''}> 
                <TitleStyled className={isMobile? 'mobile' : ''}>{props.title}</TitleStyled>

                {props.children}
            </UiBoxContainerStyled>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: left;
    padding: 5px;
    
    &.mobile {
        padding: 0;
    }
`

const TitleStyled = styled.div`
    font-size: 2rem;
    padding: 0 !important;
    margin: 10px 0 40px !important;
    width: fit-content;

    &.mobile {
        font-size: 1.5rem;
        margin: 25px 0 20px !important;
    }
`

const UiBoxContainerStyled = styled(Paper)`
    padding: 10px 40px 80px;
    text-align: left;

    > * {
        margin: 0 36px 36px;

      &:last-child {
        margin: 0 36px 0px;
      }
    }

    &.mobile {
        padding: 10px;

        > * {
        margin: 0 0 15px;
    }
}



`