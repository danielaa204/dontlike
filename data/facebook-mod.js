//funcion que ejecuta cambios en la pagina
self.port.on("replacePage", function(message){
	$("body").html(message);
});
