
import cv2
import numpy as np
from pyzbar.pyzbar import decode
import sys
import time
import base64


#To start the webcam to scan the QR

cap = cv2.VideoCapture(0)

names = []

#To get the attendence of the students in a file

fob=open('attendendce.txt','a+')
def enterData(z):
    if z in names:
        pass
    else:
        names.append(z)
        z= ''.join(z)
        fob.write(z+'\n')
        return names
    
print('Scan Your QR...')

#function for data present or not

def checkData(data):
    data =str(data)
    if data in names:
        print('Already Presnt!!')
    else:
        print('\n'+str(len(names)+1)+'\n'+'Present Done')
        enterData(data)
    
    
#To Check the data through the frame opened named 'Balkar Sir Lens'
    
while True:
    _,frame = cap.read()
    decodedObject = decode(frame)
    for obj in decodedObject:
        checkData(obj.data)
        time.sleep(1)
        
    cv2.imshow('Balkar Sir Lens',frame)
    
    
    #To close the window
    
    if cv2.waitKey(1)& 0xff==ord('u'):
        cv2.destroyAllWindows()
        break
    
fob.close()
