// ==UserScript==
// @name         MyDay Break-fix Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       dklim
// @match        https://myday-website.icn.aws-border.com/dashboard
// @grant        none
// ==/UserScript==


$(document).click(function(){

    var bulkButton = document.getElementsByTagName("button")[1];
    var nextBulkButton = bulkButton.parentElement;
    var bfButton = document.createElement("input");

    bfButton.setAttribute("type", "button");
    bfButton.setAttribute("value", "Break-fix");
    bfButton.setAttribute("id", "bf_button");

    if((document.getElementById("bf_button")) || (bulkButton.innerText != "Bulk Edit")){
       return;
    }else{
        nextBulkButton.appendChild(bfButton, nextBulkButton.lastChild);
    }

    $("#bf_button").click(function(){
        var tickets = document.getElementsByClassName("search-result-entry");
        var ticketNumber = document.getElementsByClassName("search-result-header");
        var textAreaDiv = document.createElement("TEXTAREA");
        var bfArea = document.getElementById("search-results-container");
        textAreaDiv.setAttribute("style", "width:1000px; height:200px; background-color: linear-gradient(to bottom, #fff, #e6e6e6); border-color: grey;");
        var textArea = document.getElementsByTagName("TEXTAREA")[0];
        if(!textArea){
            bfArea.appendChild(textAreaDiv);
        }

        var ttName = document.getElementsByClassName("search-result-entry");
        var ttDesc = document.getElementsByClassName("ticket-description ng-binding");
        var ttString = " - https://tt.amazon.com/";
        var ct=0; //counts number of break-fix tickets
        var jct=0; // counts number of j5 tickets
        var bfArray = []; // break-fix array
        var j5Array = []; // j5 array
        var siteArray = []; // site array
        var podArray = []; // pod array
        var locArray = []; // rack location array

        for(var i = 0; i < ttName.length ; i++){
            if(ttDesc[i].innerText.match("([bB]reak)?([mM]edia)?(-)?[fF]ix")){
                siteArray.push(ttDesc[i].innerText.match(/(icn|ICN)\d{2}/g)[0]);
                podArray.push(ttDesc[i].innerText.match(/\b\d-\d/g)[0]);
                locArray.push(ttDesc[i].innerText.match(/\b\d{5}\b/g)[0]);//

                //console.log("siteArray["+i+"]" + siteArray);
                //console.log("podArray["+i+"]" + podArray);
                //console.log("locArray["+i+"]" + locArray);

                bfArray.push("[" + podArray[podArray.length -1] + "] " + locArray[locArray.length-1] + ttString + ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);
                ct++;
            }
            else if(ttDesc[i].innerText.match("(Johnny 5)")){
                console.log("J5 = " + ttDesc[i].innerText);
                j5Array.push(ttDesc[i].innerText + ttString + ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);
                jct++;
            }
        }

        //console.log(locArray);
        //console.log(podArray);
        //console.log(bfArray);
        bfArray.sort(); // sorts breakfix array
        textAreaDiv.append("total " + ct + " Break Fix tickets\n");

        for(var j = 0; j < bfArray.length; j++){
            textAreaDiv.append(bfArray[j] + "\n");
        }

        textAreaDiv.append("========================================\n");
        textAreaDiv.append("total " + jct + " J5 tickets\n");

        for(var k = 0; k < j5Array.length; k++){
            textAreaDiv.append(j5Array[k] + "\n");
        }

    });

});
