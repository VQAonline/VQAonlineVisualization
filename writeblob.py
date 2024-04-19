from ipaddress import ip_address
from flask import Flask, request, redirect, url_for
import os
from azure.storage.blob import BlobServiceClient,BlobClient
import time

app = Flask(__name__)

@app.route('/index')
def index():
    groupindex = request.args.get('groupindex')
    ip_address = request.remote_addr
    current_time = time.time()
    
    data = str(ip_address)+","+str(groupindex)+","+str(current_time)
    sas_url = ""#put your sas url here
    blob_client = BlobClient.from_blob_url(sas_url)
    blob_client.upload_blob(data, overwrite=True)
    return "t"

if __name__ == '__main__':
    app.run()