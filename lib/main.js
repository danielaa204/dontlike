//Importa el API para modificacion de paginas
var pageMod=require("sdk/page-mod");
//Importa el API self
var self = require("sdk/self");
var tabs = require("sdk/tabs");
 
///tabs
//https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/tabs.html

function onOpen(tab) {
  console.log(tab.url + " is open");

  if(tab.url === "http://facebook"){
    //1. tomar el tiempo
    //2. restar el tiempo
  }

  tab.on("pageshow", logShow);
  tab.on("activate", logActivate);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);
}
 
function logShow(tab) {
  console.log(tab.url + " is loaded");
}
 
function logActivate(tab) {
  console.log(tab.url + " is activated");
}
 
function logDeactivate(tab) {
  console.log(tab.url + " is deactivated");
}
 
function logClose(tab) {
  console.log(tab.url + " is closed");
}
 
tabs.on('open', onOpen);

//////
pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
	                    self.data.url("facebook-mod.js")],
	onAttach: function(worker){
		        worker.port.emit("replacePage", "PageMatches ruleset");
	}
});
