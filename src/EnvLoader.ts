// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// import {
//   Color,
//   MeshPhysicalMaterial,
//   PMREMGenerator,
//   SphereBufferGeometry,
//   Mesh,
// } from "three";

// let hdrCubeRenderTarget = null;
// let pmremGenerator = new PMREMGenerator(renderer);

// new RGBELoader()
//   .setDataType(THREE.UnsignedByteType)
//   .setPath("textures/equirectangular/")
//   .load("pedestrian_overpass_1k.hdr", function (hdrEquirect) {
//     hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
//     hdrEquirect.dispose();
//     pmremGenerator.dispose();

//     // Materials

//     const cubeWidth = 400;
//     const numberOfSphersPerSide = 5;
//     const sphereRadius = (cubeWidth / numberOfSphersPerSide) * 0.8 * 0.5;
//     const stepSize = 1.0 / numberOfSphersPerSide;

//     var geometry = new SphereBufferGeometry(sphereRadius, 32, 16);

//     var index = 0;

//     for (var alpha = 0; alpha <= 1.0; alpha += stepSize) {
//       for (var beta = 0; beta <= 1.0; beta += stepSize) {
//         for (var gamma = 0; gamma <= 1.0; gamma += stepSize) {
//           var diffuseColor = new Color().setHSL(alpha, 0.5, 0.25);

//           var material = new MeshPhysicalMaterial({
//             color: diffuseColor,
//             metalness: 0,
//             roughness: 0.5,
//             clearcoat: 1.0 - alpha,
//             clearcoatRoughness: 1.0 - beta,
//             reflectivity: 1.0 - gamma,
//             envMap: index % 2 == 1 ? hdrCubeRenderTarget.texture : null,
//           });

//           index++;

//           var mesh = new Mesh(geometry, material);

//           mesh.position.x = alpha * 400 - 200;
//           mesh.position.y = beta * 400 - 200;
//           mesh.position.z = gamma * 400 - 200;

//           scene.add(mesh);
//         }
//         index++;
//       }
//       index++;
//     }

//     scene.background = hdrCubeRenderTarget.texture;
//   });
