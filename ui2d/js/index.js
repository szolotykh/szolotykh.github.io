$(document).ready(function(){
	console.log('Ready');
	$('#container').UIContext();
	
	$('#workspace').UIElement();
	
	//$("#line1").UILine(10,300,200,400);
	//$("#line2").UILine(10,100,200,100);
	//$("<div>").UILine(10,200,200,100).appendTo("#container");
	//$("<div>").UIPath([[50,0],[150,0],[150,100],[100, 120], [50, 0]]).appendTo("#container");
	
	/* Callout example
	$('<div id="callout-bowl">').UICallout({x:10, y:10, px:210, py:170, oreintation:'right', base:true, text:'Bowl'}).appendTo('#container');
	$('<div>').UIFrame({x:210, y:170, width:80, height:60}).appendTo('#container');
	$('<div id="callout-glass">').UICallout({x:320, y:10, px:260+60, py:120, oreintation:'bottom', base:true, text:'Glass'}).appendTo('#container');
	$('<div>').UIFrame({x:260, y:120, width:60, height:50}).appendTo('#container');
	*/
	
	$('<div>').UIFrame({x:210, y:170, width:80, height:60, lable: 'Bowl'}).appendTo('#container');
	$('<div>').UIFrame({x:260, y:120, width:60, height:50, lable: 'Glass'}).appendTo('#container');
})