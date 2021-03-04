function actionToggle(){
    var action = document.querySelector('.action');
    action.classList.toggle('active')
}
 //after window is loaded completely 
 window.onload = function(){
    //hide the preloader
    document.querySelector(".preloader").style.display = "none";
   
}


var my_time;
var count = 0;
var x = 400;
setTimeout('pageScroll()', 1200);

function pageScroll() {
    // If condition to set repeat 
    if (count < 2) {
        var objDiv = document.getElementById("ecran");
        objDiv.scrollTop = objDiv.scrollTop + 1;
        //set scrolling time start
        my_time = setTimeout('pageScroll()', 400);
        //set scrolling time end
    }
}