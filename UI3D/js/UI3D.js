/**
 * @author Sergey Zolotykh - szolotykh88@gmail.com
 */
 
 if (typeof THREE === 'undefined') { throw new Error('UI3D requires THREE'); }
 
var UI3D = UI3D || {
  REVISION : '0.0.1-SNAPSHOT'
};
	
// Create context
UI3D.Context = function(options){
	// Default options
	options = options || {};
	options.width = options.width||window.innerWidth;
	options.height = options.height||window.innerHeight;
	
	
	var ctx = this; // local context
	var activeObject = undefined; 
	
	function onRendererMouseMove( event ){
		var mouse = { x: 0, y: 0 }
		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var randererElement = ctx.renderer.domElement;
		mouse.x = ( (event.clientX - randererElement.offsetLeft) / randererElement.width ) * 2 - 1;  //Keep
		mouse.y = - ( (event.clientY - randererElement.offsetTop) / randererElement.height ) * 2 + 1; //Keep

		// Debug
		// console.log("Event: " + event.clientX + " x " + event.clientY);
		// console.log(mouse.x+ " x "+ mouse.y);
		
		vector.set( mouse.x, mouse.y, -0.5 );
		vector.unproject( ctx.camera );
		vector.sub( ctx.camera.position ).normalize();

		raycaster.set( ctx.camera.position,  vector);

		var intersects = raycaster.intersectObjects( ctx.scene.children, true );

		if ( intersects.length > 0 ) {
			for(var i = 0; i < intersects.length; i++){
				if(intersects[i].object.visible){
					if(activeObject == undefined){
						activeObject = intersects[i].object;
						if(activeObject.onMouseEnter !== undefined){
							activeObject.onMouseEnter();
						}
					}else{
						if(activeObject !== intersects[i].object){
							if(activeObject.onMouseLeave !== undefined){
								activeObject.onMouseLeave();
							}
							activeObject = intersects[i].object;
							if(activeObject.onMouseEnter !== undefined){
								activeObject.onMouseEnter();
							}
						}
					}
					if(intersects[i].object.onMouseMove !== undefined){
						// console.log(intersects[i].object);
						intersects[i].object.onMouseMove();
					}
					break;
				}
			}
		}else{
			if(activeObject !== undefined){
				if(activeObject.onMouseLeave !== undefined){
					activeObject.onMouseLeave();
				}
				activeObject = undefined;
			}
		}
	}
	
	function onRendererMouseClick( event ){
		var mouse = { x: 0, y: 0 }
		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var randererElement = ctx.renderer.domElement;
		mouse.x = ( (event.clientX - randererElement.offsetLeft) / randererElement.width ) * 2 - 1;  //Keep
		mouse.y = - ( (event.clientY - randererElement.offsetTop) / randererElement.height ) * 2 + 1; //Keep

		// Debug
		// console.log("Event: " + event.clientX + " x " + event.clientY);
		// console.log(mouse.x+ " x "+ mouse.y);
		
		vector.set( mouse.x, mouse.y, -0.5 );
		vector.unproject( ctx.camera );
		vector.sub( ctx.camera.position ).normalize();

		raycaster.set( ctx.camera.position,  vector);

		var intersects = raycaster.intersectObjects( ctx.scene.children, true );

		if ( intersects.length > 0 ) {
			for(var i = 0; i < intersects.length; i++){
				if(intersects[i].object.visible){
					// console.log(intersects[i].object);
					if(intersects[i].object.onMouseClick !== undefined){
						// console.log(intersects[i].object);
						intersects[i].object.onMouseClick();
					}
					break;
				}
			}
		}
	}	
	
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, options.width/options.height, 0.1, 1000 );

	this.renderer = new THREE.WebGLRenderer({ alpha: true });
	this.renderer.setClearColor( 0x000000, 0 );
	this.renderer.setSize( options.width, options.height );
	// OnMouseDown
	this.renderer.domElement.addEventListener( 'mousedown', onRendererMouseClick, false );
	this.renderer.domElement.addEventListener( 'mousemove', onRendererMouseMove, false );
};

/**
 * Add three.js object to interface
 *
 * @param object - three.js object
 */
UI3D.Context.prototype.add = function(object){
	if(Array.isArray(object)){
		for(var i=0; i<=object.length; i++){
			this.scene.add( object[i] );
		}
	}else{
		this.scene.add( object );
	}
};

/**
* Set global transform matrix
*
* @function
* @name setTransform
* @param {mtx} 4x4 Matrix
* @return {this} context
*/
UI3D.Context.prototype.setTransform = function(mtx){
	this.scene.applyMatrix(mtx)
	return this;
};

/**
* Render context
*
* @function
* @name render
* @return {this} context
*/
UI3D.Context.prototype.render = function(){
	this.renderer.render(this.scene, this.camera);
	return this;
};

UI3D.Point = function(options){
	options = options || {};
	options = options.size || 1;
	options.color = options.color||'#FF0000';
	var geometry = new THREE.SphereGeometry( options.size/2 , 16, 16 );
	var material = new THREE.MeshBasicMaterial( {color: options.color} );
	THREE.Mesh.call(this, geometry, material);
}
UI3D.Point.prototype = Object.create(THREE.Mesh.prototype);

/**
* Create 3D point cloud object
*
* @function
* @name PointCloud
* @param {pointSet} Array of points. [[x1, y1, z1], [x2, y2, z2], ...]
* @param {options} Options
* @return {this} Array of UI3D.Point
*/
UI3D.PointCloud = function(pointSet, options){
	points = [];
	for(var i=0; i<=pointSet.length; i++){
		var p = new UI3D.Point(options)
		p.position.set(pointSet[0], pointSet[1] , pointSet[2]);
		points.push(p);
	}
	return points;
};

// Create 3D Path object
UI3D.Path = function(points, options){
	options = options || {};
		if(points.length<2){
			return this;
		}

		return this;
};

/**
* Create 3D model object
*
* @function
* @name Model
* @param {src} URL of model
* @param {options} Options
*/
UI3D.Model = function(src, options){
	options = options || {};
	this.src;
};
UI3D.Model.prototype = Object.create(THREE.Mesh.prototype);

UI3D.Model.prototype.load = function(){
	var scope = this;
	var loader = new THREE.JSONLoader();
	loader.load(src , function( geometry, materials ) {
		for(var i=0; i<materials.length; i++)
			materials[i].side = THREE.DoubleSide;
		var material = new THREE.MeshFaceMaterial(materials);
		
		THREE.Mesh.call(scope, geometry, material);
		if(scope.onLoad !== undefined){
			scope.onLoad();
		}
	});
}

UI3D.Cube = function(){
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	THREE.Mesh.call(this, geometry, material);
}
//UI3D.Cube.prototype.__proto__ = THREE.Mesh.prototype;
UI3D.Cube.prototype = Object.create(THREE.Mesh.prototype);