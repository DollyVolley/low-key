## low-key

The messenger client is a web app and allows for secure and private communication. It distinguishes from other because it runs without a central provider.
It consists of a client software for the users and a distributed ledger technology for the communication between them. The data exchanged between chat participants is completely private, meaning no one from outside can tell what, how often and even when messages are sent.

****

## Stack
* SPA: React 18
* State Management: Context 
* PWA
* DLT for communication: IOTA
* DLT adapter (send, interpret and organize data and transactions): IOTA [Streams Channel](https://github.com/iotaledger/streams) (publish/subscribe tool)


## Technical Particularities

### True Privacy 
The benefit of the PWA is the Service Worker, which allows for fully cached application in the browser. This makes it "offline" usable, but **a custom iota node should be selected to go fully invisible. **


### Limitations
The architecture of DLTs in general comes with certain properties, some technical particularities have to be dealt with.

- Write access: No entity can send an arbitrary amount of transactions. 
- Message size: As the data needs to fit into a transaction, it's size is limited to 32 kB
- Persistence: The DLT won't store data forever (for the transactions we are using here), this means the clients can only retrieve it for a certain period of time


