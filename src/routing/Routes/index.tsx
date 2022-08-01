import BaseLayout from '@/layouts/BaseLayout';
import ChannelLayout from '@/layouts/ChannelLayout';
import React,{ FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { channelRoutes } from './channelRoutes';
import { homeRoutes } from './homeRoutes';
import { threadRoutes } from './threadRoutes';

export const AppRoutes: FC = () => {
  const FallbackView = <Navigate to="/home" />;

  return (
    <Routes>
      <Route path="/">
        <Route index element={FallbackView} />

        <Route element={<ChannelLayout />}>
          {threadRoutes}
          {channelRoutes}
        </Route>

        <Route element={<BaseLayout/>}>
          {homeRoutes}
        </Route>

        <Route path="*" element={FallbackView} />
        
      </Route>
    </Routes>
  );
};
