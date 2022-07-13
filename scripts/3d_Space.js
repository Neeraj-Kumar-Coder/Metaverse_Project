// Importing required modules
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

// Renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Orbit controller
const orbit = new OrbitControls(camera, renderer.domElement);

// Ambient light source
const ambientLight = new THREE.AmbientLight(0XFFFFFF, 0.5);
scene.add(ambientLight);

// Directional light source
const directionalLight = new THREE.DirectionalLight(0XFFFFFF, 1);
directionalLight.position.set(-10, 10, 10);
scene.add(directionalLight);

// Directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Axes helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

camera.position.set(1, 5, 5);
orbit.update();

// Textures of the ground
const marbelBaseColor = textureLoader.load("../textures/ground/Marble_Tiles_001_basecolor.jpg");
marbelBaseColor.wrapS = THREE.RepeatWrapping;
marbelBaseColor.wrapT = THREE.RepeatWrapping;
marbelBaseColor.repeat.set(5, 5);
const marbelNormalMap = textureLoader.load("../textures/ground/Marble_Tiles_001_normal.jpg");
marbelNormalMap.wrapS = THREE.RepeatWrapping;
marbelNormalMap.wrapT = THREE.RepeatWrapping;
marbelNormalMap.repeat.set(5, 5);
const marbelHeightMap = textureLoader.load("../textures/ground/Marble_Tiles_001_height.png");
marbelHeightMap.wrapS = THREE.RepeatWrapping;
marbelHeightMap.wrapT = THREE.RepeatWrapping;
marbelHeightMap.repeat.set(5, 5);
const marbelRoughnessMap = textureLoader.load("../textures/ground/Marble_Tiles_001_roughness.jpg");
marbelRoughnessMap.wrapS = THREE.RepeatWrapping;
marbelRoughnessMap.wrapT = THREE.RepeatWrapping;
marbelRoughnessMap.repeat.set(5, 5);
const marbelAmbientOcclusionMap = textureLoader.load("../textures/ground/Marble_Tiles_001_ambientOcclusion.jpg");
marbelAmbientOcclusionMap.wrapS = THREE.RepeatWrapping;
marbelAmbientOcclusionMap.wrapT = THREE.RepeatWrapping;
marbelAmbientOcclusionMap.repeat.set(5, 5);

// Ground of the mall
const groundHeight = 10;
const groundWidth = 10;
const widthSegment = 512;
const heightSegment = 512;
const groundGeometry = new THREE.PlaneGeometry(groundWidth, groundHeight, widthSegment, heightSegment);
const groundMaterial = new THREE.MeshStandardMaterial({
    map: marbelBaseColor,
    normalMap: marbelNormalMap,
    displacementMap: marbelHeightMap,
    displacementScale: 0.005,
    roughnessMap: marbelRoughnessMap,
    roughness: 0.1,
    aoMap: marbelAmbientOcclusionMap,
    side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.geometry.attributes.uv2 = ground.geometry.attributes.uv;
ground.rotation.x = Math.PI / 2;
scene.add(ground);


// Rendering the 3d space
function animate(time) {
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);