$(document).ready(function(){
	console.log("Ready");
	$("#container").UIContext();
	
	$("#workspace").UIElement();
	
	//$("#line1").UILine(10,300,200,400);
	//$("#line2").UILine(10,100,200,100);
	//$("<div>").UILine(10,200,200,100).appendTo("#container");
	//$("<div>").UIPath([[50,0],[150,0],[150,100],[100, 120], [50, 0]]).appendTo("#container");
	
	$('<div id="callout-bowl">').UICallout(10, 10, 210, 170, {oreintation:"right", base:true}).html("Bowl").appendTo("#container");
	$("<div>").UIFrame(210, 170, 80, 60).appendTo("#container");
	
	$('<div id="callout-glass">').UICallout(320, 10, 260+60, 120, {oreintation:"bottom", base:true}).html("Glass").appendTo("#container");
	$("<div>").UIFrame(260, 120, 60, 50).appendTo("#container");
})