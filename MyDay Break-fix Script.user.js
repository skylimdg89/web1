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

        //
        var parseSplit;
        var parseArraybf = [];
        var parseArrayj5 = [];
        var jsonStrbf = '{"Breakfix":[{"pod":"", "location":"", "tt":""}]}';
        var jsonStrj5 = '{"J5":[{"pod":"", "location":"", "tt":""}]}';
        var obj = JSON.parse(jsonStrbf);
        var obj_j5 = JSON.parse(jsonStrj5);
        //
        for(var i = 0; i < ttName.length ; i++){
            if(ttDesc[i].innerText.match("([bB]reak)?([mM]edia)?(-)?[fF]ix")){
                siteArray.push(ttDesc[i].innerText.match(/(icn|ICN)\d{2}/g)[0]);
                podArray.push(ttDesc[i].innerText.match(/\b\d-\d/g)[0]);
                locArray.push(ttDesc[i].innerText.match(/\b\d{5}\b/g)[0]);//
                ttDesc[i].style.backgroundColor = "yellow";
                //console.log("siteArray["+i+"]" + siteArray);
                //console.log("podArray["+i+"]" + podArray);
                //console.log("locArray["+i+"]" + locArray);

                bfArray.push("[" + podArray[podArray.length -1] + "] " + locArray[locArray.length-1] + ttString + ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);

                //testing 4/23
                parseArraybf.push(podArray[podArray.length-1] + " "+ locArray[locArray.length-1] +" "+ ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);
                //

                ct++;
            }
            else if(ttDesc[i].innerText.match("(Johnny 5)")){
                console.log("J5 = " + ttDesc[i].innerText);
                ttDesc[i].style.backgroundColor = "lime";
                j5Array.push(ttDesc[i].innerText + ttString + ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);
                parseArrayj5.push(podArray[podArray.length-1] + " "+ locArray[locArray.length-1] +" "+ ticketNumber[i].getElementsByClassName("ng-binding")[0].innerText);//
                jct++;
            }
        }
        //testing 4/23
        //console.log(parseArraybf);
        //

        //console.log(locArray);
        //console.log(podArray);
        //console.log(bfArray);
        bfArray.sort(); // sorts breakfix array
        textAreaDiv.append("total " + ct + " Break Fix tickets\n");
        parseArraybf.sort(); /////testing 4/23
        obj['Breakfix'].pop();
        parseArrayj5.sort();
        obj_j5['J5'].pop();
        ///testing 4/23
        for(var j = 0; j < bfArray.length; j++){
            textAreaDiv.append(bfArray[j] + "\n");

            //testing 4/23
            parseSplit = parseArraybf[j].split(" ");
            obj['Breakfix'].push({"pod":parseSplit[0], "location":parseSplit[1], "tt":parseSplit[2]});
            jsonStrbf = JSON.stringify(obj);
            //
        }

        console.log(jsonStrbf);////
        textAreaDiv.append("========================================\n");
        textAreaDiv.append("total " + jct + " J5 tickets\n");

        for(var k = 0; k < j5Array.length; k++){
            textAreaDiv.append(j5Array[k] + "\n");
             //testing 4/23
            parseSplit = parseArrayj5[k].split(" ");
            obj_j5['J5'].push({"pod":parseSplit[0], "location":parseSplit[1], "tt":parseSplit[2]});
            jsonStrj5 = JSON.stringify(obj_j5);
            //
        }
        console.log(jsonStrj5);
    });

});
