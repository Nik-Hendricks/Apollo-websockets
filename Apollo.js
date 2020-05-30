const WebSocket = require('ws');
//const WebSocket = require('./node_modules/ws')


class ApolloServer{
    events = {}
    port = 4334;
    wss = null;
    ws;

    constructor(port){
        var parent = this;
        if(port){
            this.port = port;
        }
        this.wss = new ApolloWebSocket.Server({ port: parent.port },function(){
            console.log('started websocket server on port: ' + parent.port )
        });
        //console.log(this.port)
    }


    on_message(){
        return new Promise(resolve => {
            this.wss.on('message', function incoming(message) {
                console.log(message)
                resolve(message)
            })
        })
    }

    on_connection(){
        var parent = this;
        return new Promise(resolve => {
            this.wss.on('connection', function connection(ws) {
                parent.ws = ws;
                
                
                resolve(parent.ws)
            })            
        })
    }

    onMessage(callback){
        this.on_message().then(resolve => {
            callback(resolve)
        })
    }

    onConnection(callback){
        this.on_connection().then(resolve => {
            callback(resolve)
        })
    }



}

class EventDispatcher{
    constructor(){
    }

}

class ApolloWebSocket extends WebSocket{
    events = {};
    constructor(uri, protocols) {
        super(uri, protocols);
    }
    //on(this, do this)
    /*
    constructor(address, protocols, options){
        super();
        console.log(address)
        this.address = address;
        this.protocols = protocols;
        console.log(this)
    }*/

    on(event, _function){
        console.log('event is ' + event)

    }
}

class ApolloClient{

    parent = this;
    host = "ws://127.0.0.1:4343";
    events = {};

    constructor(host){
        if(host){
            this.host = host
        }
        console.log(this.host)
        this.socket = new ApolloWebSocket(this.host, 'chat-protocol');
    }


    on_connection(){
        var parent = this;
        return new Promise(resolve => {
            this.socket.onopen = function(event) {
                resolve(parent.socket)
            }
        })
    }

    onConnection(callback){
        this.on_connection().then(resolve => {
            console.log('connection')
            callback(resolve)
        })
    }


//nned to somehow translate apollo client events to acutal ws event listenere and make a seprate class for a event dispatcher somehow? 

}


module.exports.ApolloServer = ApolloServer;
module.exports.ApolloClient = ApolloClient;