import { ChannelThread } from "@/components/ChannelThread/ChannelThread"
import { ChannelHeader } from "@/components/ChannelHeader/ChannelHeader"
import React,{ FC } from "react"
import styled from "styled-components"

export const Chat: FC = () => {
    return (
    <PageWrapperStyled> 
        <ChannelHeader/>
        <ChannelThread/>
    </PageWrapperStyled>
    )
}

const PageWrapperStyled = styled.div`
    
`