const Apollo = require('Apollo').ApolloServer;

const apollo = new Apollo(4343);



apollo.onConnection( (ws) => {
    console.log("also connected")
    ws.send('test')
    apollo.onMessage(message => {
        console.log(message)
    })
})
