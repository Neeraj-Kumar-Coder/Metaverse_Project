// Importing required modules
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

// Renderer
let renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture loader
let textureLoader = new THREE.TextureLoader();

// Scene
let scene = new THREE.Scene();

// Camera
let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Orbit controller
let orbit = new OrbitControls(camera, renderer.domElement);

// Ambient light source
let ambientLight = new THREE.AmbientLight(0XFFFFFF, 0.5);
scene.add(ambientLight);

// Directional light source
let directionalLight = new THREE.DirectionalLight(0XFFFFFF, 1);
directionalLight.position.set(-10, 10, 10);
scene.add(directionalLight);

// Directional light helper
let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Axes helper
let axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

camera.position.set(1, 5, 5);
orbit.update();

// Textures of the ground
let marbelBaseColor = textureLoader.load("../textures/ground/Wood_Floor_012_basecolor.jpg");
marbelBaseColor.wrapS = THREE.RepeatWrapping;
marbelBaseColor.wrapT = THREE.RepeatWrapping;
marbelBaseColor.repeat.set(5, 5);
let marbelNormalMap = textureLoader.load("../textures/ground/Wood_Floor_012_normal.jpg");
marbelNormalMap.wrapS = THREE.RepeatWrapping;
marbelNormalMap.wrapT = THREE.RepeatWrapping;
marbelNormalMap.repeat.set(5, 5);
let marbelHeightMap = textureLoader.load("../textures/ground/Wood_Floor_012_height.png");
marbelHeightMap.wrapS = THREE.RepeatWrapping;
marbelHeightMap.wrapT = THREE.RepeatWrapping;
marbelHeightMap.repeat.set(5, 5);
let marbelRoughnessMap = textureLoader.load("../textures/ground/Wood_Floor_012_roughness.jpg");
marbelRoughnessMap.wrapS = THREE.RepeatWrapping;
marbelRoughnessMap.wrapT = THREE.RepeatWrapping;
marbelRoughnessMap.repeat.set(5, 5);
let marbelAmbientOcclusionMap = textureLoader.load("../textures/ground/Wood_Floor_012_ambientOcclusion.jpg");
marbelAmbientOcclusionMap.wrapS = THREE.RepeatWrapping;
marbelAmbientOcclusionMap.wrapT = THREE.RepeatWrapping;
marbelAmbientOcclusionMap.repeat.set(5, 5);

// Ground of the mall
let groundHeight = 500;
let groundWidth = 300;
let widthSegment = 512;
let heightSegment = 512;
let groundGeometry = new THREE.PlaneGeometry(groundWidth, groundHeight, widthSegment, heightSegment);
let groundMaterial = new THREE.MeshStandardMaterial({
    map: marbelBaseColor,
    normalMap: marbelNormalMap,
    displacementMap: marbelHeightMap,
    displacementScale: 0.01,
    roughnessMap: marbelRoughnessMap,
    roughness: 0.1,
    aoMap: marbelAmbientOcclusionMap,
    side: THREE.DoubleSide
});
let ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.geometry.attributes.uv2 = ground.geometry.attributes.uv;
ground.rotation.x = Math.PI / 2;
scene.add(ground);

// Texture of the wall
let tileBaseColor = textureLoader.load("../textures/wall/Wood_Wall_003_basecolor.jpg");
tileBaseColor.wrapS = THREE.RepeatWrapping;
tileBaseColor.wrapT = THREE.RepeatWrapping;
tileBaseColor.repeat.set(groundWidth / 10, 1);
let tileNormalMap = textureLoader.load("../textures/wall/Wood_Wall_003_normal.jpg");
tileNormalMap.wrapS = THREE.RepeatWrapping;
tileNormalMap.wrapT = THREE.RepeatWrapping;
tileNormalMap.repeat.set(groundWidth / 10, 1);
let tileHeightMap = textureLoader.load("../textures/wall/Wood_Wall_003_height.png");
tileHeightMap.wrapS = THREE.RepeatWrapping;
tileHeightMap.wrapT = THREE.RepeatWrapping;
tileHeightMap.repeat.set(groundWidth / 10, 1);
let tileRoughnessMap = textureLoader.load("../textures/wall/Wood_Wall_003_roughness.jpg");
tileRoughnessMap.wrapS = THREE.RepeatWrapping;
tileRoughnessMap.wrapT = THREE.RepeatWrapping;
tileRoughnessMap.repeat.set(groundWidth / 10, 1);
let tileAmbientOcclusionMap = textureLoader.load("../textures/wall/Wood_Wall_003_ambientOcclusion.jpg");
tileAmbientOcclusionMap.wrapS = THREE.RepeatWrapping;
tileAmbientOcclusionMap.wrapT = THREE.RepeatWrapping;
tileAmbientOcclusionMap.repeat.set(groundWidth / 10, 1);

// Wall of the mall
let wallWidth = groundWidth;
let wallHeight = 15;
let wallDepth = 0.3;
let wallWidthSegment = 512;
let wallHeightSegment = 512;
let wallDepthSegment = 512;
let wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth, wallWidthSegment, wallHeightSegment, wallDepthSegment);
let wallMaterial = new THREE.MeshStandardMaterial({
    map: tileBaseColor,
    normalMap: tileNormalMap,
    displacementMap: tileHeightMap,
    displacementScale: 0.01,
    roughnessMap: tileRoughnessMap,
    roughness: 0.1,
    aoMap: tileAmbientOcclusionMap
});

let wall_1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall_1.geometry.attributes.uv2 = wall_1.geometry.attributes.uv;
wall_1.position.set(0, wallHeight / 2, -groundHeight / 2 + wallDepth / 2);
scene.add(wall_1);

let wall_2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall_2.geometry.attributes.uv2 = wall_2.geometry.attributes.uv;
wall_2.position.set(0, wallHeight / 2, groundHeight / 2 - wallDepth / 2);
scene.add(wall_2);

let wall_3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall_3.geometry.dispose();
wallWidth = groundHeight;
wall_3.geometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth, wallWidthSegment, wallHeightSegment, wallDepthSegment);
wall_3.rotation.y = Math.PI / 2;
wall_3.geometry.attributes.uv2 = wall_3.geometry.attributes.uv;
wall_3.position.set(groundWidth / 2 - wallDepth / 2, wallHeight / 2, 0);
scene.add(wall_3);

let wall_4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall_4.geometry.dispose();
wallWidth = groundHeight;
wall_4.geometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth, wallWidthSegment, wallHeightSegment, wallDepthSegment);
wall_4.rotation.y = Math.PI / 2;
wall_4.geometry.attributes.uv2 = wall_4.geometry.attributes.uv;
wall_4.position.set(-groundWidth / 2 + wallDepth / 2, wallHeight / 2, 0);
scene.add(wall_4);

// Shelf


// Rendering the 3d space
function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);