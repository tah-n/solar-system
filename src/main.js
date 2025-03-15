import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//initialize the scene
const scene = new THREE.Scene();
scene.fog = false;



//textures 
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');


const sunTexture = textureLoader.load('textures/2k_sun.jpg');
const earthTexture = textureLoader.load('textures/2k_earth_daymap.jpg');
const moonTexture = textureLoader.load('textures/2k_moon.jpg');
const marsTexture = textureLoader.load('textures/2k_mars.jpg');
const venusTexture = textureLoader.load('/textures/2k_venus_surface.jpg');
const mercuryTexture = textureLoader.load('/textures/2k_mercury.jpg');
const jupiterTexture = textureLoader.load('/textures/jupitermap.jpg');
const saturnTexture = textureLoader.load('/textures/2k_saturn.jpg');
const uranusTexture = textureLoader.load('/textures/2k_uranus.jpg');
const neptuneTexture = textureLoader.load('/textures/2k_neptune.jpg');
const ringtexture = textureLoader.load('/textures/2k_saturn_ring_alpha.png')

const backgroundCubeMap = cubeTextureLoader.load([
        'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
])

scene.background = backgroundCubeMap;

//materials 
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const ringMaterial = new THREE.MeshStandardMaterial({
  map: ringtexture,
  side: THREE.DoubleSide
})



//sun
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture 
});
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

//saturn ring
const ringGeometry = new THREE.RingGeometry( 1.5, 2.2, 32 );


//planets array
const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      }
    ]
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 1,
        speed: 0.02,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 2,
    distance: 30,
    speed: 0.0024,
    material: jupiterMaterial,
    moons: [
      {
        name: 'Ganymede',
        radius: 0.4,
        distance: 2,
        speed: 0.015,
      }
    ]
  },
  {
    name: 'Saturn',
    radius: 1.7,
    distance: 42,
    speed: 0.0025,
    material: saturnMaterial,
    moons: [
      {
        name: 'Titan',
        radius: 0.2,
        distance: 4,
        speed: 0.015,
      },
      {
        name: 'ring',
        radius: 0.4,
        distance: 0,
        speed: 0,
      }
    ]
  },
  {
    name: 'Uranus',
    radius: 1.7,
    distance: 50,
    speed: 0.002,
    material: uranusMaterial,
    moons: [
      {
        name: 'Miranda',
        radius: 0.4,
        distance: 3,
        speed: 0.015,
      }
    ]
  },
  {
    name: 'Neptune',
    radius: 1.7,
    distance: 58,
    speed: 0.001,
    material: neptuneMaterial,
    moons: [
      {
        name: 'Triton',
        radius: 0.4,
        distance: 3,
        speed: 0.015,
      }
    ]
  },

];

const planetMeshes = planets.map((planet, i) => {
  //create the Mesh
  const mesh = new THREE.Mesh(sphereGeometry,planet.material);
  mesh.scale.setScalar(planet.radius);
  mesh.position.x = planet.distance;
  //add it to scene
  scene.add(mesh);
  //loop through eaach moon and create the moons
    planet.moons.forEach((moon) => {
      const newMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
      newMesh.scale.setScalar(moon.radius);
      newMesh.position.x = moon.distance;
      if(moon.name === 'ring') {
        newMesh.geometry = ringGeometry;
        newMesh.material = ringMaterial;
        newMesh.rotation.x = -(Math.PI * 0.4);
        mesh.add(newMesh);
      }
      mesh.add(newMesh)
    })

    return mesh;
})

//setting up camera
const aspectRatio = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 400)
camera.position.z = 40;

//initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.1);//light that is even everywhere
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 150, 100);
pointLight.position.set(0,0,0);

scene.add(pointLight)

const canvas = document.querySelector('.threejs');

//initialize renderer
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio);


// initialized the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})


const renderLoop = () => {

  sun.rotation.y += 0.001;

  planetMeshes.forEach((planet, i) => {
    planet.rotation.y += planets[i].speed ;
    planet.position.x = Math.sin(planet.rotation.y) * planets[i].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[i].distance;
    planet.children.forEach((moon, index) => {
      if(moon.name !== 'ring') {
        moon.rotation.y += planets[i].moons[index].speed;
        moon.position.x = Math.sin(planet.rotation.y) * planets[i].moons[index].distance;
        moon.position.z = Math.cos(planet.rotation.y) * planets[i].moons[index].distance;
      }
      
    })
  })


  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();

