import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createParticles(scene, particleCount = 160) {
	const particleGeo = new THREE.BufferGeometry();
	const arr = new Float32Array(particleCount * 3);
	for (let i = 0; i < particleCount; i++) {
		const r = 0.8 + Math.random() * 4.0;
		const theta = Math.random() * Math.PI * 2;
		arr[i * 3] = Math.cos(theta) * r;
		arr[i * 3 + 1] = 0.5 + Math.random() * 2.4;
		arr[i * 3 + 2] = Math.sin(theta) * r;
	}
	particleGeo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
	const mat = new THREE.PointsMaterial({
		color: 0xcff6ff,
		size: 0.035,
		transparent: true,
		opacity: 0.9,
		blending: THREE.AdditiveBlending
	});
	const pts = new THREE.Points(particleGeo, mat);
	scene.add(pts);
	return { particleGeo, particleCount, points: pts };
}

export async function addMoon(scene, interactiveCollector = []) {
	const loader = new GLTFLoader();
	let moonMesh = null;
	let moonMixer = null;
	try {
		const gltf = await loader.loadAsync('./assets/moon.glb');
		const moon = gltf.scene;
		moonMesh = moon;
		moon.traverse((c) => {
			if (c.isMesh) {
				c.castShadow = false;
				c.receiveShadow = false;
			}
			c.userData.type = 'moon';
		});
		moon.userData.type = 'moon';
		moon.scale.setScalar(15);
		moon.position.set(0, 2.4, -2);
		moon.rotation.y = Math.PI / 30;
		scene.add(moon);
		interactiveCollector.push(moon);

		if (gltf.animations && gltf.animations.length) {
			moonMixer = new THREE.AnimationMixer(moon);
			const action = moonMixer.clipAction(gltf.animations[0]);
			action.clampWhenFinished = true;
			action.play();
		}
	} catch (err) {
		console.warn('Moon GLB missing or failed to load:', err);
	}
	return { moonMesh, moonMixer };
}
