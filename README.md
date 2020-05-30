# Apollo-websockets
A work in progress websocket wrapper in javascript

**Usage**

***Server***

```javascript
const Apollo = require('Apollo').ApolloServer;

const apollo = new Apollo(4343);



apollo.onConnection( (ws) => {
    console.log("also connected")
    ws.send('test')
    apollo.onMessage(message => {
        console.log(message)
    })
})

```

***Client***

```javascript
const Apollo = require('Apollo').ApolloClient;

const apollo = new Apollo();

apollo.onConnection( (server) => {
    server.send('test')
    
})

```
