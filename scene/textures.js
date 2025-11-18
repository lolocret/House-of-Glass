import * as THREE from 'three';

export function makeCanvasTexture(text, opts = {}) {
	const w = opts.w || 512;
	const h = opts.h || 256;
	const canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = opts.bg || 'rgba(255,255,255,0.02)';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = opts.color || '#e2f9ff';
	ctx.font = `${opts.fontSize || 36}px sans-serif`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, w / 2, h / 2);
	const tex = new THREE.CanvasTexture(canvas);
	tex.needsUpdate = true;
	return tex;
}

export function makeTiledTexture(opts = {}) {
	const size = opts.size || 512;
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');

	const grd = ctx.createRadialGradient(
		size * 0.5,
		size * 0.5,
		size * 0.05,
		size * 0.5,
		size * 0.5,
		size * 0.9
	);
	grd.addColorStop(0, '#140c18');
	grd.addColorStop(1, '#0b0610');
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, size, size);

	const tex = new THREE.CanvasTexture(canvas);
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	tex.repeat.set(opts.repeatU || 1, opts.repeatV || 1);
	tex.needsUpdate = true;
	return tex;
}
