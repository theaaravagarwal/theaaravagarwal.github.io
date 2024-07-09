import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Vertex Shader
const vertexShader = `
    uniform float size;
    attribute float alpha;
    attribute vec3 customColor;
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        vAlpha = alpha;
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

// Fragment Shader
const fragmentShader = `
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, vAlpha);
    }
`;

/**
 * Global utils
 */
(function() {

    var _w = window,
        _s = window.screen,
        _b = document.body,
        _d = document.documentElement;

    window.Utils = {

        // screen info
        screen: function() {
            var width  = Math.max( 0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0 );
            var height = Math.max( 0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0 );
            
            return {
                width   : width,
                height  : height,
                centerx : width / 2,
                centery : height / 2,
                ratio   : width / height,
            };
        },
        // mouse info
        mouse: function( e ) {
            var x = Math.max( 0, e.pageX || e.clientX || 0 );
            var y = Math.max( 0, e.pageY || e.clientY || 0 );
            var s = this.screen();
            
            return {
                x : x,
                y : y,
                centerx : ( x - s.centerx ),
                centery : ( y - s.centery ),
            };
        },
    };
})();

/**
 * Firework object
 */
(function() {
    // constructor
    var Firework = function(scene) {
        this.scene = scene;
        this.done = false;
        this.dest = [];
        this.colors = [];
        this.geometry = null;
        this.points = null;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                size: { value: Math.max(Math.random()*40) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthTest: false,
            vertexColors: true
        });
        this.launch();
        this.startTime = Date.now(); // Track start time for fading effect
        this.lifespan = 4500; // Lifespan of each firework in milliseconds (5 seconds)
        this.exploded = false; // Flag to track if firework has exploded
    };

    // prototype
    Firework.prototype = {
        constructor: Firework,

        // reset
        reset: function() {
            this.scene.remove(this.points);
            this.dest = [];
            this.colors = [];
            this.geometry = null;
            this.points = null;
            this.exploded = false; // Reset exploded state
        },

        // launch
        launch: function() {
            var s = Utils.screen();
            var x = Math.floor(Math.random() * (s.width * 2)) - s.width;
            var y = Math.floor(Math.random() * 701) + 100;
            var z = Math.floor(Math.random() * -2001) - 1000;

            var from = new THREE.Vector3(x, -800, z);
            var to = new THREE.Vector3(x, y, z);

            var color = new THREE.Color();
            color.setHSL(Math.random() * 0.8 + 0.1, 1, 0.9);
            this.colors.push(color);

            this.geometry = new THREE.BufferGeometry();
            this.points = new THREE.Points(this.geometry, this.material);

            const positions = new Float32Array(3);
            const colors = new Float32Array(3);
            const alphas = new Float32Array(1);

            positions[0] = from.x;
            positions[1] = from.y;
            positions[2] = from.z;
            colors[0] = color.r;
            colors[1] = color.g;
            colors[2] = color.b;
            alphas[0] = 1.0;

            this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            this.geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            this.geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

            this.dest.push(to);
            this.scene.add(this.points);

            // Shorten the delay before explosion
            setTimeout(() => {
                this.explode(new THREE.Vector3(positions[0], positions[1], positions[2]));
            }, Math.round(Math.random()*2000)); // Reduce this delay as needed
        },


        // explode
        explode: function(vector) {
            if (this.exploded) return; // Ensure explosion only happens once
            this.exploded = true;

            this.scene.remove(this.points);
            this.dest = [];
            this.colors = [];
            this.geometry = new THREE.BufferGeometry();
            this.points = new THREE.Points(this.geometry, this.material);

            const positions = new Float32Array(80 * 3);
            const colors = new Float32Array(80 * 3);
            const alphas = new Float32Array(80);

            var color = new THREE.Color(); // Generate a single color for the entire explosion
            color.setHSL(Math.random() * 0.9 + 0.1, 1.5, 0.5); // Example: random hue, full saturation, medium lightness

            for (var i = 0; i < 80; i++) {
                // Use the same color for every particle in this explosion
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;

                var from = new THREE.Vector3(
                    Math.random() * 10 - 5 + vector.x,
                    Math.random() * 10 - 5 + vector.y,
                    Math.random() * 10 - 5 + vector.z
                );
                var to = new THREE.Vector3(
                    Math.random() * 1001 - 500 + vector.x,
                    Math.random() * 1001 - 500 + vector.y,
                    Math.random() * 1001 - 500 + vector.z
                );
                positions[i * 3] = from.x;
                positions[i * 3 + 1] = from.y;
                positions[i * 3 + 2] = from.z;
                alphas[i] = 1.0;
                this.dest.push(to);
            }

            this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            this.geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            this.geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

            this.scene.add(this.points);
        },

        // update
        update: function() {
            // only if objects exist
            if (this.points && this.geometry) {
                var positions = this.geometry.attributes.position.array;
                var total = positions.length / 3;

                // If not exploded, continue launching up
                if (!this.exploded) {
                    for (var i = 0; i < total; i++) {
                        positions[i * 3] += (this.dest[i].x - positions[i * 3]) / 20;
                        positions[i * 3 + 1] += (this.dest[i].y - positions[i * 3 + 1]) / 20;
                        positions[i * 3 + 2] += (this.dest[i].z - positions[i * 3 + 2]) / 20;

                        // Check if firework has reached destination
                        if (Math.abs(positions[i * 3] - this.dest[i].x) < 1 &&
                            Math.abs(positions[i * 3 + 1] - this.dest[i].y) < 1 &&
                            Math.abs(positions[i * 3 + 2] - this.dest[i].z) < 1) {
                            this.explode(new THREE.Vector3(positions[0], positions[1], positions[2]));
                            return;
                        }
                    }
                } else {
                    // Handle explosion effect
                    var elapsedTime = Date.now() - this.startTime;
                    var progress = 1 - (elapsedTime / this.lifespan);

                    for (var i = 0; i < total; i++) {
                        positions[i * 3] += (this.dest[i].x - positions[i * 3]) / 40;
                        positions[i * 3 + 1] += (this.dest[i].y - positions[i * 3 + 1]) / 40;
                        positions[i * 3 + 2] += (this.dest[i].z - positions[i * 3 + 2]) / 40;
                        this.geometry.attributes.alpha.array[i] = Math.max(0, progress);
                    }
                    this.geometry.attributes.alpha.needsUpdate = true;
                }

                this.geometry.attributes.position.needsUpdate = true;

                // Remove, reset, and stop animating
                if (this.material.uniforms.size.value <= 0) {
                    this.reset();
                    this.done = true;
                    return;
                }
            }
        },
    };

    // export
    window.Firework = Firework;
})();


/**
 * Stage setup
 */
(function() {

    var screen    = Utils.screen(),
        renderer  = null,
        camera    = null,
        scene     = null,
        to        = { px: 0, py: 0, pz: 500 },
        fireworks = [];

    try {
        renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
        camera   = new THREE.PerspectiveCamera( 60, screen.ratio, 0.1, 20000 );
        scene    = new THREE.Scene();
    }
    catch( e ) {
        alert( "THREE.JS Error: " + e.toString() );
        return;
    }

    // on screen resize
    function onResize( e ) {
        var s = Utils.screen();
        renderer.setSize( s.width, s.height );
        camera.aspect = s.ratio;
        camera.updateProjectionMatrix();
    };

    // on mouse move
    // on mouse move and scroll wheel
    function onMouse(e) {
        var mouse = Utils.mouse(e);
        to.px = (mouse.centerx * 0.95);
        to.py = -(mouse.centery * 0.95);
    
        // Handle scroll wheel zoom
        var delta = 0;
        if (e.type === 'wheel') {
            delta = e.deltaY > 0 ? 1 : -1; // Modern browsers
        } else if (e.type === 'DOMMouseScroll') {
            delta = e.detail > 0 ? 1 : -1; // Firefox
        }
        to.pz += delta * 100; // Adjust the zoom speed as needed
    };


    // on click/tap
    function onPress( e ) {
        fireworks.push( new Firework( scene ) );
    };

    // setup stage
    function setup() {
        camera.position.set( 0, 0, 0 );
        camera.rotation.set( 0, 0, 0 );

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor( 0x000000, 1);
        renderer.sortObjects = true;
        renderer.domElement.style["display"]  = "block";
        renderer.domElement.style["position"] = "fixed";
        renderer.domElement.style["width"]    = "100%";
        renderer.domElement.style["height"]   = "100%";
        renderer.domElement.style["z-index"]  = "-1";

        // Setup event listeners
        window.addEventListener("resize", onResize, false);
        window.addEventListener("mousemove", onMouse, false);
        window.addEventListener("mousedown", onPress, false);
        window.addEventListener("touchstart", onPress, false);
        window.addEventListener("wheel", onMouse, false); // For modern browsers
        window.addEventListener("DOMMouseScroll", onMouse, false); // For Firefox


        document.body.appendChild( renderer.domElement );
    };

    // animation loop
    function draw() {
        requestAnimationFrame( draw );

        // add fireworks
        if( Math.floor(Math.random() * 26) === 10 ) {
            fireworks.push( new Firework( scene ) );
        }
        // update fireworks
        for( var i = 0; i < fireworks.length; i++ ) {
            if( fireworks[ i ].done ) {
                fireworks.splice( i, 1 );
                continue;
            }
            fireworks[ i ].update();
        }

        // lerp camera position
        camera.position.x += ( to.px - camera.position.x ) / 40;
        camera.position.y += ( to.py - camera.position.y ) / 40;
        camera.position.z += ( to.pz - camera.position.z ) / 40;

        // render
        renderer.render( scene, camera );
    };

    // run
    onResize();
    setup();
    draw();
})();