
import pandas as pd
import json
predictionFolder = "D:/Study/Phd/CVPR2024/Data_Analysis/Data_Analysis/prediction/"

model_names=["BLIP2_.json","MiniGPT4.json","llava.json","owl.json","InstructBlipHuggingface.json","gptv.json","gpt4.json"]#"visualchatgpt.json", #"gptv.json",
#"gptv-without-context.json","gptv-without-image.json"[]#[]#
csv_file ="D:/Study/Phd/CVPR2024/Data_Analysis/Data_Analysis/tmp/test_samples.csv"
sample_file  = "D:/Study/Phd/CVPR2024/Data_Analysis/Data_Analysis/tmp/sampled_test2.csv"
annotations = pd.read_csv(csv_file)
GT_dict={}
# for index, annotation in annotations.iterrows():
#     Question = annotation['Title']
#     Context = annotation['main_text']
#     RAnswer = annotation['answer']
#     image_id = annotation["CCQA_format"]
#     model_pred = []
#     for model_name in model_names:
#         with open(predictionFolder+"VQAinW_"+model_name,"r") as file:
#             json_data = json.load(file)
#             if image_id in json_data:
#                 value = json_data[image_id]
#             # Iterate over the keys and access the values
#                 # if int(key)<100:        
#                 if model_name=="BLIP2.json":
#                     pred = (value["pred"][0])
#                 else:
#                     pred = (value["pred"])
#                 model_pred.append(pred)
#             else:
#                 model_pred.append("")
#     GT_dict[str(image_id)]={"question":Question, "context":Context, "gt":RAnswer,"model_pred":model_pred}

# Pre-load model predictions
model_data = {}
for model_name in model_names:
    with open(predictionFolder + "VQAinW_" + model_name, "r") as file:
        model_data[model_name] = json.load(file)

AllinOneDict = []

AllinOneDict=[]
samples = pd.read_csv(sample_file)
for _, row in samples.iterrows():
    image_id = str(row["CCQA_format"])
    model_pred = [
        model_data[model_name][image_id]["pred"][0] if image_id in model_data[model_name] and model_name == "BLIP2_.json" else
        model_data[model_name][image_id]["pred"] if image_id in model_data[model_name] else
        ""
        for model_name in model_names
    ]

    entry = {
        str(image_id): {
            "question": row['Title'],
            "context": row['main_text'],
            "gt": row['answer'],
            "model_pred": model_pred
        }
    }
    AllinOneDict.append(entry)

with open('test_grouped.json', 'w') as file:
    json.dump(AllinOneDict, file)


# {"xxxx(image_id)":{"question":xxx, "context":xxxx, "model_pred":[{"model":modelname,"pred":pred},{"model":modelname,"pred":pred}....]}


# [{"xxxx(image_id)":{"question":xxx, "context":xxxx, "model_pred":[{"model":modelname,"pred":pred},{"model":modelname,"pred":pred}....},{}]
# original: [[{"answers": ["green", "white"], "image": 72466, "qid": 72466005, "question": "What color is the iPod?", "answer_type": "other"},