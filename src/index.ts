import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  AmbientLight,
  PointLight,
  Color,
  ACESFilmicToneMapping,
  UnsignedByteType,
  PMREMGenerator,
  PlaneBufferGeometry,
  CubeTextureLoader,
} from "three";
import { Stats } from "three-stats";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";

class Main {
  scene: Scene = new Scene();
  stats = new Stats();
  camera: PerspectiveCamera = new PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer: WebGLRenderer = new WebGLRenderer({
    canvas: <HTMLCanvasElement>document.getElementById("myCanvas"),
    antialias: true,
  });

  material: MeshBasicMaterial = new MeshBasicMaterial({
    color: 0x00f900,
    wireframe: true,
  });
  materialPhong: MeshPhongMaterial = new MeshPhongMaterial({ color: 0x0000ff });

  flowerMesh: Mesh;

  pointLight: PointLight;
  controls: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );

  constructor() {
    this.configurePointLight();

    this.scene.add(this.pointLight);
    this.scene.add(new AmbientLight(new Color(0.2, 0.2, 0.2).getHex()));

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    //configure Camera
    this.configureCamera();
    //Load model
    this.loadModelGLTF();

    //Configure controls
    this.configureControls();

    const cubeTextureLoader2 = new CubeTextureLoader();
    cubeTextureLoader2.setPath("assets/forrest2/");

    const cubeTexture2 = cubeTextureLoader2.load([
      "px.png",
      "nx.png",
      "py.png",
      "ny.png",
      "pz.png",
      "nz.png",
    ]);

    this.scene.background = cubeTexture2;
    document.body.appendChild(this.stats.dom);
  }

  configureControls() {
    this.controls.addEventListener("change", this.render);
    this.controls.minDistance = 1;
    this.controls.maxDistance = 10;
    this.controls.enablePan = false;
  }

  loadModelGLTF() {
    let gltfLoader = new GLTFLoader();
    gltfLoader.load("assets/scene.gltf", (gltf) => {
      this.flowerMesh = <Mesh>gltf.scene.children[0];
      this.flowerMesh.position.x = 0;
      this.flowerMesh.position.y = -0.5;
      this.flowerMesh.position.z = 0;

      this.scene.add(this.flowerMesh);
    });
  }

  configurePointLight() {
    this.pointLight = new PointLight();
    this.pointLight.position.set(5, 5, 5);
    this.pointLight.intensity = 3;
  }

  configureCamera() {
    this.camera.position.z = 1;
    this.camera.lookAt(0, 0, 0);
  }

  render() {
    this.stats.begin();

    //While not loaded
    // if (this.monkeyMesh) {
    //   this.monkeyMesh.rotation.y -= 0.01;
    // }
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
    requestAnimationFrame(() => this.render());
  }

  start() {
    this.render();
  }
}

const main = new Main();
main.start();
