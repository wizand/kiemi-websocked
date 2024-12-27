
const socket = new WebSocket('ws://localhost:8082');


function handleCommand(command) {
    if (command == commands.START) {
        if (socket.OPEN) {
            socket.send("START")
        }
    }
    if (command == commands.LEFT) {
        if (socket.OPEN) {
            socket.send("LEFT")
        }
    }
    if (command == commands.RIGHT) {
        if (socket.OPEN) {
            socket.send("RIGHT")
        }
    }
    if (command == commands.END) {
        if (socket.OPEN) {
            socket.send("STOP")
        }
    }
}


function handleInput(event) 
{   var message = event.data;
    console.log("Message=["+message+"]");         
}

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', handleInput); 
