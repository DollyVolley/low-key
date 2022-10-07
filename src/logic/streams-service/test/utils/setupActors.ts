import { StreamsService } from "../../StreamsService";
import { ActiveClient } from "../../types";

export async function setupActors(): Promise<[ActiveClient, ActiveClient]> {
  console.log('Setup Actors')
  await StreamsService.loadStreams();
  let activeClient1 = await StreamsService.createChat()
  let activeClient2 = await StreamsService.joinChat(activeClient1.links.announcement)
  activeClient1 = await StreamsService.startChat(activeClient1, activeClient2.links.subscription)

  while(!activeClient2.links.lastMessage) {
    activeClient2 = await StreamsService.getKeyloadLink(activeClient2)
  }

  console.log('Initialized Chat')

  return [activeClient1, activeClient2]
}