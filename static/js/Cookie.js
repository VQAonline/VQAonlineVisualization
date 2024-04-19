
function checkCookie() 
{
    // var hide = getCookie("DtlHide");
    // console.log(hide);

    if(('DtlPane' in localStorage) && (localStorage.DtlPane == "hide")) {
    // if (hide == 'true') {
        $('#dtlPane').collapse('hide');
    }


}


checkCookie();
