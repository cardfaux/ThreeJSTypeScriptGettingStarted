import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';

// THE SCENE tree like structure of meshes lights groups 3d positions cameras
const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// THE CAMERA draws scene within the frustum dimensions onto a 3d canvas
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
	75, // FIELD OF VIEW default 50
	window.innerWidth / window.innerHeight, // ASPECT RATIO default 1
	0.1, // NEAR PLANE default is 0.1
	1000 // FAR PLANE default 2000
);

// THE RENDERER extension of the html canvas
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Dynamically drawing the canvas to the html document
document.body.appendChild(renderer.domElement);

// THE CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// THE GEOMETRY AND MATERIAL
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});

// THE CUBE CONTAINING THE GEOMETRY AND MATERIAL
const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
// ADDED THE CUBE TO THE SCENE
scene.add(cube);

// POSITIONING THE CAMERA ON THE ZED AXIS
camera.position.z = 2;

// THE CODE FOR DIFFERENT SIZE WINDOWS START
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}
// THE CODE FOR DIFFERENT SIZE WINDOWS END

// THE FUNCTION TO ANIMATE START
var animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	controls.update();

	render();
};
// THE FUNCTION TO ANIMATE END

// THE FUNCTION TO RENDER START
function render() {
	renderer.render(scene, camera);
}
animate();
// THE FUNCTION TO RENDER END
