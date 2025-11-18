import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function alignMeshToGround(mesh, lift = 0) {
	mesh.updateWorldMatrix(true, true);
	const box = new THREE.Box3().setFromObject(mesh);
	const minY = box.min.y;
	mesh.position.y = mesh.position.y - minY + lift;
}

export function createHumanoid() {
	const g = new THREE.Group();
	const skinMat = new THREE.MeshPhysicalMaterial({
		color: 0xff7abf,
		emissive: 0xff92d0,
		emissiveIntensity: 0.08,
		transmission: 0.4,
		transparent: true,
		roughness: 0.25
	});
	const fabricMat = new THREE.MeshPhysicalMaterial({
		color: 0xffffff,
		roughness: 0.9,
		transmission: 0,
		metalness: 0
	});
	const fluffMat = new THREE.MeshStandardMaterial({
		color: 0xfff2df,
		roughness: 0.95,
		metalness: 0.05
	});

	const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.7, 8, 16), skinMat);
	torso.position.y = 1.05;
	g.add(torso);

	const top = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.18, 32), fabricMat);
	top.position.set(0, 1.33, 0);
	g.add(top);

	const midriff = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.04, 16, 48, Math.PI), fabricMat);
	midriff.rotation.x = Math.PI / 2;
	midriff.position.set(0, 1.22, 0);
	g.add(midriff);

	const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), skinMat);
	head.position.y = 1.8;
	g.add(head);

	const earGeo = new THREE.CapsuleGeometry(0.08, 0.45, 6, 12);
	const earLeft = new THREE.Mesh(earGeo, skinMat);
	earLeft.rotation.x = Math.PI / 16;
	earLeft.position.set(0.15, 2.2, 0);
	g.add(earLeft);
	const earRight = earLeft.clone();
	earRight.position.x = -0.15;
	g.add(earRight);

	const hornGeo = new THREE.ConeGeometry(0.05, 0.2, 16);
	const horn1 = new THREE.Mesh(hornGeo, skinMat);
	horn1.position.set(0.08, 2.05, 0.06);
	g.add(horn1);
	const horn2 = horn1.clone();
	horn2.position.x = -0.08;
	g.add(horn2);

	const hairRing = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.12, 24, 60), fluffMat);
	hairRing.position.set(0, 1.85, 0);
	hairRing.rotation.x = Math.PI / 2.4;
	g.add(hairRing);
	const hairRing2 = hairRing.clone();
	hairRing2.scale.set(0.8, 0.8, 0.8);
	hairRing2.position.y = 1.95;
	g.add(hairRing2);

	const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.2), fluffMat);
	hairBack.position.set(0, 1.8, -0.15);
	g.add(hairBack);

	const armGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.8, 16);
	const armL = new THREE.Mesh(armGeo, skinMat);
	armL.position.set(-0.35, 1.05, 0);
	armL.rotation.z = Math.PI / 7;
	g.add(armL);
	const armR = armL.clone();
	armR.position.x = 0.35;
	armR.rotation.z = -Math.PI / 7;
	g.add(armR);

	const glove = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 16), fabricMat);
	glove.position.set(-0.35, 0.72, 0);
	g.add(glove);
	const gloveR = glove.clone();
	gloveR.position.x = 0.35;
	g.add(gloveR);

	const legGeo = new THREE.CylinderGeometry(0.07, 0.06, 1.0, 18);
	const legL = new THREE.Mesh(legGeo, fabricMat);
	legL.position.set(-0.14, 0.1, 0);
	g.add(legL);
	const legR = legL.clone();
	legR.position.x = 0.15;
	g.add(legR);

	const thighBand = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 16, 32), fabricMat);
	thighBand.rotation.x = Math.PI / 2;
	thighBand.position.set(-0.15, 0.72, 0);
	g.add(thighBand);
	const thighBandR = thighBand.clone();
	thighBandR.position.x = 0.15;
	g.add(thighBandR);

	const bootMat = new THREE.MeshStandardMaterial({ color: 0xffefcc, roughness: 0.95, metalness: 0.05 });
	const bootGeo = new THREE.BoxGeometry(0.32, 0.3, 0.5);
	const bootL = new THREE.Mesh(bootGeo, bootMat);
	bootL.position.set(-0.15, -0.3, 0.1);
	g.add(bootL);
	const bootR = bootL.clone();
	bootR.position.x = 0.15;
	g.add(bootR);

	g.userData.legs = [legL, legR];
	g.userData.arms = [armL, armR];

	return g;
}

export async function createCharacterAvatar(parent, characterOpt, spawnZ = 0) {
	const loader = new GLTFLoader();
	const modelURL = characterOpt?.walk;
	const idleModelURL = characterOpt?.idle;
	let avatar = null;
	try {
		const [gltf, gltfIdle] = await Promise.all([
			loader.loadAsync(modelURL),
			idleModelURL ? loader.loadAsync(idleModelURL).catch(() => null) : Promise.resolve(null)
		]);

		const avatarRoot = new THREE.Group();
		avatarRoot.position.set(0, 0, spawnZ);
		parent.add(avatarRoot);

		const gltfCharacter = gltf.scene;
		gltfCharacter.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = false;
				if (child.material) child.material.transparent = true;
			}
		});
		const box = new THREE.Box3().setFromObject(gltfCharacter);
		const size = new THREE.Vector3();
		box.getSize(size);
		const scaleBase = 2.1 / Math.max(size.x, size.y, size.z);
		const scaleMult = characterOpt?.scaleMultiplier || 1.0;
		const finalScale = scaleBase * scaleMult;
		gltfCharacter.scale.setScalar(finalScale);
		gltfCharacter.rotation.y = characterOpt?.meshYaw || 0;
		gltfCharacter.position.set(0, 0, 0);
		const walkLift = typeof characterOpt?.walkLift === 'number' ? characterOpt.walkLift : -0.1;
		alignMeshToGround(gltfCharacter, walkLift);
		avatarRoot.add(gltfCharacter);

		let gltfCharacterIdle = null;
		if (gltfIdle && gltfIdle.scene) {
			gltfCharacterIdle = gltfIdle.scene;
			gltfCharacterIdle.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = false;
					child.receiveShadow = false;
					if (child.material) child.material.transparent = true;
				}
			});
			gltfCharacterIdle.scale.setScalar(finalScale);
			gltfCharacterIdle.rotation.x = typeof characterOpt?.idleRotationX === 'number' ? characterOpt.idleRotationX : Math.PI / 2;
			gltfCharacterIdle.rotation.y = characterOpt?.meshYaw || 0;
			gltfCharacterIdle.position.set(0, 0, 0);
			const idleLift = typeof characterOpt?.idleLift === 'number' ? characterOpt.idleLift : 0.02;
			alignMeshToGround(gltfCharacterIdle, idleLift);
			gltfCharacterIdle.visible = false;
			avatarRoot.add(gltfCharacterIdle);
		}

		let gltfMixer = null;
		let gltfIdleAction = null;
		let useProceduralSwing = false;
		if (gltf.animations && gltf.animations.length) {
			gltfMixer = new THREE.AnimationMixer(gltfCharacter);
			gltfIdleAction = gltfMixer.clipAction(gltf.animations[0]);
			gltfIdleAction.play();
		} else {
			useProceduralSwing = true;
		}

		avatarRoot.userData = {
			gltfCharacter,
			gltfCharacterIdle,
			gltfMixer,
			gltfIdleAction,
			useProceduralSwing,
			heading: 0
		};
		avatar = avatarRoot;
	} catch (err) {
		console.warn('GLTF model not found or failed to load, using procedural avatar.', err);
		avatar = createHumanoid();
		avatar.position.set(0, 0, spawnZ);
		parent.add(avatar);
	}
	return avatar;
}
