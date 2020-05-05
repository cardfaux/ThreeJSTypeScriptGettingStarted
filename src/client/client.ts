import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';

// THE SCENE
const scene: THREE.Scene = new THREE.Scene();

// THE CAMERA
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// THE RENDERER
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
