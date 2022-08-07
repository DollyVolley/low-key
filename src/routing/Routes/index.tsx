import BaseAppLayout from '@/layouts/BaseAppLayout';
import ChannelLayout from '@/layouts/ChannelLayout';
import ChatLayout from '@/layouts/ChatLayout';
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

        <Route element={<ChatLayout/>}>
          {threadRoutes}
        </Route>

        <Route element={<ChannelLayout />}>
          {channelRoutes}
        </Route>

        <Route element={<BaseAppLayout/>}>
          {homeRoutes}
        </Route>

        <Route path="*" element={FallbackView} />
        
      </Route>
    </Routes>
  );
};
