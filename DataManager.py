import datetime
import time

"""IMPORTANT
we have 2 formats for the txt files that contains data, we can call
the first "pre parsed" and the second is the "parsed" the diferences 
are that the preparsed has always one comma at the end, doesn´t hace
the "[]" that indicates that is a list and the value of json object is between
quotes (so python thinks that is a string) the parsed is completely legible
for python.

pre parsed example: {..."objectJson":"{...}"...},{..."objectJson":"{...}"...},
parsed example:     [{..."objectJson":{...}...} ,{..."objectJson":"{...}"...}]

the daily data is always in pre parsed format, for the moment 
the historic data is always in pre parsed format, but is desirable to change this
to be in parsed format everytime (making the api efficiently) 
"""

#dailyDataRoute= 'dailyCompostBin.txt' # uncomment this line and comment the below line to change the data from one project to another
dailyDataRoute= 'C:/xampp/htdocs/lorawan/data.txt'
historicDataRoute= 'dataHistoric.txt' #rute for the file that contain all the historic data
historicBackUpRoute= "backUp"

dailyBackUp=''
historicData= ''

while True:

    #Save the daily data into a variable
    with open (dailyDataRoute, 'r') as dailyFile:
     dailyBackUp= dailyFile.read()
    
    #clean the daily file
    with open (dailyDataRoute, 'w') as dailyBackUpFile:
     dailyBackUpFile.write ('') #file.write cleans the entire file and write the new varaible
     dailyBackUpFile.close()

    #this part make a backUp,  saving one file per day in the folder setted before
    currentDate = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M")
    newRoute = f"{historicBackUpRoute}/{currentDate}.txt"
    with open (newRoute, 'w') as historicBackUpfile:  #save a .txt file with the name of the current time
        historicBackUpfile.write(dailyBackUp)
        historicBackUpfile.close()

    #save historic data in historicData variable
    with open (historicDataRoute, 'r') as historicDataFile:
        historicData= historicDataFile.read()
        historicDataFile.close()
    
    #add the last day data to the historic data and write all this in  the historic data file
    with open (historicDataRoute, 'w') as historicDataFile:
        historicDataFile.write(historicData+dailyBackUp)
        historicDataFile.close()



    print ("backup done")
    time.sleep (86400) #Sleep for 86400 seconds, this is 24 hourse

