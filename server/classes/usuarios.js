class Usuarios {
    
    constructor(){
        this.personas = [];
    }
    
    addUser(id, nombre, sala){
        let user = { id, nombre, sala };
        this.personas.push(user);
        return user;
    }
    
    getUser(id){
        let user = this.personas.filter( userFind => userFind.id === id)[0];
        return user;
    }
    
    getAllUsers(){
        return this.personas;
    }
    
    getUsersByRoom(sala){
        //....
        let usersByRoom = this.personas.filter( usersFind => usersFind.sala === sala);
        return usersByRoom;
    }
    
    deleteUser(id){
        let userDelete = this.getUser(id);
        this.personas = this.personas.filter( userFind => userFind.id != id);
        
        return userDelete;
    }
}

module.exports = {
    Usuarios
}