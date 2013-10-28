//Importa el API para modificacion de paginas
var pageMod=require("sdk/page-mod");
//Importa el API self
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var moment = require("moment.min.js");
 
///tabs
//https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/tabs.html

var activacion;
var tiempoTotal = 0;

function searchFacebook(url, callback){
    //aplica una expresion regular para buscar la 
    //url que nos interesa
    var match = url.match(/\/\/([^\/]*)\//);
    //si la encuentra
    if(match){
        if(match[1].contains("facebook")){
            console.log("encontre facebook!!");
            //toma la hora y la entrega
            var ahora = moment();
            callback(ahora);
        }
    }
}

function onOpen(tab) {
  console.log("Se abrio: " + tab.url);

  tab.on("pageshow", logShow);
  tab.on("activate", logActivate);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);
}
 
function logShow(tab) {
    console.log(tab.url + " is loaded");
    //busca a facebook
    searchFacebook(tab.url, function(data){
      activacion = data;
    });

    //imprime el tiempo pasado
    console.log("Hora de activacion: ", activacion);
}
 
function logActivate(tab) {
  console.log(tab.url + " is activated");
  searchFacebook(tab.url, function(data){
    activacion = data;
  });
}
 
function logDeactivate(tab) {
  console.log(tab.url + " is deactivated");

  searchFacebook(tab.url, function(data){
    var actual = data;
    tiempoTotal +=  actual.diff(activacion,'seconds');
    console.log("tiempo total: ", tiempoTotal);
  });
}
 
function logClose(tab) {
  console.log(tab.url + " is closed");
  searchFacebook(tab.url, function(data){
    var actual = data;
    tiempoTotal +=  actual.diff(activacion,'seconds');
    console.log("tiempo total: ", tiempoTotal);
  });
}
 
tabs.on('open', onOpen);

//////
pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
	                    self.data.url("facebook-mod.js")],
	onAttach: function(worker){
		        worker.port.emit("replacePage", activacion);
	}
}); 


