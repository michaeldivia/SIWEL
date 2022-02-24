//Variable avec les éléments principaux à tester
var elementsPrincipaux = ["C","H","O"];

//Variable Regex qui permet de vérifier l'inscription de l'utilisateur
var regexTestElements = /^[COH0-9\-]+$/;

//Variable qui contiendra la formule brute sans les nombres (avec les lettres répétées)
var formuleBruteSansNombres="";

//Variable qui contiendra la formule brute finale
var formuleBruteFinale="";
var cValue=4;
var hValue=1;
var oValue = 2;

var counterEmplacement = 0;

/*
  [0] = Centre
  [1] = Nombre de liaisons à gauche
  [2] = Gauche
  [3] = Nombre de liaisons en haut
  [4] = Haut
  [5] = Nombre de liaisons en bas
  [6] = Bas
  [7] = Nombre de liaisons à droite
  [8] = Droite
*/

//Création des variables pour réaliser la formule de Lewis
let emplacements = ["","","","","","","","",""];
arrayTotalEmplacements = [];
var regleOctet = 0;
var valeurRestante = 0;
var liaison = false;
var erreurDansLiaison = false;
var sommeElements = 0;
var dernierElement = false;

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


  if(!testSiElementEstValide() || !testDernierElement() || !testPremierElement())
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
  var sommeElements = 0;

  //Parcourt chaque ensemble d'éléments séparé
  array_formule.forEach((element) => {

    var formula = "";
    var counterElement = 0;
    //Récupère les lettres des atomes ainsi que les numéros
    var arrayElements = element.split("");

    arrayElements[arrayElements.length] = "-";

    arrayElements.forEach((element) => {
      
      if(element.match(/\d+/g))
      {
        //Récupère la lettre qui doît être répétée
        var letterToRepeat = completedFormula.slice(-1);

        //Récupère le nombre de fois que celle-ci doît être répétée
        var numberedFormula = letterToRepeat.repeat(element-1);

        //Récupère le nombre de célibataires de l'Élement
        valeurAAdditionner = nombreCelibatairesElement(letterToRepeat);

        //Ajoute la valeur du nombre de célibataires mulitplié par le nombre de fois qu'il apparaît dans la formule
        sommeElements+= valeurAAdditionner*element;

        //Rajoute l'élément répétée dans la formule
        completedFormula+=numberedFormula;
        formula+=numberedFormula;

      }
      else if(element == "-")
      {
        formuleAvecTirets+=formula+"-"; 
      }
      else
      {
        //Rajoute l'élément dans la formule
        completedFormula+=element;
        formula +=element;

        //Récupère la prochaine valeur du tableau 
        var nextvalue = arrayElements[counterElement+1]

        //Si la prochaine valeur n'est pas un nombre
        if(!nextvalue.match(/\d+/g))
        {
          //Récupère le nombre de célibataires de l'Élement
          valeurAAdditionner = nombreCelibatairesElement(element);

          //Additionne la valeur du nombre de celibataires au total
          sommeElements+= valeurAAdditionner;
        }
        
      }
      counterElement++;
    })
  });

  //Si la somme des celibataires n'est pas un nombre paire
  if(sommeElements %2!=0)
  {
    alert("Formule fausse");
    return;
  }

  //Exécute la fonction formuleBrute()
  formuleBrute(completedFormula);
  formuleAvecTirets = formuleAvecTirets.slice(0,-1);
  formuleLewis(formuleAvecTirets);


  //document.location.href="formuleDeveloppee.php?formuleInscrite="+completedFormula;

  //Réinitialisation des variables avec les formules
  completedFormula="";
  formuleBruteFinale="";
}

/**
 * formuleLewis()
 * Date : 23.02.2022
 * Dernière modification : Esteban Lopez
 * Permet de créer la formule de Lewis et mettre la position des elements dans un tableau 
 */
function formuleLewis(formuleSemiDeveloppeeConvertie)
{
  //Réinitialisation des variables
  emplacements = ["","","","","","","","",""];
  arrayTotalEmplacements = [];
  regleOctet = 0;
  valeurRestante = 0;
  liaison = false;
  erreurDansLiaison = false;
  dernierElement = false;

  if(formuleSemiDeveloppeeConvertie.includes("-"))
  { 
    array_formuleSemi = formuleSemiDeveloppeeConvertie.split("-");

    
    //Parcourt chaque ensemble d'éléments séparé
    array_formuleSemi.forEach((groupeElementChimique) => 
    {
      
      //Récupère les lettres des atomes ainsi que les numéros
      var elementsAPlacer = groupeElementChimique.split("");

      parcourirElements(elementsAPlacer);
      
      arrayTotalEmplacements.push(emplacements);

      counterEmplacement = 0;
      if(regleOctet>0)
      {
        valeurRestante = regleOctet;
        regleOctet = 0;
        liaison = true;
      }

      if(erreurDansLiaison)
      {
        return;
      }
  });
    
  }
  else
  {
    var elementsAPlacer = formuleSemiDeveloppeeConvertie.split("");

    parcourirElements(elementsAPlacer);
    arrayTotalEmplacements.push(emplacements);
  }

  if(erreurDansLiaison && !dernierElement)
  {
    arrayTotalEmplacements=[];
  }
  else
  {
    console.log(arrayTotalEmplacements);
  }

}

function parcourirElements(elementsFormule)
{
  emplacements = ["","","","","","","","",""];
  
  if(erreurDansLiaison)
  {
    console.log("Erreur dans liaison");
    dernierElement = false;
    return;
  }

  elementsFormule.forEach((elementChimique) => 
  {
    var valeurASoustraire = 0;

    if(erreurDansLiaison)
    {
      
      return;
    }

    if(counterEmplacement == 1 && liaison == true)
    {
      emplacements[counterEmplacement] = valeurRestante;
      valeurRestante=0;
      counterEmplacement+=2;
      liaison = false;
    }


    switch(elementChimique)
    {
      case "C":
        if(regleOctet!=0)
        {
          valeurASoustraire = cValue;
        }
        else
        {
          regleOctet = cValue;
        }
        break;

      case "O":
        if(regleOctet!=0)
        {
          valeurASoustraire = oValue;
        }
        else
        {
          regleOctet = oValue;
        }

        break;
      
      case "H":
        if(regleOctet!=0)
        {
          valeurASoustraire = hValue;
        }
        else
        {
          regleOctet = hValue;
        }
        break;
    }

    if(valeurRestante != 0)
    {
      regleOctet = regleOctet-valeurRestante;
      
    }



    //C'est pas un C
    if(valeurASoustraire != 0)
    {
      //Pas de double/triple relation
      if(regleOctet-valeurASoustraire < 0)
      {
        var valeurElement = valeurASoustraire;

        valeurASoustraire--;

        if(regleOctet-valeurASoustraire < 0)
        {
          console.log("wtf");
          
          //Impossible normalement
        }
        else
        {
          regleOctet=valeurElement-regleOctet;
          emplacements[counterEmplacement] = valeurASoustraire;
          emplacements[counterEmplacement+1] = elementChimique;
          arrayTotalEmplacements.push(emplacements);
          emplacements = ["","","","","","","","",""];
          liaison = true;
          counterEmplacement = 0;
        }
      }

      
        if(regleOctet-valeurASoustraire == 0 && counterEmplacement!= 0)
        {
          emplacements[emplacements.length-2] = valeurASoustraire; 
          emplacements[emplacements.length-1] = elementChimique;

          erreurDansLiaison = true;
          dernierElement = true;
          
          
        }
        else if(!liaison)
        {
          regleOctet = regleOctet-valeurASoustraire;
          emplacements[counterEmplacement] = valeurASoustraire;
          emplacements[counterEmplacement+1] = elementChimique;
        }
        counterEmplacement+=2;


    }
    //Donc c'est l'element au centre
    else
    {
      emplacements[counterEmplacement] = elementChimique;
      counterEmplacement++;
    }

    
  });
}

function nombreCelibatairesElement(elementChimique)
{
  switch(elementChimique)
  {
    case "O":
      return oValue;
    case "C":
      return cValue;
    case "H":
      return hValue;
  }
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

    if(count!=0 && count >1)
    {
      //Rajoute l'élément ainsi que le nombre d'apparitions dans la formule brute finale
      formuleBruteFinale+=element+count;
    }
    else if(count == 1)
    {
      formuleBruteFinale+=element;
    }
  })

  
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

/**
 * testPremietElement()
 * Date : 23.02.2022
 * Dernière modification : Michael Divia
 * Permet de vérifier que le premier charactère est bien une lettre
 */
 function testPremierElement()
{
  return /^[COH]/.test(str_formuleSemi.slice(0));  
}
