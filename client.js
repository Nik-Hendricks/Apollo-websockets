const Apollo = require('Apollo').ApolloClient;

const apollo = new Apollo();

apollo.onConnection( (server) => {
    server.send('test')
    
})
