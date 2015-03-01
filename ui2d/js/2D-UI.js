/*
	2D-UI
	Author: Sergey Zolotykh
*/

if (typeof jQuery === 'undefined') { throw new Error('2D-UI requires jQuery') }

(function($){
	// UI Context
	$.fn.UIContext = function(container){
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
	$.fn.UICallout = function(x,y, px, py, options){
		// Default options
		var defaultOptions = {
			base: true,
			baseOffset: 20,
			oreintation: "bottom"
		};
		options = jQuery.extend(defaultOptions, options);

		var callout = this;
		callout.addClass("ui-callout-body").addClass();

		callout.css({
			"top": y + "px",
			"left": x + "px"
		});
		// Waiting for div to updates
		setTimeout(function(){
			var w = callout.outerWidth();
			var h = callout.outerHeight();
			var xb = xp = w/2;
			var yb = yp = h/2;
			switch(options.oreintation){
				case "bottom":
					yb = h - 4;
					yp = h + options.baseOffset;
				break;
				case "top":
					yb = -2;
					yp = -options.baseOffset;
				break;
				case "left":
					xb = -2;
					xp = -options.baseOffset;
				break;
				case "right":
					xb = w - 2;
					xp = w + options.baseOffset;
				break;
			}
			if(options.base){
				$("<div>").UILine(xb, yb, xp, yp).addClass("ui-callout-pointer-base").appendTo(callout);
			}else{
				xp=xb;
				yp=yb;
			}
			$("<div>").UILine(xp, yp ,px-x, py-y).addClass("ui-callout-pointer").appendTo(callout);
		}, 10);
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
	$.fn.UIFrame = function(x, y, width, height){
		this.addClass("ui-frame").css({
			"top": y + "px",
			"left": x + "px",
			"width": width + "px",
			"height": height + "px"
		});
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
