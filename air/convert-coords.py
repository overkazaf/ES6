import json
f = open('coords-info.csv','r')

fileLines = []
for line in f.readlines():
  lineItem = []
  line = line.replace('\n', '').replace('\r', '')
  for col in line.split(','):
    lineItem.append(col.decode('gbk').encode('utf8'))
  fileLines.append(",".join(lineItem))

f.close()


fw = open('coords-info-parsed.csv', 'w')
fw.write("\n".join(fileLines))
fw.close()
print 'parsed file successfully'