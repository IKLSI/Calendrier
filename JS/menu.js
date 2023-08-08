// Permet d'afficher le menu grâce à un bouton pour le responsive

const menuToggle = document.getElementsByClassName('btn')[0];
const menuList = document.getElementsByClassName('event-form')[0];

menuToggle.addEventListener('click', () => {
	menuList.classList.toggle('show');
});