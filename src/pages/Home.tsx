import React, {FC} from 'react';
import styled from "styled-components";

export const Home: FC = () => {
    return (
    <PageWrapper> 
        <h1>keep it low key</h1>
    </PageWrapper>
    )
}

const PageWrapper = styled.div`
    text-align: center;
    vertical-align: center;
`

