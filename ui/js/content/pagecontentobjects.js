function getContentAsElement(contentString) {
    var templateElement = document.createElement('template');
    templateElement.innerHTML = contentString.trim();
    return templateElement.content.firstChild;
}

var standbypage = {
    pagename: "Standby page",
    contentDivName: "standbycontainer",
    get divId() { return this.contentDivName; },
    divcontent : function() {
        return "<div id='"+ this.divId +"'>"+
        "<h1>This is the stand by page</h1>"+
        "<p>Please come and experience this awesome thingimajig</p>"+
        
        "<div id='messagecontent'></div>"+
        "</div>";},
    getDivContent : function () { return getContentAsElement(this.divcontent() );},
    runOnEntry : function() {console.log(this.pagename + " is changed in! ");},
    runOnExit : function() { 
        var tmpDiv = document.getElementById(this.contentDivName);
        console.log(this.pagename + " is changing away.." + tmpDiv);

    }
}

var frontpage = {
    pagename: "Frontpage",
    contentDivName: "frontpagecontainer",
    get divId() { return this.contentDivName; },
    divcontent : function() {
        return "<div id='"+ this.divId +"'>"+
        "<h1>This is the front page</h1>"+
        "<p>Please motion left or right</p>"+
        "<img src='img/front.png' />"+
        "<div id='messagecontent'></div>"+
        "</div>";},
    getDivContent : function () { return getContentAsElement(this.divcontent());},
    runOnEntry : function() { console.log(this.pagename + " is changed in! ");},
    runOnExit : function() { 
        var tmpDiv = document.getElementById(this.contentDivName);
        console.log(this.pagename + " is changing away.." + tmpDiv);
    }
}

var electricitychartpage = {
    pagename: "Electricitypage",
    contentDivName: "electricitypagecontainer",
    get divId() { return this.contentDivName; },
    divcontent : 
        function() {
        return "<div id='"+ this.divId +"'>"+
        "<h1>Here we have a chart for electricity consumption</h1>"+
        "<p>Maybe motion up and down for different resolution?</p>"+
        "<img src='img/chart_example.png' />"+
        "<div id='messagecontent'></div>"+
        "</div>";},
    getDivContent : function () { return getContentAsElement(this.divcontent());},
    runOnEntry : function() {console.log(this.pagename + " is changed in! ");},
    runOnExit : function() { console.log(this.pagename + " is changing away..");}
}

var weatherpage = {
    pagename: "Weatherpage",
    contentDivName: "weatherpagecontainer",
    jsonData: "",
    dataUrl: "http://localhost:8080/api/weather/pori",
    get divId() { return this.contentDivName; },
    divcontent : function() {
        return "<div id='"+this.divId+"'>"+
        "<h1>Here are some weather information</h1>"+
        "<p>Maybe motion up and down for different resolution?</p>"+
        "<img src='img/weather_example.png' />"+
        "<br /><div id='jsondata'><p>"+this.getFromApi()+"</p></div>"+
        "<div id='messagecontent'></div>"+
        "</div>";},    
    getDivContent : function () { return getContentAsElement(this.divcontent());},
    runOnEntry : function() { 
        console.log(this.pagename + " is changed in! ");
        this.jsonData = this.getFromApi();
        console.log("Json from api: " + this.jsonData);
    },
    getFromApi: function() {
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", this.dataUrl, false);
         
        Httpreq.send(null);
        return Httpreq.responseText; 
    },
    runOnExit : function() { console.log(this.pagename + " is changing away..");}
}

var jsonexamplepage = {
    pagename: "Jsonexamplepage",
    contentDivName: "jsonexamplecontainer",
    jsonData: "",
    dataUrl: "http://localhost:8080/api/building/ruuviselka/huone1/temperature",
    get divId() { return this.contentDivName; },
    divcontent : function() {
        return "<div id='"+this.divId+"'>"+
        "<h1>Here is JSON from API</h1>"+
        "<p>"+this.jsonData+"</p>"+
        "<div id='messagecontent'></div>"+
        "</div>";},    
    getDivContent : function () { return getContentAsElement(this.divcontent());},
    runOnEntry : function() { 
        console.log(this.pagename + " is changed in! . Trying to get data from: " + this.dataUrl);
        this.jsonData = this.getFromApi();
        console.log("Json from api: " + this.jsonData);
    },
    runOnExit : function() { console.log(this.pagename + " is changing away..");},
    getFromApi: function() {
       /* var resp = fetch(this.dataUrl, 
            {
            method: 'GET',
            headers: {
                'Origin':'http://localhost:8081'
            }
        });*/
       var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", this.dataUrl, false);
        
        Httpreq.send(null);
        return Httpreq.responseText;
       
      // return resp;
    }

}