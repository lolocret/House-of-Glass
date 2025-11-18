import * as THREE from 'three';
import { makeCanvasTexture } from './textures.js';

function addHallInstallations(zone) {
	const words = ['TRACE', 'PIRATAGE', 'PHISHING', 'CYBER', 'EMPREINTE', 'NUMERIQUE'];
	for (let i = 0; i < 6; i++) {
		const tex = makeCanvasTexture(words[i], { fontSize: 48, color: '#cfefff' });
		const mat = new THREE.MeshPhysicalMaterial({ map: tex, transmission: 0.5, transparent: true, opacity: 0.8 });
		mat.map.encoding = THREE.sRGBEncoding;
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), mat);
		plane.position.set(i % 2 ? -1.6 : 1.6, 1.4, -1.5 - i * 0.6);
		plane.rotation.y = i % 2 ? 0.25 : -0.25;
		zone.add(plane);
	}
}

function addControlDesk(zone) {
	const base = new THREE.MeshPhysicalMaterial({ color: 0xf7f9ff, transmission: 0.6, transparent: true, opacity: 0.9 });
	const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 1.2), base);
	desk.position.set(0, 0.4, 0);
	zone.add(desk);
	const holo = new THREE.Mesh(
		new THREE.BoxGeometry(2.6, 0.08, 0.8),
		new THREE.MeshStandardMaterial({ color: 0x9fe8ff, emissive: 0x7fd8ff, transparent: true, opacity: 0.8 })
	);
	holo.position.set(0, 0.9, 0);
	zone.add(holo);
	const chair = new THREE.Mesh(
		new THREE.CylinderGeometry(0.18, 0.22, 0.65, 24),
		new THREE.MeshPhysicalMaterial({ color: 0xeef9ff, transmission: 0.5, transparent: true })
	);
	chair.position.set(0, 0.35, 0.85);
	zone.add(chair);
}

function addHotspotsForSection(section, zone, interactiveCollector, dataPieces) {
	const piece = dataPieces.find((p) => p.slug === section.slug);
	if (!piece) return;
	const tex = makeCanvasTexture(' ', { fontSize: 1, color: 'rgba(0,0,0,0)', bg: 'rgba(0,0,0,0)' });
	const mat = new THREE.MeshPhysicalMaterial({ map: tex, transparent: true, opacity: 0.01, transmission: 0.0, side: THREE.DoubleSide });
	mat.map.encoding = THREE.sRGBEncoding;
	const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), mat);
	panel.position.set(0, 1.45, -0.2);
	panel.userData = { slug: piece.slug };
	zone.add(panel);
	interactiveCollector.push(panel);
}

function addRoomProps() {
	// Decorative 3D props intentionally omitted for a clean, open layout.
}

export function attachZoneLabel(section, zone, zoneLabelMeshRef) {
	if (!section || !zone) return zoneLabelMeshRef || null;
	let zoneLabelMesh = zoneLabelMeshRef;
	if (!zoneLabelMesh) {
		const labelTex = makeCanvasTexture(section.label.toUpperCase(), { fontSize: 28, color: '#ffffff' });
		const labelMat = new THREE.MeshPhysicalMaterial({ map: labelTex, transparent: true, opacity: 0.9, transmission: 0.4, side: THREE.FrontSide });
		labelMat.map.encoding = THREE.sRGBEncoding;
		zoneLabelMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.9), labelMat);
		zoneLabelMesh.name = 'zoneLabel';
	}
	const newTex = makeCanvasTexture(section.label.toUpperCase(), { fontSize: 28, color: '#ffffff' });
	newTex.encoding = THREE.sRGBEncoding;
	if (zoneLabelMesh.material.map) zoneLabelMesh.material.map.dispose();
	zoneLabelMesh.material.map = newTex;
	zoneLabelMesh.material.needsUpdate = true;
	zoneLabelMesh.position.set(0, 1.6, 0);
	zoneLabelMesh.rotation.set(0, 0, 0);
	if (zoneLabelMesh.parent) zoneLabelMesh.parent.remove(zoneLabelMesh);
	zone.add(zoneLabelMesh);
	return zoneLabelMesh;
}

export function createHouseStructure(
	group,
	{ sections, roomAccent, dataPieces },
	interactiveCollector = [],
	allowedZones = [],
	zones = [],
	hoverPlanes = []
) {
	const base = new THREE.MeshPhysicalMaterial({
		transmission: 0.6,
		transparent: true,
		opacity: 0.9,
		roughness: 0.15,
		ior: 1.45,
		clearcoat: 0.35
	});
	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(16, 12),
		new THREE.MeshStandardMaterial({ color: 0x24162d, roughness: 0.3, metalness: 0.35 })
	);
	floor.rotation.x = -Math.PI / 2;
	floor.position.z = -2;
	group.add(floor);

	sections.forEach((section, idx) => {
		const zone = new THREE.Group();
		zone.position.set(section.center.x, 0, section.center.z);
		const w = section.size.w;
		const h = section.size.h;
		section.bounds = {
			minX: section.center.x - w / 2,
			maxX: section.center.x + w / 2,
			minZ: section.center.z - h / 2,
			maxZ: section.center.z + h / 2
		};
		allowedZones.push(section.bounds);

		const padColor = roomAccent[section.id] || 0xffffff;
		const pad = new THREE.Mesh(
			new THREE.PlaneGeometry(w - 0.4, h - 0.4),
			new THREE.MeshBasicMaterial({ color: padColor, transparent: true, opacity: 0.35 })
		);
		pad.rotation.x = -Math.PI / 2;
		pad.position.set(0, 0.01, 0);
		zone.add(pad);

		if (section.slug) {
			addHotspotsForSection(section, zone, interactiveCollector, dataPieces);
		} else if (section.id === 'hall') {
			addHallInstallations(zone);
		} else if (section.id === 'control') {
			addControlDesk(zone);
		}
		addRoomProps(section, zone);
		group.add(zone);
		zones[idx] = zone;

		const hoverPlane = new THREE.Mesh(
			new THREE.PlaneGeometry(w - 0.2, h - 0.2),
			new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.0, depthWrite: false })
		);
		hoverPlane.rotation.x = -Math.PI / 2;
		hoverPlane.position.set(section.center.x, 0.05, section.center.z);
		hoverPlane.userData = { zoneHover: idx };
		group.add(hoverPlane);
		hoverPlanes[idx] = hoverPlane;
		interactiveCollector.push(hoverPlane);
	});

	const connectors = [
		['hall', 'social'],
		['hall', 'commerce'],
		['hall', 'control'],
		['hall', 'mobility'],
		['hall', 'sensibles'],
		['social', 'mobility'],
		['commerce', 'sensibles'],
		['control', 'mobility'],
		['control', 'sensibles']
	];
	connectors.forEach((pair) => {
		const a = sections.find((s) => s.id === pair[0]);
		const b = sections.find((s) => s.id === pair[1]);
		if (!a || !b) return;
		const cx = (a.center.x + b.center.x) / 2;
		const cz = (a.center.z + b.center.z) / 2;
		const w = Math.abs(a.center.x - b.center.x) > 0.1 ? 1.6 : Math.max(a.size.w, b.size.w) * 0.28;
		const h = Math.abs(a.center.z - b.center.z) > 0.1 ? 1.6 : Math.max(a.size.h, b.size.h) * 0.28;
		allowedZones.push({
			minX: cx - w / 2,
			maxX: cx + w / 2,
			minZ: cz - h / 2,
			maxZ: cz + h / 2
		});
	});

	return { zones, hoverPlanes, allowedZones };
}
