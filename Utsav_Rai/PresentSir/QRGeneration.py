from MyQR import myqr
import os
import base64

# Read and create the name of the students from students.txt file


f = open('students.txt', 'r')
lines = f.read().split("\n")
print(lines)

#Generation of the QR of each students present in the file

for i in range(0,len(lines)):
    data = lines[i].encode()
    name = base64.b64encode(data)
    version, level, qr_name = myqr.run(
    str(name),
    level = 'H',
    version = 1,
    
    

    save_name = str(lines[i]+'.bmp'),
    save_dir = os.getcwd()
    
    
)

