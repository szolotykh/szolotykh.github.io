/**
 * @author Sergey Zolotykh - szolotykh88@gmail.edu
 */

 var UI2D = UI2D || {
  REVISION : '0.0.1-SNAPSHOT'
};
 
if (typeof jQuery === 'undefined') { throw new Error('2D-UI requires jQuery'); }

(function($){
	// UI Context
	$.fn.UIContext = function(container){
		this.addClass('ui-context');
		return this;
	};
	// UI Line
	$.fn.UILine = function(x1,y1, x2, y2){
		var length = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
		var angle = Math.atan2(y2-y1, x2-x1);
		this.addClass('ui-line').css({
			'top': y1 + 'px',
			'left': x1 + 'px',
			'width': length + 'px',
			'transform-origin': '0 50%',
			'transform': 'rotate('+(angle*180/Math.PI)+'deg)'
			});
		return this;
	};
	/**
	* Create callout object
	*
	* @param {x} x coordinate of callout body
	* @param {y} y coordinate of callout body
	* @param {px} x coordinate of pointer
	* @param {py} y coordinate of pointer
	* @return {this} jQuery object
	*/
	$.fn.UICallout = function(x,y, px, py, options){

		var defaultOptions = {
			base: true,
			position: 'bottom'
		};
		options = $.extend(defaultOptions, options);

		var callout = this;
		callout.addClass('ui-callout-body').addClass();

		callout.css({
			'top': y + 'px',
			'left': x + 'px'
			});
		setTimeout(function(){
			var w = callout.outerWidth();
			var h = callout.outerHeight();
			$('<div>').UILine(w/2,h-4, w/2,h+20).addClass('ui-callout-pointer-base').appendTo(callout);
			$('<div>').UILine(w/2,h+20,px-x,py-y).addClass('ui-callout-pointer').appendTo(callout);
		},2);
		return this;
	};
	// UI Path
	$.fn.UIPath = function(points){
		if(points.length<2){
			return this;
		}
		$(this).addClass('ui-path');
		for(var i=0; i<points.length-1; i++){
			$('<div>').UILine(points[i][0],points[i][1],points[i+1][0],points[i+1][1])
				.addClass('ui-path-line')
				.appendTo(this);
		}
		return this;
	};
}(jQuery));
