$(document).ready(function(){
	console.log('Ready');
	$('#container').UIContext();
	
	$('#workspace').UIElement();
	
	//$("#line1").UILine(10,300,200,400);
	//$("#line2").UILine(10,100,200,100);
	//$("<div>").UILine(10,200,200,100).appendTo("#container");
	//$("<div>").UIPath([[50,0],[150,0],[150,100],[100, 120], [50, 0]]).appendTo("#container");
	
	$('<div id="callout-bowl">').UICallout({x:10, y:10, px:210, py:170, oreintation:'right', base:true, text:'Bowl'}).appendTo('#container');
	$('<div>').UIFrame(210, 170, 80, 60).appendTo('#container');
	
	$('<div id="callout-glass">').UICallout({x:320, y:10, px:260+60, py:120, oreintation:'bottom', base:true, text:'Glass'}).appendTo('#container');
	$('<div>').UIFrame(260, 120, 60, 50).appendTo('#container');
})