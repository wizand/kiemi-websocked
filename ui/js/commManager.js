function handleCommand(command) {
    if (command == commands.LEFT || command == commands.RIGHT ) {
        changePageToDirection(command); 
        return;
    }

    if ( command == commands.START ) 
    {
        changePageDirectlyTo(2);
        return;
    }

    if ( command == commands.END ) 
    {
        changePageDirectlyTo(0);
        return;
    }

    if ( command == commands.JSONEXAMPLE )
    {
        changePageDirectlyTo(4);
        return;
    }

}

function isValidMessage(message) 
{
    if (!message ) 
    {
        return false;
    }

    if ( commands[message.toUpperCase()] != 'undefined') 
    {
        return true;
    }

}

function handleInput(event) 
{   var message = event.data;
    if (  isValidMessage(message) ) {

        console.log("Message=["+message+"]");
        handleCommand(commands[message.toUpperCase()]);            
    }
}


const socket = new WebSocket('ws://localhost:8081');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', handleInput); 

