var url = "https://api.weatherunlocked.com/api/snowreport/333008?app_id=dd4fa34e&app_key=f0feccb2ba08aeadc6f362ce09c6302e";
var forecasturl = "https://api.weatherunlocked.com/api/resortforecast/333008?app_id=dd4fa34e&app_key=f0feccb2ba08aeadc6f362ce09c6302e"

var datum = Date.now();
var vertrekdatum = new Date("Fri Feb 02 2018 18:00:00 GMT+0100 (W. Europe Standard Time)");
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

console.log(realminutes);

$.ajax({
    url: url,
    success: function(result){
        // snow report
        if("uppersnow_cm" in result) {
            $("#cmtop").text(result.uppersnow_cm + " CM");
        }
        else {
            $("#cmtop").text("notfound! cm");
        }

        if("lowersnow_cm" in result) {
            $("#cmbottom").text(result.lowersnow_cm + " CM");
        }
        else {
            $("#cmbottom").text("notfound! cm");
        }
        $("#reportday").text( "(report: " + result.reportdate + ")");
        $("#freshsnow").text( "+ " + result.newsnow_cm + " fresh");
    }
});

var snowtoday = 0;
var snowadd1day = 0;
var snowadd2days = 0;
var snowadd3days = 0;
var teller = 0

var weekday = new Array(7);
weekday[0] = "SUN";
weekday[1] = "MON";
weekday[2] = "TUE";
weekday[3] = "WEN";
weekday[4] = "THU";
weekday[5] = "FRI";
weekday[6] = "SAT";

var isgeweest1 = false;
var isgeweest2 = false;
var isgeweest3 = false;
var isgeweest4 = false;
var laagstetemp = 0; 
var hoogstetemp = 0;

$.ajax({
    url: forecasturl,
    success: function(result){
        var day = result.forecast[0].date;
        var res = day.split("/");
        var dayday = new Date(parseInt(res[2]),parseInt(res[1])-1,parseInt(res[0]),0,0,0,0);
        var echtedag = dayday.getDay();
        console.log(weekday[echtedag]);
        for (i = 0; i < 50; i++) {
            if (result.forecast[i].date == day){

                if (teller == 0){
                    if (isgeweest1 == false){
                        laagstetemp = parseInt(result.forecast[i].base.temp_c); 
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                        isgeweest1 = true
                    }

                    if (parseInt(result.forecast[i].base.temp_c) < laagstetemp){
                        laagstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    if (parseInt(result.forecast[i].base.temp_c) > hoogstetemp){
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    snowtoday += result.forecast[i].snow_mm;
                    $("#cmtoday").text(snowtoday/10 + " CM");
                    if (result.forecast[i].time == "13:00"){
                        var imgname = (result.forecast[i].mid.wx_icon).split(".", 1);
                        var imgname = imgname +  ".png";
                        $("#imgtoday").attr('src', 'img/snowicons/' + imgname);
                        $("#freeztoday").text(result.forecast[i].frzglvl_m + " M");
                    }
                }

                if (teller == 1){

                    if (isgeweest2 == false){
                        $("#temptoday").text(hoogstetemp + "/" + laagstetemp + " °C");
                        laagstetemp = parseInt(result.forecast[i].base.temp_c); 
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                        isgeweest2 = true
                    }

                    if (parseInt(result.forecast[i].base.temp_c) < laagstetemp){
                        laagstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    if (parseInt(result.forecast[i].base.temp_c) > hoogstetemp){
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    snowadd1day += result.forecast[i].snow_mm;
                    $("#cmadd1").text(snowadd1day/10 + " CM");
                    if (result.forecast[i].time == "13:00"){
                        var imgname = (result.forecast[i].mid.wx_icon).split(".", 1);
                        var imgname = imgname +  ".png";
                        $("#imgadd1").attr('src', 'img/snowicons/' + imgname);

                        var day = result.forecast[i].date;
                        var res = day.split("/");
                        var dayday = new Date(parseInt(res[2]),parseInt(res[1])-1,parseInt(res[0]),0,0,0,0);
                        var echtedag = dayday.getDay()
                        $("#dayadd1").text(weekday[echtedag] + " " +res[0] + "/" + res[1])-1;
                        $("#freezadd1").text(result.forecast[i].frzglvl_m + " M");
                    }
                }

                if (teller == 2){
                    if (isgeweest3 == false){
                        $("#tempadd1").text(hoogstetemp + "/" + laagstetemp + " °C");
                        laagstetemp = parseInt(result.forecast[i].base.temp_c); 
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                        isgeweest3 = true
                    }

                    if (parseInt(result.forecast[i].base.temp_c) < laagstetemp){
                        laagstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    if (parseInt(result.forecast[i].base.temp_c) > hoogstetemp){
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    snowadd2days += result.forecast[i].snow_mm;
                    $("#cmadd2").text(snowadd2days/10 + " CM");
                    if (result.forecast[i].time == "13:00"){
                        var imgname = (result.forecast[i].mid.wx_icon).split(".", 1);
                        var imgname = imgname +  ".png";
                        $("#imgadd2").attr('src', 'img/snowicons/' + imgname);

                        var day = result.forecast[i].date;
                        var res = day.split("/");
                        var dayday = new Date(parseInt(res[2]),parseInt(res[1])-1,parseInt(res[0]),0,0,0,0);
                        var echtedag = dayday.getDay()
                        $("#dayadd2").text(weekday[echtedag] + " " +res[0] + "/" + res[1])-1;
                        $("#freezadd2").text(result.forecast[i].frzglvl_m + " M");
                    }
                }

                if (teller == 3){
                    if (isgeweest4 == false){
                        $("#tempadd2").text(hoogstetemp + "/" + laagstetemp + " °C");
                        laagstetemp = parseInt(result.forecast[i].base.temp_c); 
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                        isgeweest4 = true
                    }

                    if (parseInt(result.forecast[i].base.temp_c) < laagstetemp){
                        laagstetemp = parseInt(result.forecast[i].base.temp_c);
                    }

                    if (parseInt(result.forecast[i].base.temp_c) > hoogstetemp){
                        hoogstetemp = parseInt(result.forecast[i].base.temp_c);
                    }


                    snowadd3days += result.forecast[i].snow_mm;
                    $("#cmadd3").text(snowadd3days/10 + " CM");
                    if (result.forecast[i].time == "13:00"){
                        var imgname = (result.forecast[i].mid.wx_icon).split(".", 1);
                        var imgname = imgname +  ".png";
                        $("#imgadd3").attr('src', 'img/snowicons/' + imgname);

                        var day = result.forecast[i].date;
                        var res = day.split("/");
                        var dayday = new Date(parseInt(res[2]),parseInt(res[1])-1,parseInt(res[0]),0,0,0,0);
                        var echtedag = dayday.getDay()
                        $("#dayadd3").text(weekday[echtedag] + " " +res[0] + "/" + res[1])-1;
                        $("#freezadd3").text(result.forecast[i].frzglvl_m + " M");
                    }
                }
            }
            else {
                var day = result.forecast[i].date;
                teller += 1;
            }
            
            

            
        }
        $("#tempadd3").text(hoogstetemp + "/" + laagstetemp + " °C");
        console.log(laagstetemp)
        console.log(imgname);
    }
});

// $('').bind("click", boomaf);
// function boomaf() {

//     $(this).css({"visibility":"hidden"});
//     $(this).css({"display":"block"});
// }

var aanuit = 1
$(".tree").click(function(){
    if (aanuit == 1){
        $("#snow").hide(100);
        aanuit = 0
    }
    else{
        $("#snow").show(100);
        aanuit = 1
    }
    
 });

 var aanuit2 = 1
 $("#major-title-red").click(function(){
     if (aanuit2 == 1){
        $("#major-title-red").text("Ak geen poeier eb work dweis")
         aanuit2 = 0
     }
     else{
         $("#major-title-red").text("La Plagne");
         aanuit2 = 1
     }
     
  });