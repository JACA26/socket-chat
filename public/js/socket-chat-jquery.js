var params = new URLSearchParams(window.location.search);

//atributos html
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var titleChat = $('#titleChat');

//moment configuration
moment.locale('es-mx');


/* ***RENDERS*** */

//funcion para renderizar usuarios
function renderizarPersonas(persons){
    
    //crear titulo de sala
    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('sala')+'</span></a>';
    html += '</li>';
    
    //crear chat por usuario
    for(var i=0; i<persons.length; i++){
        
        html += '<li>';
        html += '    <a data-id="'+persons[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ persons[i].nombre +' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    
    //agregar html al div
    divUsuarios.html(html);
}

//renderizar mensajes
function renderizarMensajePropio(messageData){
    
    // moment.locale('es-mx');
    var tiempo = moment(messageData.fecha).format('lll');
    
    var html = '';
    html += '<li class="reverse">'
    html += '    <div class="chat-content">';
    html += '        <h5>'+messageData.nombre+'</h5>';
    html += '        <div class="box bg-light-inverse">'+messageData.mensaje+'</div>';
    html += '    </div>';
    html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += '    <div class="chat-time">'+tiempo+'</div>';
    html += '</li>';
    
    divChatbox.append(html);
    
}

//renderizar el mensaje para toda la sala
function renderizarMensajeATodos(messageData){
    
    // moment.locale('es-mx');
    var tiempo = moment(messageData.fecha).format('lll');
    
    var html = '';
    
    html +='<li>';
    html +='    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html +='    <div class="chat-content">';
    html +='        <h5>'+messageData.nombre+'</h5>';
    html +='        <div class="box bg-light-info">'+messageData.mensaje+'</div>';
    html +='    </div>';
    html +='    <div class="chat-time">'+tiempo+'</div>';
    html +='</li>';
    
    divChatbox.append(html);
}


//renderizar el mensaje del administrador
function renderizarMensajeAdmin(messageData, type){
    
    // moment.locale('es-mx');
    var tiempo = moment(messageData.fecha).format('lll');
    
    var html = '';
    
    html +='<li>';
    html +='    <div class="chat-content">';
    html +='        <h5>'+messageData.nombre+'</h5>';
    html +='        <div class="box bg-light-'+type+'">'+messageData.mensaje+'</div>';
    html +='    </div>';
    html +='    <div class="chat-time">'+tiempo+'</div>';
    html +='</li>';
    
    divChatbox.append(html);
}

//renderizar el header del chat
function renderizarHeaderChat(titleHeader){
    
    var html = '';
    
    html += '<div class="p-20 b-b">';
    html += '    <h3 class="box-title">Sala de chat <small>'+titleHeader+'</small></h3>';
    html += '</div>';
    
    titleChat.append(html);
}

//scroll al ultimo mensaje 
function scrollBottom() {
    
    // selectors
    var newMessage = divChatbox.children('li:last-child');
    
    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;
    
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}





/* ** LISTENERS ** */
//extraer id de los usuarios
divUsuarios.on('click','a', function(){
    
    var id = $(this).data('id');
    if(id){
        console.log(id);
    }
    
});

//Enviar Mensaje a la sala
formEnviar.on('submit', function(e){
    
    e.preventDefault();
    
    //emitir mensaje al servidor
    socket.emit('sendMessage', txtMensaje.val(), function(resp){
        renderizarMensajePropio(resp);
        scrollBottom();
    });
    txtMensaje.val('');
    
});
