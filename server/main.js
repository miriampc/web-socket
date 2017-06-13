const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const arrMessages = [{
    id:1,
    text: "hola soy un mensajes",
    author: "miriam"
}];

app.use(express.static('public'));
app.get('/',(req,res)=>{
   res.status(200).send('Hola mundo, by miriam');
});

io.on('connection',(socket)=>{
   console.log("Alguien se ha conectado con socket");
   socket.emit('messages',arrMessages);
   socket.on('newMessage', (data)=> {//evento escuchado del cliente
        arrMessages.push(data);
        io.sockets.emit('messages',arrMessages);//servidor completo, para que se envie a todos
   });

});
server.listen(8080,()=>{
    console.log("server run");
});