#!/usr/bin/python3
from sys import stdout
from time import sleep
import random

# Count from 1 to 10 with a sleep
for count in range(0, 25):
  randomDir = random.randrange(0,2)
  if ( randomDir == 0):
    print("LEFT")
  elif ( randomDir == 1):
    print("RIGHT")

  stdout.flush()
  sleep(3)