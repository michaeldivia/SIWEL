
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
  [1] = Gauche
  [2] = Haut
  [3] = Bas
  [4] = Droite
*/
let emplacements = ["","","","","","","","",""];
arryTotalEmplacements = [];
var regleOctet = 0;
var valeurRestante = 0;
var liaison = false;

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

    var formula = "";
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
      }
    })
  });


  //Exécute la fonction formuleBrute()
  formuleBrute(completedFormula);
  formuleAvecTirets = formuleAvecTirets.slice(0,-1);
  formuleLewis(formuleAvecTirets);


  //document.location.href="formuleDeveloppee.php?formuleInscrite="+completedFormula;

  //Réinitialisation des variables avec les formules
  completedFormula="";
  formuleBruteFinale="";




  /*
  $.ajax({
    url:"formuleDeveloppee.php",
    method:"GET",
    dataType="json",
  });*/
}


function formuleLewis(formuleSemiDeveloppeeConvertie)
{
  

  console.log(formuleSemiDeveloppeeConvertie);

  if(formuleSemiDeveloppeeConvertie.includes("-"))
  { 
    array_formuleSemi = formuleSemiDeveloppeeConvertie.split("-");

    
    //Parcourt chaque ensemble d'éléments séparé
    array_formuleSemi.forEach((groupeElementChimique) => 
    {
      
      //Récupère les lettres des atomes ainsi que les numéros
      var elementsAPlacer = groupeElementChimique.split("");

      parcourirElements(elementsAPlacer);
      
    
      arryTotalEmplacements.push(emplacements);

      counterEmplacement = 0;
      if(regleOctet>0)
      {
        valeurRestante = regleOctet;
        regleOctet = 0;
        liaison = true;
        
      }
  });
    
  }
  else
  {
    var elementsAPlacer = formuleSemiDeveloppeeConvertie.split("");

    parcourirElements(elementsAPlacer);
    arryTotalEmplacements.push(emplacements);
  }

  console.log(arryTotalEmplacements);

}

function parcourirElements(elementsFormule)
{
  emplacements = ["","","","","","","","",""];
  

  elementsFormule.forEach((elementChimique) => 
  {
    var valeurASoustraire = 0;
    console.log(elementChimique);

    if(counterEmplacement == 1 && liaison == true)
    {
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
      valeurRestante=0;
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
          arryTotalEmplacements.push(emplacements);
          emplacements = ["","","","","","","","",""];
          liaison = true;
          counterEmplacement = 0;
        }
      }

      
        if(regleOctet-valeurASoustraire == 0 && counterEmplacement!= 0)
        {
          emplacements[emplacements.length-2] = valeurASoustraire; 
          emplacements[emplacements.length-1] = elementChimique; 
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