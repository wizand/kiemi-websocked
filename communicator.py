#!/usr/bin/python3
from sys import stdout, stdin, stderr
import os

BUFFER_FILE_NAME = "buffer_input.fifo"
PATH = "./"
FULLPATH = PATH + BUFFER_FILE_NAME
try:
    print("Fifo file created")
    print("Begin polling for input")
    keepRunning = True

    if os.path.exists(FULLPATH) == False:
        print("Creating a new fifo file")
        os.mkfifo(FULLPATH, 0o666)

    while keepRunning:
        try: 
            with open(FULLPATH) as fifo:
                for line in fifo:
                    if line == "EXIT_SYSTEM\n":
                        print("EXIT")
                        stdout.flush()
                        keepRunning = False
                        break

                    print(line)
                    stdout.flush()
                    
        except Exception as e:
            print("Error: " + sys.exc_info()[0] + " " + str(e), file=sys.stderr)

finally:
    print("Cleaning up and quitting..")
    if os.path.exists(FULLPATH):
        os.remove(FULLPATH)




