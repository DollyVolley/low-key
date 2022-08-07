import { ChannelThread } from "@/components/ChannelThread/ChannelThread"
import React,{ FC } from "react"
import styled from "styled-components"

export const Chat: FC = () => {
    return (
    <PageWrapperStyled> 
        <ChannelThread/>
    </PageWrapperStyled>
    )
}

const PageWrapperStyled = styled.div`
    
`