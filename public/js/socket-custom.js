let socket = io();
    
    //conectarse al servidor
    socket.on('connect', () => {
        console.log('conectado al servidor');
    });
    
    //desconectarse del servidor
    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    })
    
    //enviar un objeto al servidor
    socket.emit('enviarMensaje', {
        usuario: 'Alexander',
        mensaje: 'Hola server'
    }, (resp) => {
        console.log('Servidor: ', resp.resp);
    });
    
    //recibir una respuesta del servidor
    socket.on('enviarMensaje', (data) => {
        console.log('Servidor: ', data);
    });