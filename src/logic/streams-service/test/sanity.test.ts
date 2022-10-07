import {  StreamsService } from '../';
import { getMsg } from './utils/generateMessage';
import { setupActors } from './utils/setupActors';

describe('Debugging', async() => {
  jest.setTimeout(300000)

  it('Serial Post', async () => {
    const [activeClient1, activeClient2] = await setupActors();
    let response1 = await StreamsService.sendMessage(activeClient1, getMsg())  
    let response2 = await StreamsService.fetchMessages(activeClient2)
  
    response2 = await StreamsService.sendMessage(response2.client, getMsg())
    response1 = await StreamsService.fetchMessages(activeClient1)
    
    expect(response2.messages.length).toBe(1);
    expect(response1.messages.length).toBe(1);
  })

  it('Parallel Post', async() => {
    const [activeClient1, activeClient2] = await setupActors()
    
    let response1 = await StreamsService.sendMessage(activeClient1, getMsg())  
    let response2 = await StreamsService.sendMessage(activeClient1, getMsg())
  
    response2 = await StreamsService.fetchMessages(activeClient2)
    response1 = await StreamsService.fetchMessages(activeClient1)
  
    expect(response2.messages.length).toBe(1);
    expect(response1.messages.length).toBe(1);
  });
});


