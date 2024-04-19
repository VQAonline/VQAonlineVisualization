var activate_tab = "TAB1";
var startTime = new Date();
var endTime = "";
var useranswer_names = {};
var XY_names = {};
var QA_names={};
var ele = document.getElementsByTagName('input'); 
var ele = document.getElementsByTagName('input'); 
var Step3Flag=false;
var searchParams = new URLSearchParams(window.location.search);
var input = searchParams.get("groupindex");
var dataset=input.split("_")[0]
var group_id=input.split("_")[1]
var all_answer_conditions={};
var qualifications={};
var URL_=document.location.toString()
var mode = document.location.toString().split("//")[1].split("/")[1].split("?")[0]//qualification/qualifiationGT/index

// var step1_correct =document.getElementById('stepIncorrectAnswerinputY') ;
// var step1_incorrect =document.getElementById('stepIncorrectAnswerinputN') ;

$( document ).ready(function() {
    $('[data-toggle="popover"]').popover();   
    
  });


if (dataset=="val" || dataset=="train" ||dataset=="test"){  
    var tabnumber=7;       
    var qualification_mode=false;
}


for (var i =1; i < tabnumber+1; i++){
    
    useranswer_names['useranswersTAB'+i]={};
    QA_names['qaTAB'+i]={};
  
    if (qualification_mode==true)
    {
        qualifications["qualiTAB"+i]=false;}
}


//PLEASE NOTICE THAT: tab is indexed from 1 while QA pais are indexed from 1
console.log(dataset)
// [{"xxxx(image_id)":{"question":xxx, "context":xxxx, "model_pred":[{"model":modelname,"pred":pred},{"model":modelname,"pred":pred}....},{}]
loadQApairs= $.getJSON("/static/QA_annotations/"+dataset+"_grouped.json", function(data){
            // if (dataset=="val" || dataset=="train" ||dataset=="test"){            
            for (j=1; j<tabnumber+1;j++){
                // console.log(data[group_id])
            Image_id =Object.keys(data[group_id])[0]
            // console.log(data[group_id][Image_id]["model_pred"][j-1])            
            QA_names['qaTAB'+j]["RAnswer"]=data[group_id][Image_id]["gt"];
            QA_names['qaTAB'+j]["Question"]=data[group_id][Image_id]["question"];
            QA_names['qaTAB'+j]["Context"]=data[group_id][Image_id]["context"];
            QA_names['qaTAB'+j]["Pred"]=data[group_id][Image_id]["model_pred"][j-1];

            QA_names['qaTAB'+j]["Imgsrc"]="https://internexp.blob.core.windows.net/chongyan/images_png_converted/"+ToCOCOimage(Image_id)+"?sv=2021-08-06&st=2023-08-20T02%3A11%3A50Z&se=2026-08-21T02%3A11%3A00Z&sr=c&sp=racwdxltf&sig=2ZY%2BVVDdiexRFVs%2BT%2FZhkvKijrkPEUoD9l6YI0c30O8%3D";
            // } 
            // console.log(QA_names['qaTAB'+j]["Imgsrc"]);

            }
}).fail(function(){
    console.log("An error has occurred.");
});

$.when(loadQApairs).done(function(){
    DisplayCurrentQApairs();
    content =  startTime;
    sas_url = "https://cqa.blob.core.windows.net/ccqa/record_time.txt?sv=2021-10-04&st=2023-05-02T04%3A36%3A23Z&se=2024-02-24T05%3A36%3A00Z&sr=c&sp=racwdxltf&sig=%2FMNkFqIE2V50%2FJAO4cTz58mOB6ke1Geh2yAMM%2Bx359k%3D"
    $.ajax({
        url: "/addBlob",
        method: "POST",
        data: {
            group_ID: group_id  // add your group_id value here
        },
        success: function(response) {
            console.log("Script executed successfully!");
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}
)


function ToCOCOimage(imageid){
    var imageid_str = imageid.toString(); 
    var num_zero = 8-imageid_str.length;
    var zero_strings="";
    for (i=0; i<num_zero;i++){
        zero_strings+="0"
    }
    console.log("VQAinW_"+zero_strings+imageid_str+".png")
    return "VQAinW_"+zero_strings+imageid_str+".png"
}

// Switch Tabs

function find_activated_tab(clicked_id)
{   
    activate_tab=clicked_id;
    refreshPage();
}

function refreshPage()
{
    DisplayCurrentQApairs();
}


function refreshAnswer()
{
    ClearAll();
    DisplayCurrentQApairs();
    ControlNext();
}

function DisplayCurrentQApairs(){
    
    document.getElementById("imageID").innerHTML="Image ID: "+Image_id;
    document.getElementById("question").innerHTML="Question: "+QA_names['qa'+activate_tab]["Question"];
    document.getElementById("context").innerHTML="Context: "+QA_names['qa'+activate_tab]["Context"];
    document.getElementById("Ranswer").innerHTML="Reference answer: "+QA_names['qa'+activate_tab]["RAnswer"];
    document.getElementById("Manswer").innerHTML="Model's answer: "+QA_names['qa'+activate_tab]["Pred"];
    document.getElementById("image").src=QA_names['qa'+activate_tab]["Imgsrc"];
    
}