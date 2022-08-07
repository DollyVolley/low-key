import React, {FC} from 'react';
import styled from "styled-components";

export const Home: FC = () => {
    return (
    <PageWrapper> 
        <TitleContainerStyled>
            <TitleStyled>
                low key
            </TitleStyled>
        </TitleContainerStyled>

    </PageWrapper>
    )
}

const PageWrapper = styled.div`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
`
const TitleContainerStyled = styled.div`
    width: 200px;
    height: 200px;
    margin: 30vh auto auto;
`
const TitleStyled = styled.h1`
    font-size: 5rem;
    letter-spacing: 0.8rem;
    color: #3a3a3e;
`

