//Importa el API para modificacion de paginas
var pageMod=require("sdk/page-mod");
//Importa el API self
var self = require("sdk/self");


pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
	                    self.data.url("facebook-mod.js")],
	onAttach: function(worker){
		        worker.port.emit("replacePage", "PageMatches ruleset");
	}
});