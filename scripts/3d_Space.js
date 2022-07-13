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
function getTexture(path, repeatX, repeatY) {
    let texture = textureLoader.load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    return texture;
}
let marbelBaseColor = getTexture("../textures/ground/Wood_Floor_012_basecolor.jpg", 5, 5);
let marbelNormalMap = getTexture("../textures/ground/Wood_Floor_012_normal.jpg", 5, 5);
let marbelHeightMap = getTexture("../textures/ground/Wood_Floor_012_height.png", 5, 5);
let marbelRoughnessMap = getTexture("../textures/ground/Wood_Floor_012_roughness.jpg", 5, 5);
let marbelAmbientOcclusionMap = getTexture("../textures/ground/Wood_Floor_012_ambientOcclusion.jpg", 5, 5);

// Ground of the mall
let groundHeight = 150;
let groundWidth = 100;
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
let tileBaseColor = getTexture("../textures/wall/Wood_Wall_003_basecolor.jpg", groundWidth / 10, 1);
let tileNormalMap = getTexture("../textures/wall/Wood_Wall_003_normal.jpg", groundWidth / 10, 1);
let tileHeightMap = getTexture("../textures/wall/Wood_Wall_003_height.png", groundWidth / 10, 1);
let tileRoughnessMap = getTexture("../textures/wall/Wood_Wall_003_roughness.jpg", groundWidth / 10, 1);
let tileAmbientOcclusionMap = getTexture("../textures/wall/Wood_Wall_003_ambientOcclusion.jpg", groundWidth / 10, 1);

// Wall of the mall
let wallWidth = groundWidth;
let wallHeight = 15;
let wallDepth = 3;
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
let shelfWidth = groundHeight / 2;
let shelfHeight = 10;
let shelfDepth = 0.2;
let shelfWidthSegments = 1;
let shelfHeightSegments = 1;
let shelfDepthSegments = 1;
let shelfGeometry = new THREE.BoxGeometry(shelfWidth, shelfHeight, shelfDepth, shelfWidthSegments, shelfHeightSegments, shelfDepthSegments);
let shelfMaterial = new THREE.MeshStandardMaterial({ color: 0XD6C9BE });
let shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
shelf.position.set(0, shelfHeight / 2, 0);
shelf.geometry.attributes.uv2 = shelf.geometry.attributes.uv;
shelf.rotation.set(0, Math.PI / 2, 0);
scene.add(shelf);

let plankWidth = shelfWidth;
let plankHeight = 7;
let plankDepth = 0.2;
let plankWidthSegments = 1;
let plankHeightSegments = 1;
let plankDepthSegments = 1;
let plankGeometry = new THREE.BoxGeometry(plankWidth, plankHeight, plankDepth, plankWidthSegments, plankHeightSegments, plankDepthSegments);
let plankMaterial = new THREE.MeshStandardMaterial({ color: 0XFFFFFF });

let plank_1 = new THREE.Mesh(plankGeometry, plankMaterial);
plank_1.rotation.set(Math.PI / 2, 0, Math.PI / 2);
scene.add(plank_1)

let plank_2 = new THREE.Mesh(plankGeometry, plankMaterial);
plank_2.position.set(0, 4 * shelfHeight / 4, 0);
plank_2.rotation.set(Math.PI / 2, 0, Math.PI / 2);
scene.add(plank_2);

let plank_3 = new THREE.Mesh(plankGeometry, plankMaterial);
plank_3.position.set(0, 1 * shelfHeight / 4, 0);
plank_3.rotation.set(Math.PI / 2, 0, Math.PI / 2);
scene.add(plank_3);

let plank_4 = new THREE.Mesh(plankGeometry, plankMaterial);
plank_4.position.set(0, 2 * shelfHeight / 4, 0);
plank_4.rotation.set(Math.PI / 2, 0, Math.PI / 2);
scene.add(plank_4);

let plank_5 = new THREE.Mesh(plankGeometry, plankMaterial);
plank_5.position.set(0, 3 * shelfHeight / 4, 0);
plank_5.rotation.set(Math.PI / 2, 0, Math.PI / 2);
scene.add(plank_5);

// Planks on the boundary wall
function createWallPlank(configuration) {
    let wallPlank = new THREE.Mesh(plankGeometry, plankMaterial);
    wallPlank.geometry.dispose();
    wallPlank.geometry = new THREE.BoxGeometry(configuration.width, configuration.height, configuration.depth, configuration.widthSegment, configuration.heightSegment, configuration.depthSegment);
    wallPlank.rotation.set(configuration.rotationX, configuration.rotationY, configuration.rotationZ);
    wallPlank.position.set(configuration.positionX, configuration.positionY, configuration.positionZ);
    return wallPlank;
}

let config_1 = {
    width: groundWidth,
    height: plankHeight,
    depth: plankDepth,
    widthSegment: plankWidthSegments,
    heightSegment: plankHeightSegments,
    depthSegment: plankDepthSegments,
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0,
    positionY: 0,
    positionZ: -groundHeight / 2 + plankHeight / 2
};

for (let i = 0; i < 5; i++) {
    scene.add(createWallPlank(config_1));
    config_1.positionY += shelfHeight / 4;
}

let config_2 = {
    width: groundHeight - 50,
    height: plankHeight,
    depth: plankDepth,
    widthSegment: plankWidthSegments,
    heightSegment: plankHeightSegments,
    depthSegment: plankDepthSegments,
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: Math.PI / 2,
    positionX: groundWidth / 2 - plankHeight / 2,
    positionY: 0,
    positionZ: -groundHeight / 2 + (groundHeight - 50) / 2,
}

for (let i = 0; i < 5; i++) {
    scene.add(createWallPlank(config_2));
    config_2.positionY += shelfHeight / 4;
}

config_2.positionX = -groundWidth / 2 + plankHeight / 2;
config_2.positionY = 0;

for (let i = 0; i < 5; i++) {
    scene.add(createWallPlank(config_2));
    config_2.positionY += shelfHeight / 4;
}

// Checkout counter
let counterWidth = 50;
let counterHeight = 7;
let counterDepth = 10;
let counterWidthSegment = 1;
let counterHeightSegment = 1;
let counterDepthSegment = 1;
let counterGeometery = new THREE.BoxGeometry(counterWidth, counterHeight, counterDepth, counterWidthSegment, counterHeightSegment, counterDepthSegment);
let counterMaterial = new THREE.MeshStandardMaterial({ color: 0XFFFFFF });
let counter = new THREE.Mesh(counterGeometery, counterMaterial);
counter.position.set(0, counterHeight / 2, groundHeight / 2 - counterDepth / 2);
scene.add(counter);


// Rendering the 3d space
function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);