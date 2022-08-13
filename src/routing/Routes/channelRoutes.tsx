import React from 'react';
import { Route } from 'react-router-dom';

import { ChatDetails } from '@/pages/ChannelDetails/ChatDetails';
import { CreateChannel } from '@/pages/Channel/CreateChannel';
import { JoinChannel } from '@/pages/Channel/JoinChannel';


export const chatRoutes = (
  <Route path="channel">
    <Route path="create" element={<CreateChannel />} />
    <Route path="join">
      <Route index element={<JoinChannel />} />
      <Route path="accept/:announcementLink" element={<JoinChannel />} />
    </Route>
    <Route path="id/:channelID">
      <Route index element={<ChatDetails />} />
      <Route path="accept/:subscriptionLink" element={<ChatDetails />} />
    </Route>
    <Route path="*" element={<div>Hey Ho kleiner Stern</div>} />
  </Route>
);
