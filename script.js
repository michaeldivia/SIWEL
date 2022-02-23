
//Variable avec les éléments principaux à tester
var elementsPrincipaux = ["C","H","O"];

//Variable Regex qui permet de vérifier l'inscription de l'utilisateur
var regexTestElements = /^[COH0-9\-]+$/;

//Variable qui contiendra la formule brute sans les nombres (avec les lettres répétées)
var formuleBruteSansNombres="";

//Variable qui contiendra la formule brute finale
var formuleBruteFinale="";

/**
 * conversionFormuleSemiDeveloppee()
 * Date : 04.02.2022
 * Dernière modification : Esteban Lopez
 * Permet d'enlever les - et répéter le nombre de fois un élément selon le nombre inscrit
 */
function conversionFormuleSemiDeveloppee()
{
  //Permet de récupérer l'entrée de l'utilisateur (formule semi-developpée)
  str_formuleSemi = document.getElementById("atomsToDecompose").value;


  if(!testSiElementEstValide() || !testDernierElement())
  {
    document.getElementById("inputFormuleSemi").className = document.getElementById("inputFormuleSemi").className + " has-error";
    return null;
  }
  else
  {
    document.getElementById("inputFormuleSemi").className = document.getElementById("inputFormuleSemi").className = "input-group";
  }

  //Sépare la formule semi-developpée (par -)
  array_formule = str_formuleSemi.split("-");

  //Variable qui récupérera la formule au complet
  var completedFormula = "";
  var formuleAvecTirets = "";

  //Parcourt chaque ensemble d'éléments séparé
  array_formule.forEach((element) => {

    //Récupère les lettres des atomes ainsi que les numéros
    var arrayElements = element.split("");

    arrayElements.forEach((element) => {
      
      if(element.match(/\d+/g))
      {
        //Récupère la lettre qui doît être répétée
        var letterToRepeat = completedFormula.slice(-1);

        //Récupère le nombre de fois que celle-ci doît être répétée
        var numberedFormula = letterToRepeat.repeat(element-1);

        //Rajoute l'élément répétée dans la formule
        completedFormula+=numberedFormula;

      }
      else
      {
        //Rajoute l'élément dans la formule
        completedFormula+=element;
        formuleAvecTirets+=element+"-";
      }
    })
    
  });

  console.log(completedFormula);

  //Exécute la fonction formuleBrute()
  formuleBrute(completedFormula);

  //Réinitialisation des variables avec les formules
  completedFormula="";
  formuleBruteFinale="";

}

/**
 * formuleBrute()
 * Date : 04.02.2022
 * Dernière modification : Esteban Lopez
 * Permet de récupérer le nombre d'éléments ainsi que leur nombre d'occurences puis crée la formule brute
 */
function formuleBrute(completedFormula){

  //Parcourt le tableau qui contient les éléments à tester
  elementsPrincipaux.forEach((element) => {

    //Création du Regex (Expression Regulière) qui contient l'élément 
    var re = new RegExp(element, 'g');

    //Compte combien de fois l'élément se trouve dans la formule semi-developpée
    var count = (completedFormula.match(re) || []).length;

    if(count!=0)
    {
      //Rajoute l'élément ainsi que le nombre d'apparitions dans la formule brute finale
      formuleBruteFinale+=element+count;
    }
    

  })

  console.log(formuleBruteFinale);

  //Affiche la formule brute sur la page
  document.getElementById("spanFormuleBrute").innerHTML = formuleBruteFinale;
}

/**
 * testSiElementEstValide()
 * Date : 05.02.2022
 * Dernière modification : Esteban Lopez
 * Permet de vérifier que la formule inscrite par l'utilisateur respecte les normes
 */
function testSiElementEstValide()
{
  return regexTestElements.test(str_formuleSemi);
}

/**
 * testDernierElement()
 * Date : 23.02.2022
 * Dernière modification : Michael Divia
 * Permet de vérifier que la formule inscrite par l'utilisateur ce termine bien par une lettre ou un chiffre précédé d'une lettre
 */
function testDernierElement()
{
  if(str_formuleSemi.slice(-1) == "-")
  {
    return false;
  }
  else
  {
    if(isNaN(str_formuleSemi.slice(-1)))
    {
      return true;
    }
    else
    {
      return /^[COH]/.test(str_formuleSemi.slice(-2));  
    }
  }
}