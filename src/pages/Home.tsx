import React, {FC} from 'react';
import styled from "styled-components";

export const Home: FC = () => {
    const BackgroundImage = require('@/assets/images/background.png');

    return (
    <PageWrapper> 
        <TitleContainerStyled>
            <LogoStyled src={BackgroundImage} alt="logo" />
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

const LogoStyled = styled.img`
    width: 200px;
    height: 200px;
`
