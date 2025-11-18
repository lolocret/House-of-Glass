export function createPanels({
	infoPanel,
	infoTitle,
	infoIntro,
	infoList,
	infoDynamic,
	primaryActionBtn,
	dataPieces,
	defaultInfo,
	roomActions,
	roomChoices,
	speakLine,
	gameState
}) {
	let currentChoices = [];

	function clearDynamicInfo(blankOnly = false) {
		if (infoDynamic) infoDynamic.innerHTML = blankOnly ? '' : '<p>Active une interaction dans cette pièce pour voir un exemple.</p>';
		currentChoices = [];
	}

	function renderDynamicResult(result) {
		if (!infoDynamic) return;
		if (!result) {
			clearDynamicInfo();
			return;
		}
		const { title, lines = [] } = result;
		infoDynamic.innerHTML = '';
		if (title) {
			const h = document.createElement('h3');
			h.textContent = title;
			infoDynamic.appendChild(h);
		}
		lines.forEach((line) => {
			const p = document.createElement('p');
			p.textContent = line;
			infoDynamic.appendChild(p);
		});
	}

	function renderChoices(slug){
		if (!infoDynamic) return;
		const choices = roomChoices[slug];
		currentChoices = choices || [];
		if (!choices){ clearDynamicInfo(); return; }

		infoDynamic.innerHTML = '';
		const wrap = document.createElement('div');
		wrap.style.display = 'flex';
		wrap.style.flexDirection = 'column';
		wrap.style.gap = '6px';

		choices.forEach((c) => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.textContent = c.label;
			btn.style.padding = '8px 10px';
			btn.style.borderRadius = '10px';
			btn.style.border = '1px solid rgba(255,255,255,0.2)';
			btn.style.background = 'rgba(255,255,255,0.05)';
			btn.style.color = '#f4fbff';
			btn.style.cursor = 'pointer';

			btn.addEventListener('click', ()=> {
				if (slug && Object.prototype.hasOwnProperty.call(gameState || {}, slug)) {
					gameState[slug] = {
						label: c.label,
						result: c.result
					};
				}
				renderDynamicResult({ title: 'Résultat', lines: c.result });
				if (speakLine) speakLine(c.result.join('. '));
			});

			wrap.appendChild(btn);
		});
		infoDynamic.appendChild(wrap);
	}

	function updateActionButton(slug) {
		if (!primaryActionBtn) return;
		const action = roomActions[slug];
		if (action) {
			primaryActionBtn.disabled = false;
			primaryActionBtn.textContent = action.label;
			primaryActionBtn.style.display = '';
		} else {
			primaryActionBtn.disabled = true;
			primaryActionBtn.textContent = 'Interagir';
			primaryActionBtn.style.display = 'none';
		}
	}

	function setInfoBySlug(slug = null) {
		if (!infoTitle || !infoIntro || !infoList || !infoPanel) return;
		const piece = dataPieces.find((item) => item.slug === slug) || defaultInfo;
		infoTitle.textContent = piece.title;
		infoIntro.textContent = piece.intro;
		infoList.innerHTML = '';
		(piece.insights || []).forEach((text) => {
			const li = document.createElement('li');
			li.textContent = text;
			infoList.appendChild(li);
		});
		clearDynamicInfo();
		updateActionButton(slug);
		renderChoices(slug);
		if (!slug && infoDynamic) {
			infoDynamic.innerHTML = '<p>Déplace-toi dans une pièce pour voir ses interactions.</p>';
		}
		if (infoPanel) {
			infoPanel.classList.toggle('info-panel--active', Boolean(slug));
		}
	}

	return {
		setInfoBySlug,
		renderDynamicResult,
		updateActionButton,
		renderChoices,
		clearDynamicInfo,
		getCurrentChoices: () => currentChoices
	};
}
