//Params
// let params = new URLSearchParams(window.location.search);

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
        
        //dibujar titulo de sala
        renderizarHeaderChat(params.get('sala'));
        
        socket.emit('entrarChat', usuario, (resp) => {
            console.log('Usuarios Conectados: ', resp);
            renderizarPersonas(resp);
        });
        
    });
    
    //mostrar mensaje cuando abandone el chat
    socket.on('messageLeftChat',(messageData) => {
        renderizarMensajeAdmin(messageData, 'danger');
        scrollBottom();
    });
    
    //mostrar usuarios conectados
    socket.on('usersOnline',(data) => {
        console.log('Usuarios Online: ', data);
        renderizarPersonas(data);
    });
    
    
    /* *** Listener Messages *** */
    //escuchar mensaje para todos
    socket.on('sendMessage', (messageData) => {
        renderizarMensajeATodos(messageData);
        scrollBottom();
    });
    
    //escuchar mensaje privados
    socket.on('privateMessage', (messageData) => {
        console.log(messageData);
    });
    
    socket.on('messageJoinChat', (messageData) =>{
        renderizarMensajeAdmin(messageData, 'info');
        scrollBottom();
    });
    //desconectarse del servidor
    socket.on('disconnect', () => {
        
        console.log('Desconectado del servidor');
        
    });