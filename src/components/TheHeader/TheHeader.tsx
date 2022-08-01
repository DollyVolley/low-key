import { syncCountAtom } from '@/store/app';
import { currentChannelDescriptionSelector } from '@/store/channelDescriptions';
import React, {FC, useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import styled from "styled-components";

import SyncAltIcon from '@mui/icons-material/SyncAlt';


export const TheHeader: FC = () => {
    const syncCount = useRecoilValue(syncCountAtom)
    const description = useRecoilValue(currentChannelDescriptionSelector)

    return (
        <HeaderWrapperStyled>
            <TitleStyled>{description?.name}</TitleStyled>
            
            <SyncAltIcon fontSize='medium' color={!!syncCount? 'info': 'disabled'} />
        </HeaderWrapperStyled>
    )
}
const HeaderWrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    vertical-align: center;
    height: 60px;
    line-height: 60px;

`

const TitleStyled = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`



