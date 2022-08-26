import { ActiveClient, StreamsService } from "./logic/streams-service";

export async function testStreamsToTheBonez(){
    let alice = await StreamsService.createChat()

    let bob = await StreamsService.joinChat(alice.links.announcement)

    alice = await StreamsService.startChat(alice, bob.links.subscription)

    while(!bob.links.lastMessage){
        await new Promise(resolve => setTimeout(resolve, 1000))
        bob = await StreamsService.getKeyloadLink(bob)
    }

    console.log('Chat started')

    await furiouslySpam(alice)
    const aliceResponse = await StreamsService.exportClient(alice, 'test')
    const bobResponse = await StreamsService.fetchMessages(bob)

    console.log(`Bob has ${bobResponse.messages.length} messages`)
}

async function furiouslySpam(client: ActiveClient){
    for(let i = 0; i < 20; i++){
        StreamsService.sendMessage(client, {timestamp: Date.now(), isOwn: false, content:`Spam #${i}`})
    }
}