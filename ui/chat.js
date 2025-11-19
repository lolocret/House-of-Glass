export function initMoonChat({
	moonRepliesDefault,
	moonApiEndpoint,
	moonChatForm,
	moonChatInput,
	moonChatMessages,
	moonBubble,
	moonBubbleClose
}) {
	let moonReplies = moonRepliesDefault;
	let moonChatTypingNode = null;
	let moonBubbleVisible = false;
	let sessionId = null;

	fetch('./moonReplies.json')
		.then((r) => (r.ok ? r.json() : null))
		.then((json) => {
			if (json && json.entries) moonReplies = json;
		})
		.catch(() => {
			// stay on embedded version
		});

	function resolveSessionId() {
		if (sessionId) return sessionId;
		try {
			const storage = window.localStorage;
			const key = 'hog.moonSession';
			const existing = storage?.getItem(key);
			if (existing) {
				sessionId = existing;
				return sessionId;
			}
			sessionId = `hog-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
			storage?.setItem(key, sessionId);
			return sessionId;
		} catch (err) {
			sessionId = `hog-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
			return sessionId;
		}
	}

	function toggleMoonBubble(show) {
		if (!moonBubble) return;
		moonBubbleVisible = show !== undefined ? show : !moonBubbleVisible;
		if (moonBubbleVisible) {
			moonBubble.classList.add('visible');
			if (moonChatInput) {
				setTimeout(() => moonChatInput.focus(), 50);
			}
		} else {
			moonBubble.classList.remove('visible');
		}
	}

	if (moonBubbleClose) {
		moonBubbleClose.addEventListener('click', () => toggleMoonBubble(false));
	}

	function addMoonMessage(sender, text) {
		if (!moonChatMessages) return;
		const div = document.createElement('div');
		div.className = 'moon-chat__message' + (sender === 'user' ? ' moon-chat__message--user' : '');
		div.textContent = text;
		moonChatMessages.appendChild(div);
		moonChatMessages.scrollTop = moonChatMessages.scrollHeight;
	}

	function setMoonTyping(isTyping) {
		if (!moonChatMessages) return;
		if (isTyping) {
			if (!moonChatTypingNode) {
				const div = document.createElement('div');
				div.className = 'moon-chat__message';
				div.textContent = '…';
				moonChatTypingNode = div;
				moonChatMessages.appendChild(div);
			}
		} else if (moonChatTypingNode) {
			moonChatMessages.removeChild(moonChatTypingNode);
			moonChatTypingNode = null;
		}
	}

	function generateMoonReply(question = '') {
		const q = (question || '').toLowerCase();
		if (!moonReplies || !moonReplies.entries) return moonReplies?.default || moonRepliesDefault.default;
		for (const entry of moonReplies.entries) {
			if (!entry || !entry.triggers || !entry.response) continue;
			for (const trig of entry.triggers) {
				if (q.includes(trig.toLowerCase())) return entry.response;
			}
		}
		return moonReplies.default || moonRepliesDefault.default;
	}

	async function askMoon(question) {
		const endpoint = moonApiEndpoint || null;
		if (!endpoint || endpoint === 'local') {
			return generateMoonReply(question);
		}
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ question, sessionId: resolveSessionId() })
			});
			const payload = await res.json().catch(() => ({}));
			if (payload && payload.answer) return payload.answer;
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			throw new Error('No answer');
		} catch (err) {
			console.warn('Moon API fallback (réponse locale):', err?.message || err);
			return generateMoonReply(question);
		}
	}

	if (moonChatForm) {
		moonChatForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			if (!moonChatInput) return;
			const text = moonChatInput.value.trim();
			if (!text) return;
			addMoonMessage('user', text);
			moonChatInput.value = '';
			setMoonTyping(true);
			const reply = await askMoon(text);
			setMoonTyping(false);
			addMoonMessage('assistant', reply);
		});
	}

	return {
		toggleMoonBubble,
		addMoonMessage,
		setMoonTyping,
		askMoon,
		generateMoonReply
	};
}
