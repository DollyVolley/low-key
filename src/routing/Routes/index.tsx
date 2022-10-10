import BaseAppLayout from '@/layouts/BaseAppLayout';
import ChannelLayout from '@/layouts/ChannelLayout';
import ChatLayout from '@/layouts/ChatLayout';
import { About } from '@/pages/About';
import { Home } from '@/pages/Home';
import React,{ FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { chatRoutes } from './channelRoutes';
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
          {chatRoutes}
        </Route>

        <Route element={<BaseAppLayout/>}>
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About/>} />
        </Route>

        <Route path="*" element={FallbackView} />
        
      </Route>
    </Routes>
  );
};
