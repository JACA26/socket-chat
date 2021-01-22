//Params
let params = new URLSearchParams(window.location.search);

if(params.get('nombre') === '' || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//listeners socket
let socket = io();
    
    //conectarse al servidor
    socket.on('connect', () => {
        console.log('conectado al servidor');
        
        socket.emit('entrarChat', usuario, (resp) => {
            console.log('Usuarios Conectados: ', resp);
        });
        
    });
    
    //mostrar mensaje cuando abandone el chat
    socket.on('messageLeftChat',(data) => {
        console.log('Servidor: ', data);
    });
    
    //mostrar usuarios conectados
    socket.on('usersOnline',(data) => {
        console.log('Usuarios Online: ', data);
    });
    
    
    
    //***validar si es privado o general***
    document.getElementById('send').addEventListener('click', () => {
        
        const toUser = document.getElementById('toUser');
        
        if(toUser.value.length == ''){
        //si no contiene un destinatario es mensaje para todos
            const message = document.getElementById('message').value;
            
            //emitir mensaje al servidor
            socket.emit('sendMessage', message);
            document.getElementById('message').value = "";
        
        } else {
        //Contiene destinatario para mensaje privado
            const message = document.getElementById('message').value;
            socket.emit('privateMessage', {
                message,
                toUser: toUser.value
            });
            document.getElementById('message').value = "";
            toUser.value = "";
        
        }
    });
    
    
    /* *** Listener Messages *** */
    //escuchar mensaje para todos
    socket.on('sendMessage', (messageData) => {
        console.log(messageData);
    });
    
    //escuchar mensaje privados
    socket.on('privateMessage', (messageData) => {
        console.log(messageData);
    });
    
    //desconectarse del servidor
    socket.on('disconnect', () => {
        
        console.log('Desconectado del servidor');
        
    });