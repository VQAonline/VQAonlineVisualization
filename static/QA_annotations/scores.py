tmp =[1,40,143,180,200,206,267,270,361]
from asyncore import write
import json
prompt_samples = []
with open('test_grouped.json', 'r') as file:
    datas = json.load(file)
    index = 0 
    for i in range(len(datas)):
        if i in tmp:
            data = datas[i]
            print(data.keys())
            prompt_samples.append(data)
with open('prompt_samples.json', 'w') as file:
    json.dump(prompt_samples,file)