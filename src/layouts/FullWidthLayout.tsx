import React,{ FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const FullWidthLayout: FC = () => {
  return (
    <OuterContainer>
      <Outlet />
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  margin: 0 auto;
`

export default FullWidthLayout;