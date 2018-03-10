var datum = Date.now();
var vertrekdatum = new Date("Sun Apr 01 2018 18:00:00 GMT+0100 (W. Europe Standard Time)");
var countdown = vertrekdatum - datum;

var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var years = days * 365;
var t = Date.now();

var realdays = countdown / days;
document.getElementById("daysto").innerHTML = Math.floor(realdays);
var countdowndays = (countdown - (Math.floor(realdays)*24*60*60*1000));
var realhours = countdowndays / hours;
document.getElementById("hrsto").innerHTML = Math.floor(realhours);
var countdownhours = (countdowndays - (Math.floor(realhours)*60*60*1000));
var realminutes = Math.floor(countdownhours / minutes);
document.getElementById("minto").innerHTML = realminutes;

const commentvak = $('#commentsvak');
var teller = 0;
$.ajax({
    url: 'https://pdm-pieter.azurewebsites.net/api/laplagnect/getmessages',
    success: function(result){
        console.log(result[0].time);
        while (result.name != ""){
            var array = (result[teller].time).split("T");
            commentvak.append('<div class="commentitem"><p id="comment">' + result[teller].message + '</p><div id="bywhen"><span id="commentname">' + result[teller].name + '</span><span id="commenttime">' + array[0] + "  " + array[1] + '</span></div>');
            teller += 1;
        }
    }
});

    $('#addbutton').bind("click", GeneralPost);
    function GeneralPost() {
        var name1 = $('#inputname').val();
        var message = $('#messagebox').val();
        var dataJSON = {"name": name1 , "message": message};
        $.ajax({
            type: 'POST',
            url: 'https://pdm-pieter.azurewebsites.net/api/laplagnect/addmessage',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(){
                $('#inputname').val(""); 
                $('textarea').val("");
            }
            
        });
        
    }
    

    