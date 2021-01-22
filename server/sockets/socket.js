const {io} = require('../server');
const {Usuarios} = require('../classes/usuarios');

//utilities
const {makeMessage} = require('../utilities/utilities-chat');
const userControl = new Usuarios();

io.on('connection', (client) => {
    
    //agregar al usuario cuando se conecte
    client.on('entrarChat', (data, callback) => {
        
        if(!data.nombre || !data.sala) {
            return callback({
                err: true,
                message: 'El nombre y la sala son necesarios'
            })
        }
        
        client.join(data.sala);
        userControl.addUser(client.id, data.nombre, data.sala);
        
        //retornar las personas online en el callback
        let usersOnline = userControl.getUsersByRoom(data.sala);
        client.to(data.sala).emit('usersOnline', usersOnline);
        console.log('Users Online: ',usersOnline);
        callback(usersOnline);
    });
    
    //Message for Room
    client.on('sendMessage', (message) => {
        
        const user = userControl.getUser(client.id);
        
        const emitMessage = makeMessage(user.nombre, message);
        
        client.to(user.sala).emit('sendMessage', emitMessage);
    });
    
    //Private Message
    client.on('privateMessage', (messageData) => {
        
        const user = userControl.getUser(client.id);
        
        const emitMessage = makeMessage(user.nombre, messageData.message);
        
        client.to(messageData.toUser).emit('privateMessage',emitMessage);
    });
    
    //desconectar y eliminar al usuario
    client.on('disconnect', () => {
        
        let userDelete = userControl.deleteUser(client.id);
        
        client.to(userDelete.sala).emit('messageLeftChat', {
            user: 'Admin',
            message: `${userDelete.nombre} ha abandonado el chat`
        });
        
        //retornar usuarios en línea
        let usersOnline = userControl.getUsersByRoom(userDelete.sala);
        console.log('Usuarios Conectados: ', usersOnline);
        client.to(userDelete.sala).emit('usersOnline', usersOnline);
    });
    
});