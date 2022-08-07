
import { Chat } from '@/pages/Chat';
import React from 'react';
import { Route } from 'react-router-dom';

export const threadRoutes = (
  <Route path="chat" element={<Chat/>}>
  </Route>
);
