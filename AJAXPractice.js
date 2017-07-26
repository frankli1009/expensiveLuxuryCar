/* == ajax practice == */
var mySurvey = document.getElementById("survey");

mySurvey.addEventListener("change", loadMyData, false);

var myManufacturer = document.getElementById("manufacturer");

myManufacturer.addEventListener("change", loadMyData, false);

function loadMyData() {
    var manufacturerStored = myManufacturer.options[myManufacturer.selectedIndex].value;
    console.log(manufacturerStored);
    
    var chartType = mySurvey.options[mySurvey.selectedIndex].value;
    
    var myRequest = new XMLHttpRequest();
    
    myRequest.open("GET", "https://raw.githubusercontent.com/frankli1009/resource/master/expensiveLuxuryCars.json", true);
    
    myRequest.onload = function() {
        if(myRequest.readyState === 4 && myRequest.status === 200) {
            var luxuryCars = JSON.parse(myRequest.responseText);
            console.log(luxuryCars);
            
            document.getElementById("manufacturerC").innerHTML = luxuryCars.data[manufacturerStored].manufacturer;
            
            document.getElementById("modelC").innerHTML = luxuryCars.data[manufacturerStored].model;
            
            document.getElementById("priceC").innerHTML = luxuryCars.data[manufacturerStored].price;
            
            document.getElementById("descriptionC").innerHTML = luxuryCars.data[manufacturerStored].description;
            
            document.getElementById("videoC").innerHTML = '<iframe width="auto" height="auto" src="' + luxuryCars.data[manufacturerStored].video + '" frameborder="0" allowfullscreen></iframe>';
            
            document.getElementById("imgC").innerHTML = '<img width="auto" height="auto" src="' + luxuryCars.data[manufacturerStored].img + '" frameborder="0" cursor="pointer"></img>';

            var chart = new CanvasJS.Chart("chartContainer", {
                theme: "theme2",//theme1
                backgroundColor: "transparent", //custom css, looking on the web docs for it
                title:{
                    text: "Quality"              
                },
                animationEnabled: false,   // change to true
                data: [              
                {
                    // Change type to "bar", "area", "spline", "pie",etc.
                    type: chartType,
                    dataPoints: [
                    ]
                    
                }
                ]
            });
            luxuryCars.data[manufacturerStored].quality.forEach(function(item, index) {
                chart.options.data[0].dataPoints.push({ "label":  item.name,  "y": item.rating});
                document.getElementById(item.name+"C").innerHTML = item.rating;
            });
            chart.render();
        
        }
    }
    
   myRequest.send();
    console.log(myRequest);
    
     //dataPoints: dataPts
    
    
}

