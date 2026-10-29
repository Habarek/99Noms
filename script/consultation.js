// Importation de la variable nameOfAllah (tableau d'objet) du fichier names.js
import { nameOfAllah } from "../script/data/names.js";

const arrayAllOfNames = []; // Le tableau permetera de verifier que les Noms qui ne correspondent pas aux Noms de baliseNameAndMeaning soit caché
let elementBtnTop = document.getElementById("btnTop"); // elementBtnTop = document.getElementById("btnTop") récupère l'élément HTML ("btnTop" dans consulation.HTML) qui porte l'id "btnTop",
// pour qu'on puisse le manipuler depuis le JS (y ajouter du contenu, etc.)
// il récupère la div elle-même (la balise entière, avec toutes ses propriétés : son contenu actuel, son style, ses attributs...).
elementBtnTop.addEventListener("click", () => {
  // window : représente la fenêtre du navigateur.
  window.scrollTo({ top: 0, behavior: "smooth" }); // scrollTo() : permet de déplacer la page vers une position précise.
}); //top : indique la position verticale à atteindre.  0 = tout en haut de la page. 500 = 500 pixels plus bas.
// behavior: "smooth" : fait défiler la page doucement, avec une animation.

// elementBtnTop = document.getElementById("btnTop") et elementBtnTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" });
// Permettent de remonter tout en haut lors du click sur le bouton
console.log("position actuel du défilement ==>" + window.scrollY);

// La fonction créer une boucle qui parcour tout le tableau d'objet ( tout les objets dans le tableau)
const afficheNom = (tableau) => {
  for (let i = 0; i < tableau.length; i++) {
    //-------------- Apparition du nom et traduction--------------------
    //  .name et .meaning sont les clés des objets que je souhaite
    console.log(tableau[i].name + " - " + tableau[i].meaning); //console.log(nameOfAllah[i].name + " " + nameOfAllah[i].meaning) affichent les valeur des clés
    const nameAndMeaning = tableau[i].name + " - " + tableau[i].meaning;
    const card = document.createElement("div"); // Création d'une div pour contenir le baliseNameAndMeaning et baliseExplanation

    const baliseNameAndMeaning = document.createElement("h2"); // document.createElement("h2"); permet de créer une balise HTML directement en JS
    baliseNameAndMeaning.textContent = "▸ " + nameAndMeaning; // .textContent permet de mettre du contenue dans la balise HTML

    // ---------------- Apparution/disparution de l'explication ---------------

    // Faire apparaitre l'explication du Nom (baliseExplanation) l'orsqu'on click sur le Nom (baliseNameAndMeaning)

    const baliseExplanation = document.createElement("p");
    baliseExplanation.textContent = tableau[i].explanation; // la balise contien l'explication du Nom
    baliseExplanation.classList.add("details"); // .classList.add("details") va récupérer la class nommé details dans le css (consultation.css) qui cache le contenu (display:none)

    card.appendChild(baliseNameAndMeaning);
    card.appendChild(baliseExplanation);
    card.classList.add("card");
    element.appendChild(card);

    // Une fois baliseNameAndMeaning et baliseExplanation creer je les stocks dans arrayAllOfNames qui sera tout les Noms cacher
    arrayAllOfNames.push({
      title: baliseNameAndMeaning,
      explanation: baliseExplanation,
      label: nameAndMeaning,
    });

    // Lorsque je clic sur

    baliseNameAndMeaning.addEventListener("click", () => {
      for (let j = 0; j < arrayAllOfNames.length; j++) {
        // si baliseExplanation est different de l'explication de l'index de arrayAllOfNames[j]
        if (baliseExplanation !== arrayAllOfNames[j].explanation) {
          // l'explication est caché
          arrayAllOfNames[j].explanation.classList.add("details");
          // et montre "▸ " + le Nom et le sens
          arrayAllOfNames[j].title.textContent =
            "▸ " + arrayAllOfNames[j].label;
        }
        if (baliseExplanation.classList.contains("details")) {
          // Si l'explication est caché

          baliseNameAndMeaning.textContent = "▾ " + nameAndMeaning; // on affiche ceci
        } else {
          baliseNameAndMeaning.textContent = "▸ " + nameAndMeaning; // Sinon on affiche cela
        }
      }
      baliseExplanation.classList.toggle("details"); // .toggle fait ajouter ou retirer le class CSS ("détails")
    });
  }
};

// document.getElementById("listName") récupère l'élément HTML qui porte l'id "listName",
// pour qu'on puisse le manipuler depuis le JS (y ajouter du contenu, etc.)
// il récupère la div elle-même (la balise entière, avec toutes ses propriétés : son contenu actuel, son style, ses attributs...).
let element = document.getElementById("listName");
afficheNom(nameOfAllah);
