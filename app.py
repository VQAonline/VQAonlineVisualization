from flask import Flask, render_template, request,jsonify
import numpy as np
import json
import cv2
from flask_cors import cross_origin
from azure.storage.blob import BlobClient
import time
import boto3
app = Flask(__name__)

# two decorators, same function
@app.route('/')
@app.route('/base')
def base():
    return render_template('base.html', the_title='VQAonline')

@app.route('/index')
def index():
    return render_template('index.html', the_title='VQAonline')

@app.route('/addBlob', methods=["POST"])
def addBlob():
    group_id = request.form.get('group_ID')
    ip_address = request.remote_addr
    current_time = time.time()
    data = str(ip_address)+","+str(group_id )+","+str(current_time)+"\n"
    sas_url = ""#put your blob url here
    blob_client = BlobClient.from_blob_url(sas_url)
    existing_data = blob_client.download_blob().readall().decode('utf-8')
    new_data = existing_data + data
    blob_client.upload_blob(new_data, overwrite=True)
    return "y"  

if __name__ == '__main__':
    # app.run()
    
    app.run(host="0.0.0.0",debug=True, port=8898)
