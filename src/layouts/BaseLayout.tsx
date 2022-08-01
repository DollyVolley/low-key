import { currentChannelDescriptionSelector } from '@/store/channelDescriptions';
import React,{ FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const BaseLayout: FC = () => {
  const channelDescription = useRecoilValue(currentChannelDescriptionSelector)
  

return (
  <OuterContainer>
      <Outlet />
  </OuterContainer>
);
};

const OuterContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0;
`

export default BaseLayout;