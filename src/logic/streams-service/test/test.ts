import {  StreamsService } from '../';
import { getMsg } from './utils/generateMessage';
import { setupActors } from './utils/setupActors';

export async function testSerial() {
    const [activeClient1, activeClient2] = await setupActors();

    let response1 = await StreamsService.sendMessage(activeClient1, getMsg())  
    let response2 = await StreamsService.fetchMessages(activeClient2)
  
    response2 = await StreamsService.sendMessage(response2.client, getMsg())
    response1 = await StreamsService.fetchMessages(activeClient1)

    const result1 = response1.messages.length === 1
    const result2 = response2.messages.length === 1
  
    const testResult = result1 && result2
    console.log(`Test Serial: ${testResult}`, result1, result2)
}

export async function testParallel() {
  const [activeClient1, activeClient2] = await setupActors()
    
  let response1 = await StreamsService.sendMessage(activeClient1, getMsg())  
  let response2 = await StreamsService.sendMessage(activeClient2, getMsg())

  response2 = await StreamsService.fetchMessages(activeClient2)
  response1 = await StreamsService.fetchMessages(activeClient1)

  const result1 = response1.messages.length === 1
  const result2 = response2.messages.length === 1

  const testResult = result1 && result2
  console.log(`Test Parallel: ${testResult}\nActor1 ${result1}\nActor2 ${result2}`, response1.messages, response2.messages)
}

