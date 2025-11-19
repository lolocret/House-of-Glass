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

	const bgInner = opts.bgInner || '#070b16';
	const bgOuter = opts.bgOuter || '#0f1325';
	const grd = ctx.createRadialGradient(size * 0.5, size * 0.5, size * 0.05, size * 0.5, size * 0.5, size * 0.9);
	grd.addColorStop(0, bgInner);
	grd.addColorStop(1, bgOuter);
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, size, size);

	// Neon grid overlay for a digital feel
	const gridSpacing = opts.gridSpacing || size / 12;
	ctx.strokeStyle = opts.lineColor || '#3cf5ff';
	ctx.globalAlpha = 0.22;
	ctx.lineWidth = opts.lineWidth || 1.5;
	for (let x = 0; x <= size; x += gridSpacing) {
		ctx.beginPath();
		ctx.moveTo(x + 0.5, 0);
		ctx.lineTo(x + 0.5, size);
		ctx.stroke();
	}
	for (let y = 0; y <= size; y += gridSpacing) {
		ctx.beginPath();
		ctx.moveTo(0, y + 0.5);
		ctx.lineTo(size, y + 0.5);
		ctx.stroke();
	}

	const tex = new THREE.CanvasTexture(canvas);
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	tex.repeat.set(opts.repeatU || 1, opts.repeatV || 1);
	tex.needsUpdate = true;
	return tex;
}
