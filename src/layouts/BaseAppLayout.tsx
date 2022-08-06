import React,{ FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const BaseAppLayout: FC = () => {  

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
    overflow: hidden;
`

export default BaseAppLayout;