import { ChatHeader } from '@/components/TheHeader/components/ChatHeader';
import { TheHeader } from '@/components/TheHeader/TheHeader';
import React,{ FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const ChatLayout: FC = () => {
  return (
    <OuterContainer>
      <TheHeader>
        <ChatHeader />
      </TheHeader>
      <Outlet />
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  margin: 0 auto;
`

export default ChatLayout;