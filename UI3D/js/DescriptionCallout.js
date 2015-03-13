/**
 * @author Sergey Zolotykh - szolotykh88@gmail.com
 */
 
/**
* Create callout texture image
*
* @param {p} Callout options
* @return {canvas} HTML canvas element
*/
UI3D.CanvasDescriptionCallout = function(p){
	// Parameters check
	if (p === undefined){
		p = {};
	}
	p.text = p.text||".";
	p.font = p.font||"Georgia";
	p.fontSize = p.fontSize||14;
	p.textColor = p.textColor||"#000000";
	p.textAlign = p.textAlign||"left";
	p.maxWidth = p.maxWidth||200;
	p.padding = p.padding||10;
	p.paddingLeft = p.paddingLeft||p.padding;
	p.paddingRight = p.paddingRight||p.padding;
	p.paddingTop = p.paddingTop||p.padding;
	p.paddingBottom = p.paddingBottom||p.padding;
	p.borderWidth = p.borderWidth||2;
	p.borderColor = p.borderColor||"#000000";
	p.backgroundColor = p.backgroundColor||"#FFFFFF";
	p.margin = p.margin||30;
	p.pointerSide = p.pointerSide||"left";
	p.pointerWidth = p.pointerWidth||0.3;
	p.pointerStart = p.pointerStart||0.5;
	if(p.pointerEnd==undefined){
		p.pointerEnd=0.5;
	}

	if(p.pointerStart<p.pointerWidth/2){
		p.pointerStart=p.pointerWidth/2;
	}
	if(1-p.pointerStart < p.pointerWidth/2){
		p.pointerStart = 1 - p.pointerWidth/2;
	}
	
	// Body coordinates
	var x0, y0;
	if(p.pointerSide=="left"){
		x0 = p.margin;
		y0 = p.borderWidth/2;
	}
	if(p.pointerSide=="right"||p.pointerSide=="bottom"){
		x0 = p.borderWidth/2;
		y0 = p.borderWidth/2;
	}
	if(p.pointerSide=="top"){
		x0 = p.borderWidth/2;
		y0 = p.margin;
	}
	// Lines offset
	var dy = Math.ceil(p.fontSize*1.25);
	
	// Split text on words
	var words = p.text.split(' ');
    var line = '';
	var lines = [];
	
	//Create canvas
	var canvasCallout = document.createElement('canvas');
	canvasCallout.width = 30;
    canvasCallout.height = 30;
	var ctx = canvasCallout.getContext("2d");
	ctx.font = p.fontSize.toString() + "px " + p.font;
	
	// Create lines from words
	var line = "";
	for(var i=0; i<words.length; i++){
		var tempLine = line + words[i] + ' ';
        var lineMetrics = ctx.measureText(tempLine);
		if(lineMetrics.width >= p.maxWidth){
			lines.push(line);
			line="";
			i--;
		}else{
			if(i == words.length-1){
				lines.push(tempLine);
			}else{
				line = tempLine;
			}
		}
	}
	
	// Calculate new height of canvas
	var CalloutHeight = lines.length*dy;
	
	var CalloutWidth = p.maxWidth;
	if(lines.length == 1){
		CalloutWidth = ctx.measureText(lines[0]).width;
	}
	
	// Resize canvas
	canvasCallout.width = p.margin + CalloutWidth + p.paddingLeft + p.paddingRight + p.borderWidth*2;
    canvasCallout.height = p.margin + CalloutHeight + p.paddingTop + p.paddingBottom + p.borderWidth*2;
	
	var bodyWidth = CalloutWidth + p.paddingLeft + p.paddingRight;
	var bodyHeight = CalloutHeight + p.paddingTop + p.paddingBottom;
	
	ctx = canvasCallout.getContext("2d");
	ctx.font = p.fontSize.toString() + "px " + p.font;
	
	// Draw callout body
	ctx.beginPath();
    ctx.moveTo(x0, y0);
	if(p.pointerSide=="top"){
		ctx.lineTo(x0 + bodyWidth*(p.pointerStart-p.pointerWidth/2), y0);
		ctx.lineTo(x0 + bodyWidth*p.pointerEnd, p.borderWidth/2);
		ctx.lineTo(x0 + bodyWidth*(p.pointerStart+p.pointerWidth/2), y0);
	}
    ctx.lineTo(x0 + bodyWidth, y0);
	if(p.pointerSide=="right"){
		ctx.lineTo(x0 + bodyWidth, bodyHeight*(p.pointerStart-p.pointerWidth/2));
		ctx.lineTo(bodyWidth + p.margin - p.borderWidth/2, bodyHeight*p.pointerEnd);
		ctx.lineTo(x0 + bodyWidth, bodyHeight*(p.pointerStart+p.pointerWidth/2));
	}
    ctx.lineTo(x0 + bodyWidth, y0 + bodyHeight);
	if(p.pointerSide=="bottom"){
		ctx.lineTo(x0 + bodyWidth*(p.pointerStart+p.pointerWidth/2), y0 + bodyHeight);
		ctx.lineTo(x0 + bodyWidth*p.pointerEnd, bodyHeight + p.margin + p.borderWidth/2);
		ctx.lineTo(x0 + bodyWidth*(p.pointerStart-p.pointerWidth/2), y0 + bodyHeight);
	}
    ctx.lineTo(x0, y0 + bodyHeight);
	if(p.pointerSide=="left"){
		ctx.lineTo(x0, bodyHeight*(p.pointerStart+p.pointerWidth/2));
		ctx.lineTo(p.borderWidth/2, bodyHeight*p.pointerEnd);
		ctx.lineTo(x0, bodyHeight*(p.pointerStart-p.pointerWidth/2));
	}
	ctx.lineTo(x0, y0);
	ctx.closePath();
	
	ctx.fillStyle = p.backgroundColor;
    ctx.fill();
	
	ctx.strokeStyle = p.borderColor;
    ctx.lineWidth = p.borderWidth;
    ctx.stroke();
	
	//Draw text
	ctx.fillStyle = p.textColor;
	for(var i=0; i<lines.length; i++){
		var xoffset=0;
		if(p.textAlign == "center"){
			xoffset = (CalloutWidth - ctx.measureText(lines[i]).width)/2;
		}
		if(p.textAlign == "right"){
			xoffset = (CalloutWidth - ctx.measureText(lines[i]).width);
		}
		ctx.fillText(lines[i], x0 + p.paddingLeft + xoffset, y0 + (i+1)*dy + p.paddingTop);
	}
	return canvasCallout;
}

/**
* Create 3D callout
*
* @param {options} Callout options
* @return {this} Callout object
*/

UI3D.Callout = function(options){
	var iCallout = UI3D.CanvasDescriptionCallout(options);
	var tCallout = new THREE.Texture(iCallout);
	tCallout.needsUpdate = true;
	var geometry = new THREE.PlaneGeometry(iCallout.width, iCallout.height);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
	var material = 	new THREE.MeshBasicMaterial({
		map: tCallout,
		transparent: true,
		side: THREE.DoubleSide
	});
	THREE.Mesh.call(this, geometry, material);
}
UI3D.Callout.prototype = Object.create(THREE.Mesh.prototype);

/*
UI3D.Callout = function(options){
	var iCallout = UI3D.CanvasDescriptionCallout(options);
	var tCallout = new THREE.Texture(iCallout);
	tCallout.needsUpdate = true;
	var geometry = new THREE.PlaneGeometry(iCallout.width, iCallout.height);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
	var material = 	new THREE.MeshBasicMaterial({
		map: tCallout,
		transparent: true,
		side: THREE.DoubleSide
	});
	var pointer = new THREE.Mesh(geometry, material);
	pointer.position.set(0,0,iCallout.height/2);
	THREE.Object3D.call(this);
	this.add(pointer);
}
UI3D.Callout.prototype = Object.create(THREE.Object3D.prototype);
*/
/**
* Update callout text
*
* @param {text} New text of callout
* @return {this} Callout object
*/
UI3D.Callout.prototype.setText = function(text){
	this.material.dispose();
	var iCallout = UI3D.CanvasDescriptionCallout(text, 200);
	var tCallout = new THREE.Texture(iCallout);
	tCallout.needsUpdate = true;
	this.material.map = tCallout;
	this.material.needsUpdate = true;
	this.scale.set(iCallout.width/2, iCallout.height/2, 1);
	return this;
}