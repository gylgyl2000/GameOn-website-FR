function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// AFFICHAGE DE LA MODALE

// ÉLÉMENTS DOM
// Sélection de l'élément "modale"
const modalbg = document.querySelector(".bground");
// Sélection de l'élément "bouton" qui ouvre la modale
const modalBtn = document.querySelectorAll(".btn-signup");
// Sélection de l'élément "formulaire"
const formData = document.querySelectorAll(".formData");
// Sélection de l'élément "bouton" qui ferme la modale
const closeModalBtn = document.querySelector(".close");

// Lorsque l'utilisateur clique sur le bouton, ouvre la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction d'ouverture de la modale
function launchModal() {
  modalbg.style.display = "block";
}

// Lorsque l'utilisateur clique sur le bouton x, ferme la modale
closeModalBtn.addEventListener("click", closeModal);

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
// Sélection de l'élément formulaire
const form = document.forms[0];
// Sélection des éléments "input[required]" du formulaire
const fields = document.querySelectorAll("form input[required]");
// Sélection de l'élément "input" du Prénom
const first = document.getElementById("first");
// Sélection de l'élément "input" du Nom
const last = document.getElementById("last");
// Sélection de l'élément "input" de l'E-mail
const email = document.getElementById("email");
// Sélection de l'élément "input" de la Date de naissance
const birthdate = document.getElementById("birthdate");
// Sélection de l'élément "input" de Combien de tournois
const quantity = document.getElementById("quantity");
// Sélection des éléments "input" de "type=radio" (Quel tournoi)
const locations = document.querySelectorAll("input[type=radio]");
// Sélection de l'élément "input" des Conditions d'utilisation
const conditionsUtilisation = document.getElementById("checkbox1");

// Sélection de l'élément "modale principale"
const mainModal = document.querySelector(".bground");

// Lorsque l'utilisateur clique sur le bouton, lance la fonction validateForm
form.addEventListener("submit", validateForm);

// Fonction de validation du formulaire
function validateForm(event) {
  event.preventDefault(); // Empêche l'envoi des données du formulaire
  let valid = true;

  for (let field of fields) {
    if (!field.checkValidity()) { // checkValidity() renvoie true si la valeur de l'élément n'a pas de problème de validation
      addErrorAttribute(field);
      addErrorMessages();
      valid = false;
    } else {
      clearErrorMessage(field);
    }
  }

  if (valid) {
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
  writeErrorMessage(first, "Veuillez entrer 2 caractères ou plus.");
  writeErrorMessage(last, "Veuillez entrer 2 caractères ou plus.");
  writeErrorMessage(email, "Veuillez saisir votre adresse e-mail.")
  writeErrorMessage(birthdate, "Veuillez saisir votre date de naissance.");
  writeErrorMessage(quantity, "Veuillez saisir une valeur numérique.");
  writeErrorMessage(conditionsUtilisation, "Vous devez vérifier que vous acceptez les termes et conditions.");
}

// Fonction pour vérifier si un bouton radio est coché
function udapteAttribute(element) {
  if (element.target.matches("input[required]")) {
    element.target.removeAttribute("required");
  }
}
for (let location of locations) {
  location.addEventListener("change", udapteAttribute);
  writeErrorMessage(location, "Vous devez choisir une option");
}

// Fonction d'effacement des messages d'erreur
function clearErrorMessage(element) {
  element.parentElement.setAttribute("data-error-visible", "false");
  element.parentElement.setAttribute("data-error", "");
}

// Vérification en cours de saisie ou après rejet

// Pour le prénom
first.addEventListener("input", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(first, "Veuillez entrer 2 caractères ou plus.");
  } else {
    clearErrorMessage(event.target);
  }
});

// Pour le nom
last.addEventListener("input", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(last, "Veuillez entrer 2 caractères ou plus.");
  } else {
    clearErrorMessage(event.target);
  }
});

// Pour l'e-mail
email.addEventListener("input", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(email, "Veuillez saisir une adresse e-mail valide.");
  } else {
    clearErrorMessage(event.target);
  }
});

// Pour la date de naissance
birthdate.addEventListener("input", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(birthdate, "Veuillez saisir une date au format jj/mm/aaaa.");
  } else {
    clearErrorMessage(event.target);
  }
});

// Pour le nombre de tournoi
quantity.addEventListener("input", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(quantity, "Veuillez saisir une valeur numérique.");
  } else {
    clearErrorMessage(event.target);
  }
});

// Pour le choix du tournoi
for (let location of locations) {
  location.addEventListener("change", function(event) {
    if (!event.target.checkValidity()) {
      addErrorAttribute(event.target);
    } else {
      clearErrorMessage(event.target);
    }
  });
}

// Pour les conditions d'utilisation
conditionsUtilisation.addEventListener("change", function(event) {
  if (!event.target.checkValidity()) {
    addErrorAttribute(event.target);
    writeErrorMessage(conditionsUtilisation, "Vous devez vérifier que vous acceptez les termes et conditions.");
  } else {
    clearErrorMessage(event.target);
  }
});

// AFFICHAGE DE LA MODALE MERCI

// ÉLÉMENTS DOM

// Sélection de l'élément "modale merci"
const merciModal = document.querySelector(".bground-merci");
// Sélection de l'élément "bouton" qui ouvre la modale
const merciModalBtn = document.querySelectorAll(".btn-close");
// Sélection de l'élément "bouton" qui ferme la modale
const closeMerciModalBtn = document.querySelector(".close-merci");
// Sélection de l'élément "bouton Fermer"
const fermerMerciModalNtn = document.querySelector(".btn-close")

// Fonction d'ouverture de la "modale merci"
function launchMerciModal() {
  merciModal.style.display = "flex";
}

// Lorsque l'utilisateur clique sur le bouton x, ferme la modale
closeMerciModalBtn.addEventListener("click", closeMerciModal);

// Lorsque l'utilisateur clique sur le bouton Fermer, ferme la modale
fermerMerciModalNtn.addEventListener("click", closeMerciModal);

// Fonction de fermeture de la "modale merci"
function closeMerciModal() {
  merciModal.setAttribute("closing", "");
  
  merciModal.addEventListener("animationend", () => {
    merciModal.removeAttribute("closing");
    merciModal.style.display= "none";
  }, {once: true})
}