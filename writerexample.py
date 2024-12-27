#!/usr/bin/python3
from sys import stdout, stdin
from time import sleep
import random

BUFFER_FILE_NAME = "buffer_input.fifo"
PATH = "./"
FULLPATH = PATH + BUFFER_FILE_NAME

def writeToFifo(message):
    print("Sending.." + message)
    with open(FULLPATH, 'w') as fifo:
        fifo.write(message+"\n")
        fifo.flush()


print("Demo of writing stuff to fifo:")


writeToFifo("START")
sleep(2)

for count in range(0, 7):
    randomDir = random.randrange(0,2)
    if ( randomDir == 0):
        writeToFifo("LEFT")
    elif ( randomDir == 1):
        writeToFifo("RIGHT")
            
    sleep(2)

print("Cleaning up and quitting..")
writeToFifo("EXIT")


