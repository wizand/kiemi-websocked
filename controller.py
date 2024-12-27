#!/usr/bin/python3
from sys import stdout, stdin
import os

def writeToFifo(message):
    if os.path.exists(FULLPATH) == False:
        print("Fifo file created")
        os.mkfifo(FULLPATH, 0o666)
    print("Sending.." + message)
    with open(FULLPATH, 'w') as fifo:
        fifo.write(message+"\n")
        fifo.flush()

BUFFER_FILE_NAME = "buffer_input.fifo"
PATH = "./"
FULLPATH = PATH + BUFFER_FILE_NAME


    
print("Begin polling for input")
keepRunning = True

while keepRunning:
    incomingLine = stdin.readline().strip()
    if incomingLine == "START":
        writeToFifo("START")
    if incomingLine == "LEFT":
        writeToFifo("LEFT")
    elif incomingLine == "RIGHT":
        writeToFifo("RIGHT")
    elif incomingLine == "EXIT":
        writeToFifo("EXIT")


#print("Cleaning up and quitting..")
#os.remove(FULLPATH)




