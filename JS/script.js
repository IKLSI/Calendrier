// Script JS Calendrier

// Déclaration variable contenant l'ensemble des Dates d'évenements à intégrer dans le calendrier

let tableauDates = [{
	date: "2023-08-08",
	contenu: "Mise en ligne du site"
},
];

// Déclaration des variables en récupérant les éléments présents dans l'HTML

let listeJour = document.querySelector('.jours_Mois');
let listeMois = document.querySelector('.mois_Nom');
let listeAnnee = document.querySelector('.annee_Numero');
let precedent = document.querySelector('.precedent');
let suivant = document.querySelector('.suivant');
let formulaireEvenement = document.getElementById('event-form');
let champDateEvenement = document.getElementById('event-date');
let champContenuEvenement = document.getElementById('event-content');

// Obtention de la date du jour

let dt = new Date();
let mois = dt.getMonth() + 1;
let annee = dt.getFullYear();
let jourActuel = dt.getDate();

// Liste des noms de mois

let listeMoisFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Gestion des clics sur les boutons précédent et suivant aux côtés avec affichage du calendrier

precedent.addEventListener('click', event => {
mois -= 1;
if (mois < 1) {
	mois = 12;
	annee -= 1;
}

listeMois.classList.add('animate-out');

setTimeout(() => {
	calendar();
	listeMois.classList.remove('animate-out');
}, 100);
});

suivant.addEventListener('click', event => {
mois += 1;
if (mois > 12) {
	mois = 1;
	annee += 1;
}

setTimeout(() => {
	calendar();
	listeMois.classList.remove('animate-out');
}, 100);
});

// Fonction pour afficher le calendrier

const calendar = () => {
listeMois.innerHTML = listeMoisFr[mois - 1]; // Affichage du nom du mois
listeAnnee.innerHTML = annee; // Affichage de l'année
listeJour.innerHTML = ''; // Réinitialisation de la liste des jours

let joursDansMois = new Date(annee, mois, 0).getDate(); // Nombre de jours dans le mois

let numeroJour = new Date(annee, mois - 1, 1).getDay(); // Numéro du jour de la semaine (0-6)
let espaces;
if (numeroJour === 0) {
	espaces = 6;
} else {
	espaces = numeroJour - 1;
}

// Affichage des jours du mois et si un jour est contenu dans le tableau des dates d'événements, affichage du contenu de l'événement

for (let jour = -espaces + 1; jour <= joursDansMois; jour++) {
	const jours = document.createElement('li');
	if (jour <= 0) {
		jours.innerHTML = '';
		listeJour.appendChild(jours);
	} else {
		const contenu = document.createElement('div');
		const contenuEvenement = tableauDates.find(e => e.date === `${annee}-${mois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`);
		if (contenuEvenement) {
			contenu.innerHTML = `${jour}<br>${contenuEvenement.contenu}`;
			contenu.classList.add('event');
			contenu.addEventListener('click', showForm);
			jours.classList.add('event-day');
		} else {
			jours.innerHTML = jour; // Autres jours du mois
		}
		jours.appendChild(contenu);
		listeJour.appendChild(jours);
	}
}
// Affichage progressif du nom du mois
let currentLetter = 0;
let monthNameElement = document.querySelector('.mois_Nom');
monthNameElement.textContent = '';
monthNameElement.style.opacity = 1;

const showNextLetter = () => {
	if (currentLetter < listeMoisFr[mois - 1].length) {
		monthNameElement.textContent += listeMoisFr[mois - 1].charAt(currentLetter);
		currentLetter++;
	} else {
		clearInterval(intervalID);
	}
};

const intervalID = setInterval(showNextLetter, 30);
};

function showForm(event) {
	event.preventDefault();
	formulaireEvenement.style.display = 'block';
}