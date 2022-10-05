// Fonction d'affichage de la barre de navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// AFFICHAGE DE LA MODALE PRINCIPALE

// ÉLÉMENTS DOM
const modalbg = document.querySelector(".bground"); // Sélection de l'élément "modale"
const modalBtn = document.querySelectorAll(".btn-signup"); // Sélection de l'élément "bouton" qui ouvre la modale
const formData = document.querySelectorAll(".formData"); // Sélection de l'élément "formulaire"
const closeModalBtn = document.querySelector(".close"); // Sélection de l'élément "bouton" qui ferme la modale

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // Lorsque l'utilisateur clique sur le bouton, ouvre la modale

// Fonction d'ouverture de la modale
function launchModal() {
  modalbg.style.display = "block";
}

closeModalBtn.addEventListener("click", closeModal); // Lorsque l'utilisateur clique sur le bouton x, ferme la modale

// Fonction de fermeture de la modale
function closeModal() {
  modalbg.setAttribute("closing", "");
  modalbg.addEventListener("animationend", () => {
    modalbg.removeAttribute("closing");
    modalbg.style.display= "none";
  }, {once: true})
}

// CONTROLES DE VALIDATION DU FORMULAIRE

// ÉLÉMENTS DOM
const form = document.forms[0]; // Sélection de l'élément formulaire
const fields = document.querySelectorAll("form input[required]");// Sélection des éléments "input[required]" du formulaire
const first = document.getElementById("first"); // Sélection de l'élément "input" du Prénom
const last = document.getElementById("last"); // Sélection de l'élément "input" du Nom
const email = document.getElementById("email"); // Sélection de l'élément "input" de l'E-mail
const birthdate = document.getElementById("birthdate"); // Sélection de l'élément "input" de la Date de naissance
const quantity = document.getElementById("quantity"); // Sélection de l'élément "input" de Combien de tournois
const locations = document.querySelectorAll('input[name="location"]'); // Sélection des éléments "input" de "type=radio" (Quel tournoi)
const location1 = document.getElementById("location1"); // Sélection du premier 'élément "input" des locations
const conditionsUtilisation = document.getElementById("checkbox1"); // Sélection de l'élément "input" des Conditions d'utilisation

const mainModal = document.querySelector(".bground"); // Sélection de l'élément "modale principale"

form.addEventListener("submit", validateForm); // Lorsque l'utilisateur clique sur le bouton, lance la fonction validateForm

// Expressions régulières et validations
const letterRegExp = /[A-Z][a-z]{1,}/s; // Commence par une majuscule, nécessite au moins 2 caractères
const numRegExp = /^[a-z-' ]+$/i; // N'autorise que des lettres et "-", "'" et l'espace
const emailRegExp = /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/;
const birthdateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const numOnlyRegExp = /^[0-9]+$/;

// Fonction pour calculer l'âge
let yourAge = 0;
function ageCalculator() {
  let dateInput = birthdate.value; // récupère l'entrée du formulaire
  let birthday = new Date(dateInput); // convertit au format date
  let monthDiff = Date.now() - birthday.getTime(); // calcule la différence de mois à partir de la date actuelle dans le temps
  let ageDate = new Date(monthDiff); // convertit la différence calculée au format date
  let year = ageDate.getUTCFullYear(); // extrait l'année à partir de la date
  yourAge = Math.abs(year - 1970); // calcule l'âge
  return yourAge; // renvoie l'âge calculé
}

// Fonction pour vérifier si un bouton radio est coché
const locationsArray = Array.from(locations);
const checkLocations = () => {
  if (locationsArray.some(radio => radio.checked === true)) {
    return true;
  } else {
    return false;
  }
}

// Fonction de validation du formulaire
function validateForm(event) {
  event.preventDefault(); // Empêche l'envoi des données du formulaire
  let valid = true;
  if (!first.value.match(letterRegExp) || !first.value.match(numRegExp)) { // Pour le prénom
    addErrorAttribute(first);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(first);
  }
  if (!last.value.match(letterRegExp) || !last.value.match(numRegExp)) { // Pour le nom
    addErrorAttribute(last);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(last);
  }
  if (!email.value.match(emailRegExp)) { // Pour l'e-mail
    addErrorAttribute(email);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(email);
  }
  ageCalculator();
  if (!birthdate.value.match(birthdateRegExp) || yourAge < 18) { // Pour la date de naissance
    addErrorAttribute(birthdate);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(birthdate);
  }
  if (quantity.value === null || quantity.value > 99 || !quantity.value.match(numOnlyRegExp)) { // Pour le nombre de tournoi
    addErrorAttribute(quantity);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(quantity);
  }
  if (!checkLocations()) { // Pour le choix du tournoi
    addErrorAttribute(location1);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(location1);
  }
  if (!conditionsUtilisation.checked === true) { // Pour les conditions d'utilisation
    addErrorAttribute(conditionsUtilisation);
    addErrorMessages();
    valid = false;
  } else {
    clearErrorMessage(conditionsUtilisation);
  }

  if (valid) { // Quand le formulaire est valide
    closeModal();
    launchMerciModal();
    form.reset();
  }
}

// Fonction d'ajout de l'attribut d'erreur "data-error-visible"
function addErrorAttribute(element) {
  element.parentElement.setAttribute("data-error-visible", "true");
}

// Fonction d'ajout de l'attribut "data-error" et du message d'erreur
function writeErrorMessage(element, message) {
  element.parentElement.setAttribute("data-error", message);
}

// Fonction d'ajout des messages d'erreur
function addErrorMessages() {
  writeErrorMessage(first, "Veuillez saisir votre prénom.");
  writeErrorMessage(last, "Veuillez saisir votre nom.");
  writeErrorMessage(email, "Veuillez saisir votre adresse e-mail.")
  writeErrorMessage(birthdate, "Veuillez saisir votre date de naissance.");
  writeErrorMessage(quantity, "Veuillez saisir une valeur numérique.");
  writeErrorMessage(location1, "Vous devez choisir une option");
  writeErrorMessage(conditionsUtilisation, "Vous devez vérifier que vous acceptez les termes et conditions.");
}

// Fonction d'effacement des messages d'erreur
function clearErrorMessage(element) {
  element.parentElement.removeAttribute("data-error");
  element.parentElement.setAttribute("data-error-visible", "false");
}

// Vérification en cours de saisie ou après rejet

first.addEventListener("input", function(event) { // Pour le prénom
  if (!first.value.match(letterRegExp) || !first.value.match(numRegExp)) {
    addErrorAttribute(event.target);
    writeErrorMessage(first, "Veuillez entrer 2 lettres ou plus, en commençant par une majuscule et sans utiliser de chiffre.");
  } else {
    clearErrorMessage(event.target);
  }
});

last.addEventListener("input", function(event) { // Pour le nom
  if (!last.value.match(numRegExp) || !last.value.match(letterRegExp)) {
    addErrorAttribute(event.target);
    writeErrorMessage(last, "Veuillez entrer 2 lettres ou plus, en commençant par une majuscule et sans utiliser de chiffre.");
  } else {
    clearErrorMessage(event.target);
  }
});

email.addEventListener("input", function(event) { // Pour l'e-mail
  if (!email.value.match(emailRegExp)) {
    addErrorAttribute(event.target);
    writeErrorMessage(email, "Veuillez saisir une adresse e-mail valide.");
  } else {
    clearErrorMessage(event.target);
  }
});

birthdate.addEventListener("input", function(event) { // Pour la date de naissance
  ageCalculator();
  if (yourAge < 18) {
    addErrorAttribute(event.target);
    writeErrorMessage(birthdate, "Vous devez être majeur pour vous inscrire");
  } else if (!birthdate.value.match(birthdateRegExp)) {
    addErrorAttribute(event.target);
    writeErrorMessage(birthdate, "Veuillez saisir une date au format jj/mm/aaaa.");
  } else {
    clearErrorMessage(event.target);
  }
});

quantity.addEventListener("input", function(event) { // Pour le nombre de tournoi
  if (quantity.value === null || !quantity.value.match(numOnlyRegExp)) {
    addErrorAttribute(event.target);
    writeErrorMessage(quantity, "Veuillez saisir une valeur numérique.");
  } else if (quantity.value > 99) {
    addErrorAttribute(event.target);
    writeErrorMessage(quantity, "Veuillez saisir une valeur entre 0 et 99.");
  } else {
    clearErrorMessage(event.target);
  }
});

for (let location of locations) { // Pour le choix du tournoi
  location.addEventListener("input", function(event) {
    if (!checkLocations()) {
      addErrorAttribute(event.target);
      writeErrorMessage(location1, "Vous devez choisir une option");
    } else {
      clearErrorMessage(event.target);
    }
  });
}

conditionsUtilisation.addEventListener("change", function(event) { // Pour les conditions d'utilisation
  if (!conditionsUtilisation.checked === true) {
    addErrorAttribute(event.target);
    writeErrorMessage(conditionsUtilisation, "Vous devez vérifier que vous acceptez les termes et conditions.");
  } else {
    clearErrorMessage(event.target);
  }
});

// AFFICHAGE DE LA MODALE "MERCI"

// ÉLÉMENTS DOM
const merciModal = document.querySelector(".bground-merci"); // Sélection de l'élément "modale merci"
const merciModalBtn = document.querySelectorAll(".btn-close"); // Sélection de l'élément "bouton" qui ouvre la modale
const closeMerciModalBtn = document.querySelector(".close-merci"); // Sélection de l'élément "bouton" qui ferme la modale
const fermerMerciModalNtn = document.querySelector(".btn-close"); // Sélection de l'élément "bouton Fermer"

// Fonction d'ouverture de la "modale merci"
function launchMerciModal() {
  merciModal.style.display = "flex";
}

closeMerciModalBtn.addEventListener("click", closeMerciModal); // Lorsque l'utilisateur clique sur le bouton x, ferme la modale

fermerMerciModalNtn.addEventListener("click", closeMerciModal); // Lorsque l'utilisateur clique sur le bouton Fermer, ferme la modale

// Fonction de fermeture de la "modale merci"
function closeMerciModal() {
  merciModal.setAttribute("closing", "");
  merciModal.addEventListener("animationend", () => {
    merciModal.removeAttribute("closing");
    merciModal.style.display= "none";
  }, {once: true})
}
