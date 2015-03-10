/*
	2D-UI
	Author: Sergey Zolotykh
*/

if (typeof jQuery === 'undefined') { throw new Error('2D-UI requires jQuery') }

(function($){
	// UI Context
	$.fn.UIContext = function(){
		this.addClass("ui-context");
		return this;
	};
	// UI Line
	$.fn.UILine = function(x1,y1, x2, y2){
		var length = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
		var angle = Math.atan2(y2-y1, x2-x1);
		this.addClass("ui-line").css({
			"top": y1 + "px",
			"left": x1 + "px",
			"width": length + "px",
			"transform-origin": "0 50%",
			"transform": "rotate("+(angle*180/Math.PI)+"deg)"
			});
		return this;
	};
	// UI Callout
	$.fn.UICallout = function(options){
		
		// Default options
		options = options || {};
		var x = options.x||1;
		var y = options.y||1;
		var px = options.px||200;
		var py = options.py||200;
		var w = options.w||100;
		var h = options.h||41;
		var text = options.text;
		var base = (options.base==='undefined')?true:options.base;
		var baseOffset = options.baseOffset||20;
		var oreintation = options.oreintation||"bottom";
		
		this.addClass("ui-callout-body");
		//w = w - parseInt(this.css('padding-left')) - parseInt(this.css('padding-right'));
		//h = h - parseInt(this.css('padding-top')) - parseInt(this.css('padding-bottom'));
		console.log(w+' x '+h);
		this.css({
			"top": y + "px",
			"left": x + "px",
			"width": (w - 24) + 'px',
			"height": (h - 10)  + 'px'
		});

		$("<div>").addClass('ui-callout-text').html(text).appendTo(this);
		
		var xb = xp = w/2;
		var yb = yp = h/2;
		switch(oreintation){
			case "bottom":
				yb = h;
				yp = h + baseOffset;
			break;
			case "top":
				yb = 0;
				yp = -baseOffset;
			break;
			case "left":
				xb = 0;
				xp = -baseOffset;
			break;
			case "right":
				xb = w;
				xp = w + baseOffset;
			break;
		}
		if(base){
			$("<div>").UILine(xb, yb, xp, yp).addClass("ui-callout-pointer-base").appendTo(this);
		}else{
			xp=xb;
			yp=yb;
		}
		$("<div>").UILine(xp, yp ,px-x, py-y).addClass("ui-callout-pointer").appendTo($(this));
		return this;
	};
	
	// UI Path
	$.fn.UIPath = function(points){
		if(points.length<2)
			return this;
		$(this).addClass("ui-path");
		for(var i=0; i<points.length-1; i++){
			$("<div>").UILine(points[i][0],points[i][1],points[i+1][0],points[i+1][1])
				.addClass("ui-path-line")
				.appendTo(this);
		}
		return this;
	};
	
	// Frame
	$.fn.UIFrame = function(options){
		options = options||{};
		options.x = options.x||1;
		options.y = options.y||1;
		options.width = options.width||100;
		options.height = options.height||100;
		options.lable = options.lable||"";
		
		this.addClass("ui-frame").css({
			"top": options.y + "px",
			"left": options.x + "px",
			"width": options.width + "px",
			"height": options.height + "px"
		});
		if(options.lable != ''){
			$('<div>').addClass('ui-frame-lable').html(options.lable).appendTo(this);
		}
		return this;
	};
	
	// UI Element
	$.fn.UIElement = function(){
		this.addClass("ui-element");
		return this;
	};

	// Set attribute of user interface element
	$.fn.UISet = function(attr, value){
		switch(attr){
			case "position":
				this.css({
					"top": value.y + "px",
					"left": value.x + "px"
				});	
			break;
		}
		return this;
	};
}(jQuery));
