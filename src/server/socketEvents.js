exports = module.exports = function(io){
    io.on("connection", function(socket){
        socket.join('Lobby')
        socket.on('chat mounted', function(user){
            socket.emit('receive socket', user.id)
        })
        socket.on('leave channel', function(channel){
            socket.leave(channel)
        })
        socket.on('join channel', function(channel){
            socket.join(channel.name)
        })
        socket.on('new message', function(msg){
            socket.broadcast.to(msg.channelID).emit('new bc message', msg)
        })
        socket.on('new channel', function(channel){
            socket.broadcast.emit('new channel', channel)
        })
        socket.on('typing', function(data){
            socket.broadcast.to(data.channelID).emit('typing bc', data.user)
        })
        socket.on('new private channel', function(socketID, channel){
            socket.broadcast.to(socketID).emit('receive private channel', channel)
        })
    })
}