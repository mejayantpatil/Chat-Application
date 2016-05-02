/**
 * Created by Jayant on 14-03-2016.
 */
function test(io) {
    var users = {};
    var connectedUsers = [];
    var sockets = {};

    io.on('connection', function (socket) {
        console.log('user connected');
        // register user
        socket.on('init', function (user) {
            users[user.email.replace(/[@.]/gi, '_')] = socket.id;
            //connectedUsers.push(user);
            sockets[socket.id] = {user: user, socket: socket};
            // sending to all clients except sender
            //socket.broadcast.emit('user:joined',connectedUsers);
            // sending to all clients, include sender
            io.emit('user:joined',users);
        });

        //send private message
        socket.on('from:private message', function (data) {
            sockets[users[data.to]].socket.emit('to:private message', {
                from: sockets[socket.id].user,
                message: data.message
            })
        });

        socket.on('team:join', function (data) {
            //New user joins the room
            socket.join(data.teamName);
            //Tell all those in the room that a new user joined
            io.in(data.teamName).emit('user joined', data);
        });

        socket.on('from:team message', function (data) {
            io.in(data.team.teamName).emit('to:team message', {message: data.message, user: data.user});
        });

        socket.on('team:leave', function (data) {
            //New user leaves the room
            socket.leave(data.teamName);
            //Tell all those in the room that a user left
            io.in(data.teamName).emit('user left', data);
        });

        socket.on('chat message', function (msg) {
            console.log('message: ' + msg + ' socketid:' + socket.id);

            //emitting
            io.emit('some event', msg);
        });

        //disconnect
        socket.on('disconnect', function () {
            console.log('user disconnected');

            try {
                if(sockets[socket.id]) {
                    io.emit('user:left', sockets[socket.id].user);
                    // clearing object
                    delete users[sockets[socket.id].user.email.replace(/[@.]/gi, '_')];
                    delete sockets[socket.id];
                }
            }
            catch(err){
                console.log(err);
            }
        });


    });

}

module.exports = test;