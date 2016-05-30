import json
import os
import threading
from time import ctime,sleep

csv_path = './csv/'
target_prefix = './parsed/'
files = os.listdir(csv_path)

def parseCSVFile(csv, target):
  headers = []
  lines = []
  f = open(csv, 'r')

  isHeader = True

  for line in f.readlines():
    newLine = []
    
    for i,col_val in enumerate(line.split(',')):
      col_val = col_val.replace('\n', '').replace("\r", "").replace("\"", "").decode('gb2312').encode('utf8')
      if i == 2:
        if col_val.find(" ") == -1:
          if isHeader:
            isHeader = False
          else:
            col_val = col_val + " 0:00"
      newLine.append(col_val)
    compiledLineString = ",".join(newLine)
    
    lines.append(compiledLineString)
  print '======================================================================================================\n'
  print csv, ' has total lines:', len(lines)
  compiledFileString = "\n".join(lines)
  
  fw = open(target, 'w')
  fw.write(compiledFileString)
  fw.close()
  print target, ' has been successfully written to the disk'
  print '\n======================================================================================================\n'


threads = []

def gb2312toutf8(file, target):
  t1 = threading.Thread(target=parseCSVFile,args=(file, target))
  threads.append(t1)

if __name__ == '__main__':

  for file in files:
    if file[-3:] == 'csv':
      fileName = file[:-3]
      gb2312toutf8(csv_path + file, target_prefix + fileName + 'csv')
  
  print 'Start converting gb2312 csv files into utf8 charset csvs...'
  for i,t in enumerate(threads):
    print 'proccessing file:', (i+1)
    t.start()
    #sleep for a while in case of memory overflow
    sleep(8)
  t.join()
  
  f = open('file_list.json', 'w')
  file_list = json.dumps(files)
  f.write(file_list)
  f.close()
  print "all over %s" %ctime()
