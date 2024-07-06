import time

dailyDataRoute= "C:/xampp/htdocs/lorawan/data.txt" #rute for the file that contains last day data only
historicDataRoute= 'dataHistoric.txt' #rute for the file that contain all the historic data
historicBackUpRoute= "C:/Users/GATOTEC18/Documents/SURF/DashboradTest/backUp"

day=1
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
    with open (historicBackUpRoute + '/'+ str(day) + '.txt', 'w') as historicBackUpfile:
        historicBackUpfile.write(dailyBackUp)
        historicBackUpfile.close()

    with open (historicDataRoute, 'r') as historicDataFile:
        historicData= historicDataFile.read()
        historicDataFile.close()

    with open (historicDataRoute, 'w') as historicDataFile:
        historicDataFile.write(historicData+dailyBackUp)
        historicDataFile.close()

    day+=1

    print ("done")
    time.sleep (60) #Sleep for 86400 seconds, this is 24 hours

