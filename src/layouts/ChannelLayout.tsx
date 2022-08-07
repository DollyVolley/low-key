import { ChatHeader } from '@/components/TheHeader/components/ChatHeader';
import { ManageChatHeader } from '@/components/TheHeader/components/ManageChatHeader';
import { TheHeader } from '@/components/TheHeader/TheHeader';
import React,{ FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const ChannelLayout: FC = () => {  

return (
  <PageWrapperStyled>
    <TheHeader> 
      <ManageChatHeader />
    </TheHeader>

    <OutletWrapperStyled>
        <Outlet />
    </OutletWrapperStyled>
  </PageWrapperStyled>
);
};


const PageWrapperStyled = styled.div`
    padding: 0;
    overflow: hidden;
`

const OutletWrapperStyled = styled.div`
    max-width: 1300px;
    margin: 0 auto;

`

export default ChannelLayout;