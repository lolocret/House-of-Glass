import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { makeTiledTexture } from './textures.js';

function addGlassTitle(scene) {
	const loader = new FontLoader();
	loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
		const geo = new TextGeometry('HOUSE OF GLASS', {
			font,
			size: 0.85,
			height: 0.12,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.01,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 4
		});
		geo.computeBoundingBox();
		const mat = new THREE.MeshPhysicalMaterial({
			color: 0x9fd6ff,
			emissive: 0x0e1824,
			emissiveIntensity: 0.35,
			roughness: 0.03,
			metalness: 0.1,
			transmission: 1.0,
			opacity: 0.98,
			transparent: true,
			clearcoat: 0.85,
			clearcoatRoughness: 0.05,
			ior: 1.5,
			thickness: 0.8,
			reflectivity: 0.8,
			attenuationColor: new THREE.Color(0x8dc3ff),
			attenuationDistance: 6
		});
		const mesh = new THREE.Mesh(geo, mat);
		geo.center();
		mesh.position.set(0, 3.2, -8.5);
		mesh.rotation.x = -0.08;
		scene.add(mesh);
	});
}

export function addEnvironment(scene) {
	const skyGeo = new THREE.SphereGeometry(80, 32, 32);
	const skyMat = new THREE.ShaderMaterial({
		side: THREE.BackSide,
		uniforms: {
			topColor: { value: new THREE.Color(0x142a4d) },
			bottomColor: { value: new THREE.Color(0x0a0f1e) },
			offset: { value: 10 },
			exponent: { value: 1.2 }
		},
		vertexShader: `
			varying vec3 vWorldPosition;
			void main() {
				vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
				vWorldPosition = worldPosition.xyz;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
		`,
		fragmentShader: `
			uniform vec3 topColor;
			uniform vec3 bottomColor;
			uniform float offset;
			uniform float exponent;
			varying vec3 vWorldPosition;
			void main() {
				float h = normalize( vWorldPosition + offset ).y;
				float mixVal = max( pow( max(h, 0.0), exponent ), 0.0 );
				vec3 col = mix( bottomColor, topColor, mixVal );
				gl_FragColor = vec4( col, 1.0 );
			}
		`
	});
	const sky = new THREE.Mesh(skyGeo, skyMat);
	scene.add(sky);

	const groundTex = makeTiledTexture({
		size: 1024,
		repeatU: 18,
		repeatV: 18,
		lineColor: '#3cf5ff',
		bgInner: '#070b16',
		bgOuter: '#0f1325',
		gridSpacing: 1024 / 14
	});
	const ground = new THREE.Mesh(
		new THREE.PlaneGeometry(200, 200),
		new THREE.MeshStandardMaterial({
			color: '#200d23ff',
			map: groundTex,
			roughness: 0.8,
			metalness: 0.4
		})
	);
	ground.rotation.x = -Math.PI / 2;
	ground.position.y = -0.02;
	scene.add(ground);
	addGlassTitle(scene);
}

export function addGlitchOverlay() {
	const div = document.createElement('div');
	div.className = 'glitch';
	div.style.pointerEvents = 'none';
	div.style.mixBlendMode = 'overlay';
	document.body.appendChild(div);
	return div;
}
