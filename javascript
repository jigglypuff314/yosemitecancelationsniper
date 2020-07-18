// ==UserScript==
// @name         Yosemite Sniper
// @version      1.3
// @description  Reloads and tries to snipe openings that result from cancelations on recreation.gov. Specifically Yosemite Day Pass. Insert the desired date in the correct format on line 23. You must be logged into recreation.gov with your account in order for this program to work.
// @author       Emily Y
// @include      https://www.recreation.gov/ticket/facility/tour/3000
// @include      https://www.recreation.gov/ticket/reservation/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

console.log("Yosemite Sniper v1.3");

if(window.location.href.indexOf('/3000') === 47){
    console.log("We are on the Day Use Entry Page.");
    var ts = new Date();
    console.log(ts.toLocaleString());
    setTimeout(function(){
        //Click on Date Selector
        document.getElementsByClassName("SingleDatePickerInput_calendarIcon SingleDatePickerInput_calendarIcon_1")[0].click();
        console.log("Clicked on Date Selector.");
        //Save a variable if the Date is available
        var arialabel = document.querySelectorAll('[aria-label="Wednesday, July 29, 2020, available"]');
        if(arialabel.length == 1){ //If the date is indeed available, proceed
            arialabel[0].click();
            console.log("Clicked on the Desired Date.");
            document.getElementById("guest-counter").click(); //Select Vehicle Ticket +1
            document.getElementsByClassName("sarsa-button sarsa-button-subtle sarsa-button-sm")[1].click();
            document.getElementsByClassName("sarsa-button sarsa-button-link sarsa-button-md")[0].click();
            console.log("Completed Ticket +1");
            setTimeout(function(){ //click on the reserve button
                document.getElementsByClassName("ticket-hover-button rec-button-tertiary  ")[0].click();
                console.log("Clicked on the final button.");
            }, 1000);
        }else{ //If the date is not available, print console log and reload the page
            console.log("Desired Date (25) not available.");
        }
        //Timeout function: In 20 seconds, reload the page.
        setTimeout(function(){
            console.log("Reloading the page...");
            location.reload();
        }, 20000);
    }, 1000);
}else if(window.location.href.indexOf('/reservation') === 33){ //if we did get a reservation, wake me up with a Rick Roll
    console.log("on a ticket page now");
    setTimeout(function(){
        console.log("Redirecting to Wake Up Audio.");
        window.location = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
    }, 2000);
}else{ //if something weird happens, take us back to the day pass page
    setTimeout(function(){
        console.log("Returning to day pass page");
        window.location = "https://www.recreation.gov/ticket/facility/tour/3000";
    }, 40000);
}
