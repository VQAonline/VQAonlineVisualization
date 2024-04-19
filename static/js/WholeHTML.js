//Tab(previous,next)
//Example Tab(previous,next)
//instruction
//submit

// assignmentID = turkGetParam('assignmentId', "");
// console.log(assignmentID);

$(document).ready(function() {
    // $('[data-toggle="popover"]').popover();   
  
    $('.btnPrevious').click(function(){
    $('.controlImg > .active').prev('li').find('a').trigger('click');
    refreshPage();
    });
    if (qualification_mode==false)
    {
        $('.btnNext').click(function(){
            
            refreshPage();
            $('.controlImg> .active').next('li').find('a').trigger('click');
          });
          
        
    }
    else if (qualification_mode==true){
        $('.btnNext').click(function(){
            // if(AlertFinish()){
                
               refreshPage();
                if (AlertAnswer()){
                    $('.controlImg> .active').next('li').find('a').trigger('click');
                }
            });
          
    }








//=========================================Hide show examples======================

$("summary").html("See details and examples");

$("summary").click(function() {
    str = this.id
    summary = "#"+str
    details = "#details"+summary.charAt(summary.length-1)
    console.log($(details)[0].hasAttribute("open"))
        if ($(details)[0].hasAttribute("open")) {
            $(summary).html("See details and examples");
        } else {
            $(summary).html("Hide details and examples");
        }
        

});




//==========================================Instruction===============================================
  $('#hideDtl').click(function()
  {
      $('#dtlPane').collapse('hide');

  });
  

  // delete cookie when user clicks show details
  $('#showDtl').click(function()
  {
      $('#dtlPane').collapse('show');
  });

  // set cookie when details pane is hidden
  $('#dtlPane').on('hidden.bs.collapse', function ()
  {

      localStorage.DtlPane = "hide";
  });

  $('#dtlPane').on('shown.bs.collapse', function ()
  {
        // as user has shown details, delete cookie to keep it shown
        // document.cookie = "DtlHide=true; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
        localStorage.DtlPane = "show";

  });



//==========================================Submit===============================================

function Submit(){
    // $('#hiddenXY').val(JSON.stringify(XY_names));
    // $("#hiddenAnswer").val(JSON.stringify(useranswer_names));
    var date= new Date();
    endTime=date;
    var sjc = ((endTime.getTime()-startTime.getTime())/1000);
    $("#usetime").val(JSON.stringify(sjc));
    $("#browser").val(JSON.stringify(navigator.userAgent));
    nextPage();
}

function nextPage() {
    const currentUrl = new URL(window.location.href);
    const currentGroupIndex = currentUrl.searchParams.get('groupindex');
    const newGroupIndex = getNextIndex(currentGroupIndex);
    currentUrl.searchParams.set('groupindex', newGroupIndex);
    window.location.href = currentUrl.href;
}
function getNextIndex(currentIndex) {
    const match = currentIndex.match(/_(\d+)$/);
    if (match) {
        const number = parseInt(match[1], 10);
        return `test_${number + 1}`;
    }
    return 'test_0';
}

$('#submitbtn').click(function(ev)
{
    ev.preventDefault();
    Submit();
           

});

});


