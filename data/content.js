// Content and configuration for the House of Glass experience.

export const moonRepliesDefault = {
	entries: [
		{
			triggers: ["qui es", "toi", "assistant"],
			response: "Je suis le guide de la Maison : je réponds avec les règles de l'expérience."
		},
		{
			triggers: ["social", "réseau", "story", "post", "like", "dm"],
			response: "Les signaux sociaux (likes, stories, DMs) servent à prédire humeur, opinions et influence. Réduis la géoloc et segmente tes audiences."
		},
		{
			triggers: ["achat", "panier", "commerce", "abonnement", "prix"],
			response: "Les paniers et abonnements calculent ton pouvoir d'achat et tes routines. Varie les moyens de paiement et purge l'historique d'achat."
		},
		{
			triggers: ["trajet", "gps", "locali", "déplacement"],
			response: "Quelques jours de GPS suffisent pour trouver domicile et lieux sensibles. Coupe la géoloc en tâche de fond et sépare profils pro/perso."
		},
		{
			triggers: ["santé", "sommeil", "humeur", "sensibl", "coeur", "spo2"],
			response: "Les données santé/sommeil sont sensibles : vérifie les permissions, désactive le partage tiers et conserve un export chiffré seulement si besoin."
		},
		{
			triggers: ["rgpd", "droit", "contrôle", "export", "effacement", "suppression"],
			response: "Tes leviers : accès/portabilité pour récupérer, rectification pour corriger, effacement pour supprimer, opposition pour bloquer la pub ciblée."
		},
		{
			triggers: ["navig", "visiter", "guide"],
			response: "Utilise la téléportation pour changer de pièce, ou marche avec ZQSD/flèches. Clique sur les panneaux pour déclencher les interactions."
		}
	],
	default: "Parle-moi de réseaux, achats, trajets, santé/sensibles ou contrôle et je te répondrai."
};

export const sections = [
	{
		id: 'hall',
		label: "Hall d'entrée",
		copy: "Cette maison en verre représente ta vie numérique. Avance et choisis la première pièce à explorer.",
		slug: null,
		center: { x: 0, z: 0 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Hall d'entrée",
			body: "Bienvenue dans la House of Glass. Chaque pièce correspond à une famille de données (réseaux, achats, déplacements, données sensibles, contrôle). À toi d’explorer et de voir ce qu’on peut déduire de toi.",
			cta: "Entrer dans le salon des réseaux",
			target: 1
		}
	},
	{
		id: 'social',
		label: "Salon des Réseaux",
		copy: "Publier, liker, scroller : ces signaux suffisent à composer un double social très détaillé.",
		slug: 'social',
		center: { x: -4.4, z: 0 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Salon des Réseaux",
			body: "Ici tu testes des posts fictifs (stories, débats, contenus lifestyle) et tu vois comment ils alimentent une fiche de profil marketing.",
			cta: "Passer à la cuisine des achats",
			target: 2
		}
	},
	{
		id: 'commerce',
		label: "Cuisine des Achats",
		copy: "Chaque panier ou abonnement révèle budget, priorités et habitudes de consommation.",
		slug: 'commerce',
		center: { x: 4.4, z: 0 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Cuisine des Achats",
			body: "Compose un panier fictif (bio, gaming, voyages, soins) et observe ce qu’il suggère sur ton niveau de vie et tes routines.",
			cta: "Explorer le couloir des déplacements",
			target: 3
		}
	},
	{
		id: 'mobility',
		label: "Couloir des Déplacements",
		copy: "La géolocalisation suffit à retrouver domicile, trajets et lieux sensibles que tu fréquentes.",
		slug: 'mobility',
		center: { x: -4.4, z: -4.4 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Couloir des Déplacements",
			body: "Choisis un trajet type (études, travail, famille) et regarde les hypothèses qu’un système peut en tirer sur ton quotidien.",
			cta: "Entrer dans la chambre des données sensibles",
			target: 4
		}
	},
	{
		id: 'sensibles',
		label: "Chambre des Données sensibles",
		copy: "Santé, sommeil, messages privés : ces signaux sont particulièrement protégés, mais restent exploitables si tu les partages.",
		slug: 'sensibles',
		center: { x: 4.4, z: -4.4 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Chambre des Données sensibles",
			body: "Ici tu actives ou coupes des permissions fictives (sommeil, humeur, capteurs santé, messageries) et tu vois l’impact potentiel sur ton profil.",
			cta: "Aller au bureau de contrôle",
			target: 5
		}
	},
	{
		id: 'control',
		label: "Bureau de contrôle",
		copy: "Synthèse : tu vois le profil reconstruit à partir de tes choix et tu découvres les leviers pour reprendre la main.",
		slug: 'control',
		center: { x: 0, z: -4.4 },
		size: { w: 4.6, h: 4.6 },
		story: {
			title: "Bureau de contrôle",
			body: "Dernière pièce : on assemble ce que tes traces laissent deviner et on le relie à des droits concrets (accès, effacement, opposition) et à des réglages simples.",
			cta: null,
			target: null
		}
	}
];

export const characterOptions = {
	loup: {
		label: 'Loup',
		walk: './assets/loup.glb',
		idle: './assets/loup_statique.glb',
		scaleMultiplier: 1,
		walkLift: -0.9,
		idleLift: 0.02,
		idleRotationX: Math.PI / 2,
		meshYaw: 0
	},
	cameraman: {
		label: 'Cameraman',
		walk: './assets/cameraman_walking.glb',
		idle: './assets/cameraman_walking_statique.glb',
		scaleMultiplier: 2.2,
		walkLift: -0.6,
		idleLift: 0.05,
		meshYaw: Math.PI
	}
};

export const roomAccent = {
	hall: 0xbee9ff,
	social: 0xffbfe9,
	commerce: 0xfff1bf,
	mobility: 0xbfe7ff,
	sensibles: 0xdcc7ff,
	control: 0xcaf7d7
};

export const dataPieces = [
	{
		slug: "social",
		title: "Salon des Réseaux",
		intro: "Stories, likes, commentaires et temps de visionnage peuvent être utilisés pour dresser un profil social détaillé.",
		insights: [
			"Les plateformes observent le type de contenus que tu vois, postes ou likes pour en déduire tes centres d’intérêt et ton style de vie.",
			"Les horaires d’activité et la fréquence des échanges aident à estimer ton âge probable, ton niveau d’engagement et ton réseau social."
		],
		color: "#ffb3ec"
	},
	{
		slug: "commerce",
		title: "Cuisine des Achats",
		intro: "Tes achats et abonnements en ligne laissent une empreinte qui peut servir au ciblage commercial.",
		insights: [
			"Les tickets, paniers et abonnements indiquent le budget moyen, la fréquence d’achat et les catégories de produits privilégiées.",
			"Ces signaux peuvent être utilisés pour ajuster les prix, prioriser certaines promotions ou recommander des produits similaires."
		],
		color: "#ffd68f"
	},
	{
		slug: "mobility",
		title: "Couloir des Déplacements",
		intro: "La géolocalisation permet de reconstituer des trajets et des lieux-clés de ton quotidien.",
		insights: [
			"Des positions régulières à certaines heures suffisent souvent à identifier un domicile probable ou un lieu de travail/études.",
			"La fréquence de passage dans certains lieux peut suggérer des habitudes (sport, sorties, vie de famille, déplacements longue distance)."
		],
		color: "#aee6ff"
	},
	{
		slug: "sensibles",
		title: "Chambre des Données sensibles",
		intro: "Certaines informations sont considérées comme sensibles par le droit européen (santé, opinions, vie intime).",
		insights: [
			"Des données comme le sommeil, la fréquence des messages ou les capteurs santé peuvent être très personnelles si elles sont croisées avec d’autres sources.",
			"Leur utilisation est encadrée : selon le contexte, un traitement abusif peut avoir des conséquences sur l’assurance, la réputation ou des opportunités futures."
		],
		color: "#d0c5ff"
	},
	{
		slug: "control",
		title: "Bureau de Contrôle",
		intro: "Cette pièce rassemble ce que tes choix laissent deviner et te montre des leviers concrets de protection.",
		insights: [
			"Les principaux droits prévus par le RGPD incluent l’accès, la rectification, l’effacement, la portabilité et le droit d’opposition.",
			"Des actions simples comme limiter certaines permissions, revoir les paramètres de pub ou nettoyer l’historique réduisent déjà ton exposition."
		],
		color: "#f1ffb5"
	}
];

export const roomChoices = {
	social: [
		{
			label: "Poster des stories géolocalisées avec tes amis",
			result: [
				"On peut en déduire un profil social actif et très visible.",
				"La géolocalisation répétée permet de repérer tes lieux de vie et de sortie."
			]
		},
		{
			label: "Partager souvent des débats et opinions",
			result: [
				"Ton profil peut être classé comme engagé sur certains sujets.",
				"Des contenus plus polarisés ou ciblés politiquement peuvent t’être proposés."
			]
		}
	],
	commerce: [
		{
			label: "Composer un panier bio + box beauté mensuelle",
			result: [
				"Tes achats suggèrent un budget plutôt élevé pour l’alimentation et les soins.",
				"Tu peux être ciblé·e par des offres premium liées au bien-être ou aux produits éthiques."
			]
		},
		{
			label: "S’abonner à un service gaming + commandes de fast-food tardives",
			result: [
				"On peut te classer comme gros·se utilisateur·trice de divertissement nocturne.",
				"Des offres d’abonnements prolongés, de livraison rapide ou de snacks peuvent être accentuées."
			]
		}
	],
	mobility: [
		{
			label: "Trajet domicile ↔ bureau ↔ salle de sport",
			result: [
				"Les données indiquent un rythme de vie régulier avec déplacements quotidiens.",
				"Tu peux être ciblé·e pour des services de transport, de mobilité douce ou des abonnements de fitness."
			]
		},
		{
			label: "Trajet campus ↔ bibliothèque ↔ job étudiant",
			result: [
				"Les lieux et horaires suggèrent un statut d’étudiant·e.",
				"Des offres bancaires jeunes, de logement étudiant ou de réductions culturelles peuvent être privilégiées."
			]
		}
	],
	sensibles: [
		{
			label: "Activer suivi du sommeil + journal d’humeur",
			result: [
				"Ces données donnent une vision fine de ton rythme et de ton état émotionnel.",
				"Mal encadrées, elles pourraient peser dans des décisions liées au bien-être ou à l’assurance."
			]
		},
		{
			label: "Partager des données de capteurs santé",
			result: [
				"Les informations biométriques sont particulièrement sensibles.",
				"Leur usage doit être strictement limité au contexte médical ou bien-être clairement explicité."
			]
		}
	],
	control: [
		{
			label: "Demander une copie de mes données",
			result: [
				"Tu exerces ton droit d’accès et de portabilité.",
				"Tu peux vérifier ce qui est stocké et décider ensuite de ce que tu souhaites effacer ou corriger."
			]
		},
		{
			label: "Limiter la publicité personnalisée",
			result: [
				"Tu réduis l’usage de ton profil pour du ciblage marketing.",
				"Les publicités restent présentes mais moins liées à ton historique et à tes habitudes."
			]
		}
	]
};

export const gameState = {
	social: null,
	commerce: null,
	mobility: null,
	sensibles: null
};

export const roomActions = {
	social: {
		label: "Générer la fiche sociale",
		handler: () => {
			const choice = gameState.social;
			return {
				title: "Lecture sociale",
				lines: choice
					? [
							"Résumé réseaux : " + choice.label,
							...choice.result
						]
					: [
							"Aucun scénario réseaux sociaux n’a encore été testé.",
							"Explore le Salon des Réseaux pour voir comment tes interactions peuvent être interprétées."
						]
			};
		}
	},
	commerce: {
		label: "Analyser le panier",
		handler: () => {
			const choice = gameState.commerce;
			return {
				title: "Lecture achats",
				lines: choice
					? [
							"Résumé achats : " + choice.label,
							...choice.result
						]
					: [
							"Aucun panier n’a encore été simulé.",
							"Compose un panier fictif dans la Cuisine des Achats pour voir ce qu’il peut révéler."
						]
			};
		}
	},
	mobility: {
		label: "Lire le trajet",
		handler: () => {
			const choice = gameState.mobility;
			return {
				title: "Lecture déplacements",
				lines: choice
					? [
							"Résumé déplacements : " + choice.label,
							...choice.result
						]
					: [
							"Aucun trajet n’a encore été sélectionné.",
							"Teste un itinéraire dans le Couloir des Déplacements pour voir les hypothèses possibles."
						]
			};
		}
	},
	sensibles: {
		label: "Scanner les données sensibles",
		handler: () => {
			const choice = gameState.sensibles;
			return {
				title: "Impact données sensibles",
				lines: choice
					? [
							"Résumé données sensibles : " + choice.label,
							...choice.result
						]
					: [
							"Aucun scénario de données sensibles n’a été exploré.",
							"Passe par la Chambre des Données sensibles pour tester des autorisations fictives."
						]
			};
		}
	},
	control: {
		label: "Voir la synthèse",
		handler: () => {
			const lines = [];

			if (gameState.social) {
				lines.push("Réseaux : " + gameState.social.label);
			} else {
				lines.push("Réseaux : aucune interaction testée.");
			}

			if (gameState.commerce) {
				lines.push("Achats : " + gameState.commerce.label);
			} else {
				lines.push("Achats : aucun panier simulé.");
			}

			if (gameState.mobility) {
				lines.push("Déplacements : " + gameState.mobility.label);
			} else {
				lines.push("Déplacements : aucun trajet choisi.");
			}

			if (gameState.sensibles) {
				lines.push("Données sensibles : " + gameState.sensibles.label);
			} else {
				lines.push("Données sensibles : aucun scénario testé.");
			}

			lines.push("");
			lines.push("Rappels de contrôle :");
			lines.push("• Tu peux demander l’accès et une copie de tes données aux services concernés.");
			lines.push("• Tu peux corriger ou effacer certaines informations quand elles ne sont plus nécessaires.");
			lines.push("• Tu peux limiter la publicité personnalisée et revoir les autorisations de géolocalisation et de suivi.");

			return {
				title: "Synthèse de ton passage dans la Maison",
				lines
			};
		}
	}
};

export const defaultInfo = {
	title: "Commence par une pièce",
	intro: "Déplace-toi dans une pièce et clique sur une capsule de verre pour tester un scénario.",
	insights: [
		"Chaque pièce correspond à une famille de données personnelles (réseaux, achats, déplacements, données sensibles, contrôle).",
		"Tes choix ne sont pas enregistrés en vrai, ils servent uniquement à illustrer ce qu’un système pourrait déduire."
	]
};

export const moveSpeeds = { walk: 3.0 };

// Legacy content kept for potential future use.
export const socialPosts = [
	{ label: "Story festival & amis", inference: "Profil culture + sociable", note: "Ciblage sorties nocturnes et partenariats événementiels." },
	{ label: "Thread coup de gueule politique", inference: "Positionnement engagé", note: "Peut déclencher du contenu polarisé ou du microciblage militant." },
	{ label: "VLOG routine sport + smoothies", inference: "Style de vie healthy premium", note: "Associe ta data à des marques fitness et compléments." },
	{ label: "Mèmes sur la procrastination", inference: "Catégorie 'étudiant stressé'", note: "Propension à consommer des apps de productivité payantes." },
	{ label: "Haul vêtements éthiques", inference: "Purchase intent mode responsable", note: "Proposition de cartes bancaires vertes et néobanques." }
];

export const commerceItems = [
	{ label: "Panier bio + livraison de paniers", insight: "Budget alimentation supérieur à la moyenne, appétence pour abonnements durables." },
	{ label: "Abonnement gaming + achats in-app", insight: "Profil gamer intensif, propension à accepter des offres de crédit rapide." },
	{ label: "Billets low-cost + hôtels week-end", insight: "Voyageur fréquent, ciblage assurance annulation + cartes multi-devises." },
	{ label: "Box beauté clean + parapharmacie", insight: "Soins haut de gamme, intérêt pour produits santé personnalisés." },
	{ label: "Commandes fast-food tardives", insight: "Rythme irrégulier, push de livraison express et offres nocturnes." }
];

export const mobilityRoutes = [
	{ route: "Domicile → coworking → salle de sport → bar", deductions: ["Horaires 8h-22h", "Réseau social urbain", "Ciblage transports multimodes"] },
	{ route: "Campus → stage → bibliothèque", deductions: ["Statut étudiant·e", "Temps passé en zone académique", "Ciblage bourses et banques jeunes"] },
	{ route: "Maison → école → supermarché → maison", deductions: ["Probable parent", "Crénaux 7h30/16h30", "Ciblage assurances famille"] }
];

export const sensitivePermissions = [
	{ label: "Suivi du sommeil (8h)", impact: "Indice de fatigue et productivité transmis aux partenaires bien-être." },
	{ label: "Journal humeur quotidien", impact: "Profil émotionnel exploitable pour scoring de stabilité." },
	{ label: "Historique messageries chiffrées", impact: "Métadonnées révélant relations intimes malgré chiffrement du contenu." },
	{ label: "Capteurs santé (coeur, SPO2)", impact: "Peut influencer primes assurance ou prêts santé." }
];

export const controlActions = [
	{ action: "Télécharger tes données", impact: "Tu récupères un export complet pour vérifier ce qui circule." },
	{ action: "Activer l'authentification forte", impact: "Réduit les reprises de comptes et les doubles connexions suspectes." },
	{ action: "Programmer des rappels de nettoyage", impact: "Tous les 90 jours tu purges recherches, historiques et paniers." },
	{ action: "Segmenter tes identités (pseudo/email)", impact: "Évite la corrélation automatique entre achats, loisirs et santé." }
];
