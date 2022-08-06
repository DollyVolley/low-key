import { Paper } from "@mui/material";
import React, { FC, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface UiBoxContainerProps {
    title: string
    children: ReactElement | ReactElement[],
}

export const UiBoxContainer: FC<UiBoxContainerProps> = (props) => {

    return (
        <Wrapper> 
            <UiBoxContainerStyled elevation={3}> 
                <TitleStyled>{props.title}</TitleStyled>

                {props.children}
            </UiBoxContainerStyled>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: left;
    padding: 5px;
`

const TitleStyled = styled.div`
    font-size: 2rem;
    padding: 0 !important;
    margin: 10px 0 40px !important;
    width: fit-content;
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



`