# ui-demo
Working demo on how to control the page content from outside the context of the web site. 

This is basically the "Part 3" of the project components that have been discussed with the team. 
We are separating the UI side from the rest of the components. 

Websocketd will work as a CGI between the web page UI and the rest of the systems. 
When using websocked one gives an application as an parameter. This applications stdin and stdout are reserved for the 
websocked input and output so that stdout points towards the websocked from the softwares point of view and the stdin is from the websocket.

There are two examples in this demo: autoexample.py that will push randomly either LEFT or RIGHT to the stdout. When this is started with the
websocketd ( ./websocketd --port=8080 ./autoexample.py ) it will send those commands to the UI page. This simulates a feed from the sensor/tensorflow -source.

The other example, the main one, is communicator.py. It will open a fifo pipe file to the filesystem and start polling it. When it gets stream from the file, 
it will pass it to the stdout. When opened with websocketd ( ./websocketd --port=8080 ./communicator.py ) the data from the fifopipe is forwarded to the UI.



How to use: 
1) Start by runnign ./websocketd --port=8080 ./communicator.py on terminal ( or using the start.sh ) 
2) Then browse to /ui/kiemi_ui.html to start the UI page. You can open the developer console in most browsers by pressing F12 and selecting console
3) Then write commands to the buffer_input.fifo -file (pipe) that is created on connection.
You can for example echo "LEFT" > buffer_input.fifo from another terminal to give LEFT -command.

Currently supported commands are LEFT RIGHT and EXIT_SYSTEM

Note that the communicator.py will delete and recreate the fifopipe on startup. When used with websocked the python script is started when session starts.
Session starts when browser connects to the websocket ( in this case when you open ui_kiemi.html )
