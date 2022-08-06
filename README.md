## low-key

## Milestone MVP
#### Fixes
- Create header
- Only show necessary fields in views

### General
- use MUI drawer instead of burger
- use stepper for channel creation
- Set up project board
- UI/UX decisions


### Ideas
- add qr code for simpler channel sharing
- add markdown rendering 
- add node dashboard (incl. settings)

**In this documentation you find the outline of an end-to-end encrypted messenger application.** 

The messenger client is a web app and allows for secure, though limited communication (at least long term). It also distinguishes from others because it runs without a central provider.
It consists of a client software for the users and a distributed ledger technology for the communication between them. The data exchanged between chat participants is completely private, meaning no one from outside can tell what, how often and even when messages are sent.

****

## Stack
* SPA: React 18
* State Management: Recoil 
* PWA
* DLT for communication: IOTA
* DLT adapter (send, interpret and organize data and transactions): IOTA [Streams Channel](https://github.com/iotaledger/streams) (publish/subscribe tool)

## User Flows 
Below is the order of events. **(E)** marks for the user explicit steps while **(I)** is for steps that can be handled by the application automatically


### Create Chat 
1.  (E) Alice and Bob both create an outgoing communication channel.
2.  (E) Both users link the others outgoing communication channel as incoming channel.
3.  (I) A handshake via the existing (still public) channels is conducted. This is a 3-step process where a common secret key is generated on both ends (observers are not able to recreate this secret)


### Send Message
1. (R) Create Chat between the two users is required
2. (E) The user types in the message and presses send.
3. (I) The client checks if the chat partner has sent a message before submitting the new one to maintain order
4. (I) The application keeps track of the transaction confirmation progress
5. (E) The user can gather information on the current status 


### Receive Message
1. (R) Create Chat between the two users is required
2. (RE) If PWA is not used: The user needs to open the application
3. (E) The user can read the message


### Set Node [optional]
1.  (R) Alice needs to be aware whats a nodes job is and why they depend on it
2.  (E) Alice enters the domain or ip address of the custom node. 
3.  (I) The node endpoint is tested and accepted or dismissed
4.  (E) The user can enjoy the benefit of providing via public markets or self hosted depending on his need


### Future User Flow Ideas
- Authenticate to App (biometrics, pin, password,...)
- Contribute by donating usage data (maybe get benefit or special) 

The core technology lies in the publish-subscriber component which is simply a typescript library. It manages the whole communication and has an easy interface.

## Technical Particularities

### True Privacy 
The benefit of the PWA is the Service Worker, which allows for fully cached application in the browser. This makes it "offline" usable, but **a custom iota node should be selected to go fully invisible. **


### Limitations
The architecture of DLTs in general comes with certain properties, some technical particularities have to be dealt with.

- Write access: No entity can send an arbitrary high amount of transactions. 
- Message size: As the data needs to fit into a transaction, it's size is very limited: 32 kB
- Persistence: The DLT won't store data forever (for the transactions we are using here), this means the clients can only retrieve it for a certain period of time


