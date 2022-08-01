
import { MessageThread } from '@/pages/Thread';
import React from 'react';
import { Route } from 'react-router-dom';

export const threadRoutes = (
  <Route path="chat" element={<MessageThread/>}>
  </Route>
);
