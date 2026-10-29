// import { nameOfAllah } du tableau d'objet from "./names.js";

import { nameOfAllah } from "../script/data/names.js";

//----------------------------------- FONCTION POUR CREER UN CHIFFRE ALEATOIRE --------------------------------------

// Création de la fonction random avec 2 paramètres un min (0) et un max (la longeur tu tableau d'objet -1)
// Qui permet de générer un nombre aléatoire
const random = (min, max) => {
  // la fonction return un Math.random pour générer un chiffre entre 0 et 1 multiplier par le plus grans moin le plus petit plus le min dû au decalage
  // Math.floor() permet d'arrondire le résultat
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// document.getElementById("zoneQuiz") récupère l'élément HTML qui porte l'id "zoneQuiz",
// pour qu'on puisse le manipuler depuis le JS (y ajouter du contenu, etc.)
// il récupère la div elle-même (la balise entière, avec toutes ses propriétés : son contenu actuel, son style, ses attributs...).
let elementQuiz = document.getElementById("zoneQuiz");
let elementScore = document.getElementById("scoreDisplay"); // la variable est mise à l'extérieur de la founction pour qu'elle puisse ne pas être éffacé à chaque tour à cause de elementQuiz.innerHTML = ""
let elementQuestion = document.getElementById("questionDisplay");
let confirmToExit = document.getElementById("backHome");

let score = 0;
let counter = 0; // le nombre de questions

confirmToExit.addEventListener("click", (event) => {
  if (counter > 0 && counter < 10) {
    const exit = confirm("Quitter la partie ? Ta progression sera perdue");
    if (exit === false) {
      event.preventDefault();
    }
  }
});

// --------------FONCTION POUR AFFICHER LES ELEMENTS D'UN TABLEAU D'OBJET EN FONCTION DU NOMBRE ALEATOIRE---------------

// La fonction afficheNameRandom créer une var (randomNumber) qui appel la fonction random ac 2 argument : 0 et la longeur du tableau - 1 pour créer un nombre aléatoire
// la fonction créer également une var (nameRandom) qui contient les valeurs des clés du tableau d'objet
// La fonction créer aussi une var (newbalisePForQuiz) qui créer un élément dans le html (document.createElement("p");)
// newbalisePForQuiz.textContent permet de mettre du contenue (nameRandom) dans la balise HTML
// // .appenChild permet d'insérer dans la page web
const afficheNameRandom = () => {
  let randomNumber = random(0, nameOfAllah.length - 1);
  let nameOrMeaning = random(0, 1); // variable qui stock un chiffre aléatoire (0 ou 1)pour choisir le type de question (Nom => sens ou sens => Nom)
  elementQuestion.textContent = "Question : " + (counter + 1) + "/10"; //permet de commencer à 1

  // Création de 2 var pour stocker les clés. le IF permet de varier le quizz en fonction du chiffre du resultat de nameOrMeaning:
  //  Si nameOrMeaning === 0 le quizz donne la traduction et propose 4 Noms
  // Sinon le quizz donne 1 Nom et propose 4 Traductions
  let cleQuestion;
  let cleProposition;
  let consigne;
  if (nameOrMeaning === 0) {
    cleQuestion = "meaning";
    cleProposition = "name";
    consigne = "Trouve le bon NOM parmi les 4 propositions";
  } else {
    cleQuestion = "name";
    cleProposition = "meaning";
    consigne = "Trouve la bonne SIGNIFICATION parmi les 4 propositions";
  }

  // Creation des 4 propositions (1 bonne réponse et 4 fausse)
  let arrayProposition = [randomNumber];

  // Tant que la longeur du tableau arrayProposition est inférieur à 3
  // on créer une var indexForProposition qui fait appel à la fonction random (créer un chiffre aléatoire avec 2 arguments°
  while (arrayProposition.length < 4) {
    let indexForProposition = random(0, nameOfAllah.length - 1);

    if (!arrayProposition.includes(indexForProposition)) {
      // Si le chiffre aléatoire (indexForProposition) ne figure pas dans le tableau arrayProposition on le met dans le tableau
      arrayProposition.push(indexForProposition);
    }
  }
  console.log(arrayProposition);

  // Pour proposer les choix dans l'ordre aléatoire car la bonne réponse est en 1er position du tableau
  arrayProposition.sort(() => Math.random() - 0.5); // Permet de melanger les élément du tableau

  let baliseConsigne = document.createElement("h2");
  baliseConsigne.textContent = consigne;
  elementQuiz.appendChild(baliseConsigne);

  let nameRandom = nameOfAllah[randomNumber][cleQuestion]; // Affiche le sens (meaning) si nameOrMeaning === 0, sinon il affiche name
  const newbalisePForQuiz = document.createElement("h3");
  newbalisePForQuiz.textContent = nameRandom;
  elementQuiz.appendChild(newbalisePForQuiz);

  let arrayButtonOfProposition = []; // Creation du tableau vide pour stocker les button

  // La boucle sert parcourir le tableau arrayProposition (qui se rempli graçe à la boucle while) et
  //  à afficher les propositions du quizz( variable arrayProposition ) qui contiennent 1 bonne réponse et 3 mauvaise
  for (let i = 0; i < arrayProposition.length; i++) {
    //Stockage du Nom (.name) par rapport à l'index [i] du tableau (arrayProposition)
    const propositions = nameOfAllah[arrayProposition[i]][cleProposition]; // Affiche le sens (meaning) si nameOrMeaning !== 0, sinon il affiche name
    // La var buttoPropositionForQuiz stock la création d'un boutton,
    // .textContent permet d'aficher de mettre le contenue dans la balise HTML
    // .appenChild permet d'insérer dans la page web
    const buttoPropositionForQuiz = document.createElement("button");
    buttoPropositionForQuiz.textContent = propositions;
    elementQuiz.appendChild(buttoPropositionForQuiz);
    arrayButtonOfProposition.push(buttoPropositionForQuiz); // buttoPropositionForQuiz stock les proposition sous forme de boutton et qui va dans la var arrayButtonOfProposition

    //---------------------------------------------------------------------------------------
    // --------------------------  TROUVER LA BONNE/MAUVAISE REPONSE. ---------------------------
    // -------------------retrouver les id de la question et des proposition
    // ---------- Si les 2 id sont strictement égaux bonne réponse + affichage boutton suivant et page html effacer
    // ---------------sinon mauvaise réponse + affichage boutton suivant et page html effacer

    buttoPropositionForQuiz.dataset.id = nameOfAllah[arrayProposition[i]].id; // la var stock l'id de l'index du tableau arrayProposition
    buttoPropositionForQuiz.addEventListener("click", () => {
      let idOfProposition = nameOfAllah[arrayProposition[i]].id.toString();
      console.log(idOfProposition);
      let idOfQuestion = nameOfAllah[randomNumber].id.toString();
      console.log("  👍  " + idOfQuestion);

      if (idOfProposition === idOfQuestion) {
        buttoPropositionForQuiz.classList.add("correct"); // Met en couleur le bouton de la bonne réponse programmé dans quiz.CSS
        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = "✅ Bonne réponse";
        elementQuiz.appendChild(correctAnswer);
        score++;
        elementScore.textContent = "Score : " + score;
      } else {
        // Sinon la réponse est mauvaise, il y a parcour du tableau arrayButtonOfProposition qui rettrouve l'id de la bonne réponse pour la mettre en vert
        for (let k = 0; k < arrayButtonOfProposition.length; k++) {
          //
          if (arrayButtonOfProposition[k].dataset.id === idOfQuestion) {
            // si l'Id de l'index arrayButtonOfProposition est strictement égale à idOfQuestion On met en vert le bouton
            arrayButtonOfProposition[k].classList.add("correct");
          }
        }
        buttoPropositionForQuiz.classList.add("incorrect"); // Met en couleur le bouton de la mauvaise réponse programmé dans quiz.CSS;
        // idOfProposition.classList.add("correct");
        const wrongAnswer = document.createElement("p");
        wrongAnswer.textContent =
          "❌  la réponse est   " + nameOfAllah[randomNumber][cleProposition];
        elementQuiz.appendChild(wrongAnswer);
      }

      for (let j = 0; j < arrayButtonOfProposition.length; j++) {
        // la boucle parcour arrayButtonOfProposition et
        arrayButtonOfProposition[j].disabled = true; // .disabled fait disparaite les boutons
      }
      counter++;
      // const resultBtn = document.createElement("button");
      // resultBtn.textContent = "Voir le résultat";
      if (counter === 10) {
        const finalMessage = document.createElement("p");
        finalMessage.textContent =
          "Quiz terminé ! Score final : " + score + "/10";
        elementQuiz.innerHTML = ""; // elementQuiz.innerHTML = " " Permet de vider la page HTML
        elementQuiz.appendChild(finalMessage);
        const tryAgain = document.createElement("button"); // Création d'un bouton
        tryAgain.textContent = "Recommencer";
        tryAgain.classList.add("btnTryagain");
        elementQuiz.appendChild(tryAgain);
        tryAgain.addEventListener("click", () => {
          elementQuiz.innerHTML = "";
          score = 0;
          counter = 0;
          elementScore.textContent = "Score : " + score; // pour remettre le score à 0 sinon le score reste après recommencer
          afficheNameRandom();
        });
        const exitQuiz = document.createElement("button");
        exitQuiz.textContent = "Quitter";
        exitQuiz.classList.add("btnExit");
        elementQuiz.appendChild(exitQuiz);
        exitQuiz.addEventListener("click", () => {
          window.location.href = "../index.html"; // lors du click sur le bouton quitter, sa renvoi à lapage d'acceuil
        });
      } else {
        const netxQuestion = document.createElement("button");
        netxQuestion.classList.add("btnNext");
        netxQuestion.textContent = "Suivant";
        elementQuiz.appendChild(netxQuestion);
        netxQuestion.addEventListener("click", () => {
          elementQuiz.innerHTML = ""; // elementQuiz.innerHTML = " " Permet de vider la page HTML

          afficheNameRandom();
        });
      }
    });

    console.log(propositions);
  }
};
afficheNameRandom();
