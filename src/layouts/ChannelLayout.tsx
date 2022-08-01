import { TheHeader } from '@/components/TheHeader/TheHeader';
import { currentChannelDescriptionSelector } from '@/store/channelDescriptions/getters';
import React,{ FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

// probably doesn't make any sense - put back to channelcard
const ChannelLayout: FC = () => {
    const navigate = useNavigate()
    const channelDescription = useRecoilValue(currentChannelDescriptionSelector)
    

  return (
    <OuterContainer>
      <TheHeader/>
      <Outlet />
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0;
`

export default ChannelLayout;