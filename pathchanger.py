#!/usr/bin/python3
import os
import sys

def replacePath(line, replacemetPath):
    tokens = line.split('\'')
    filePathToken = tokens[1]
    #print('Tokens in line: ',tokens, 'Token to modify: ', filePathToken)
    pathTokens = filePathToken.split('/')
    fileName = pathTokens[len(pathTokens)-1]
    #print('Filepath tokens: ',pathTokens, ': ', fileName)

    modifiedPath = ""
    for i in range(0, len(tokens)):
        if i == 1:
            modifiedPath = modifiedPath + '\'' + replacemetPath + fileName + '\''
            continue
        modifiedPath = modifiedPath + tokens[i]

    return modifiedPath


def saveAndReplace(inputFileName, outputFileName, modifiedFileData):
    with open(outputFileName, 'w') as output:
        output.writelines(modifiedFileData)
        output.flush()

    #TODO: make replacement logic if needed.. 




print('Arguments=[', len(sys.argv), '] argv=', str(sys.argv))
if len(sys.argv) != 3:
    print('Usage: ./pathchanger.py sourcefile path_of_the_images')
    sys.exit()

inputFile = sys.argv[1]
newPath = sys.argv[2]

if newPath[-1] != '/':
    print('path_of_the_images=[',newPath,'] needs to end with /.')
    sys.exit()

if os.path.exists(inputFile) == False:
    print('sourcefile=[',inputFile,'] does not exist.')
    sys.exit()

outputFile = ""
if ( len(inputFile.split('.')) < 2 ):
    outputFile = inputFile + "_new"
else:
    outputFile = inputFile.split('.')[0] + "_new." + inputFile.split('.')[-1]

print("Original file=[", inputFile, "]", end=" ")
print("Output file=[",outputFile,"]", end=" ")
print("Replacement path=[",newPath,"]\n")

modifiedFileData = ''
with open(inputFile) as datafile:
        for line in datafile:
            if '<image file=' in line:
                print('Line found:   \t', line, end="")
                pathChangedLine = replacePath(line, newPath)
                print('Line modified:\t', pathChangedLine)
                modifiedFileData += pathChangedLine
                continue
            modifiedFileData += line


print(modifiedFileData, end="")
saveAndReplace(inputFile, outputFile, modifiedFileData)



