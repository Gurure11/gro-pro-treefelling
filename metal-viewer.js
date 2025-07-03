// File: metal-viewer.js
let scene, camera, renderer, loader, currentModel;
const modelPaths = {
  copper: 'models/copper.glb',
  gold: 'models/gold.glb',
};

initViewer();
loadMetal('copper'); // Load default model

function initViewer() {
  const container = document.getElementById('metalViewerContainer');

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, 500 / 400, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(500, 400);
  container.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Loader
  loader = new THREE.GLTFLoader();

  animate();
}

function loadMetal(type) {
  if (currentModel) {
    scene.remove(currentModel);
  }

  loader.load(modelPaths[type], function (gltf) {
    currentModel = gltf.scene;
    scene.add(currentModel);
  }, undefined, function (error) {
    console.error('Error loading model:', error);
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (currentModel) currentModel.rotation.y += 0.01;
  renderer.render(scene, camera);
}
