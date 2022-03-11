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

Table des éléments = array_elements
Table des fonctions organique = array_fonction_organique

*/

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
    document.getElementById("inputFormuleSemi").className = document.getElementById("inputFormuleSemi").className + " has-error";
    return;
  }

  //Exécute la fonction formuleBrute()
  formuleBrute(completedFormula);
  formuleAvecTirets = formuleAvecTirets.slice(0,-1);
  formuleLewis(formuleAvecTirets);

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
  counterEmplacement = 0;

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
    dessinercestgagner();
  }

}

function parcourirElements(elementsFormule)
{
  emplacements = ["","","","","","","","",""];
  
  if(erreurDansLiaison)
  {
    document.getElementById("inputFormuleSemi").className = document.getElementById("inputFormuleSemi").className + " has-error";
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
    


    if(regleOctet!=0)
    {
      valeurASoustraire = nombreCelibatairesElement(elementChimique);
    }
    else
    {
      regleOctet = nombreCelibatairesElement(elementChimique);
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
          document.getElementById("inputFormuleSemi").className = document.getElementById("inputFormuleSemi").className + " has-error";
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

    //Permet de rajouter la liaison à gauche si le groupe ne possède qu'un élément chimique
    if(elementsFormule.length <=1 && liaison==true)
    {
      emplacements[counterEmplacement] = valeurRestante;
      valeurRestante = 0;
      liaison = false;
    }

    
  });
}

function nombreCelibatairesElement(elementChimique)
{

  array_elements.forEach((element) => {

    
    if(elementChimique==element[1])
    {
      valueOfElement = parseInt(element[2]);

      
    }
  });

  return valueOfElement;
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

/**
 * dessinercestgagner()
 * Date : 24.02.2022
 * Dernière modification : Michael Divia
 * Permet de dessiner la formule de LEWIS
 */
function dessinercestgagner()
{
  const myNode = document.getElementById("Lewis");
  myNode.innerHTML = '';

  var node = document.createElement("div");
  node.classList.add('table_row');
  node.setAttribute('id', 'row_1');
  document.getElementById("Lewis").appendChild(node);

  for(z=0;z<2;z++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_1").appendChild(node);
  }

  for(i=0;i<arrayTotalEmplacements.length;i++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    var newContent = document.createTextNode(arrayTotalEmplacements[i][4]);

    var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][4]));

    if(row !== -1)
    {
      switch(array_elements[row][3])
      {
      case "1":
        node.classList.add('left');
        break;
      case "2":
        node.classList.add('left_and_right');
        break;
      }
    }

    node.appendChild(newContent)
    document.getElementById("row_1").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_1").appendChild(node);
  }

  var node = document.createElement("div");
  node.classList.add('block');
  document.getElementById("row_1").appendChild(node);

  var node = document.createElement("div");
  node.classList.add('table_row');
  node.setAttribute('id', 'row_2');
  document.getElementById("Lewis").appendChild(node);

  for(z=0;z<2;z++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_2").appendChild(node);
  }

  for(i=0;i<arrayTotalEmplacements.length;i++)
  {
    var node = document.createElement("div");
    node.classList.add('block');

    switch(arrayTotalEmplacements[i][3])
    {
      case 1:
        node.classList.add('V1');
        break;
      case 2:
        node.classList.add('V2');
        break;
      case 3:
        node.classList.add('V3');
        break;
      case 4:
        node.classList.add('V4');
        break;
    }

    document.getElementById("row_2").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_2").appendChild(node);
  }

  var node = document.createElement("div");
  node.classList.add('block');
  document.getElementById("row_2").appendChild(node);

  var node = document.createElement("div");
  node.classList.add('table_row');
  node.setAttribute('id', 'row_3');
  document.getElementById("Lewis").appendChild(node);

  if(arrayTotalEmplacements.length == 1 && arrayTotalEmplacements[0][2] == "" && arrayTotalEmplacements[0][3] == "" && arrayTotalEmplacements[0][4] == "" && arrayTotalEmplacements[0][5] == "" && arrayTotalEmplacements[0][6] == "")
  {
    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_3").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    var newContent = document.createTextNode(arrayTotalEmplacements[0][0]);
    node.appendChild(newContent)
    var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[0][0]));

    if(row !== -1)
    {
      switch(array_elements[row][3])
      {
      case "1":
        node.classList.add('top');
        break;
      case "2":
        node.classList.add('top_and_bottom');
        break;
      }
    }
    document.getElementById("row_3").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    switch(arrayTotalEmplacements[0][7])
    {
      case 1:
        node.classList.add('H1');
        break;
      case 2:
        node.classList.add('H2');
        break;
      case 3:
        node.classList.add('H3');
        break;
      case 4:
        node.classList.add('H4');
        break;
    }
    document.getElementById("row_3").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    var newContent = document.createTextNode(arrayTotalEmplacements[0][8]);
    node.appendChild(newContent)
    var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[0][8]));

    if(row !== -1)
    {
      switch(array_elements[row][3])
      {
      case "1":
        node.classList.add('top');
        break;
      case "2":
        node.classList.add('top_and_bottom');
        break;
      }
    }
    document.getElementById("row_3").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_3").appendChild(node);
  }
  else
  {
    for(i=0;i<arrayTotalEmplacements.length;i++)
    {
      for(x=0;x<9;x++)
      {
        if(x<3 || x>6)
        {
          if(i==0)
          {
            if(arrayTotalEmplacements[i][2] == "")
            {
              for(z=0;z<2;z++)
              {
                var node = document.createElement("div");
                node.classList.add('block');
                document.getElementById("row_3").appendChild(node);
              }
            }
            else
            {
              switch(x)
              {
                case 0:
                  var node = document.createElement("div");
                  node.classList.add('block');
                  var newContent = document.createTextNode(arrayTotalEmplacements[i][x+2]);
                  node.appendChild(newContent)
                  var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][x+2]));

                  if(row != -1)
                  {
                    switch(array_elements[row][3])
                    {
                    case "1":
                      node.classList.add('top');
                      break;
                    case "2":
                      node.classList.add('top_and_bottom');
                      break;
                    }
                  }
                  document.getElementById("row_3").appendChild(node);
                  break;
                case 1:
                  var node = document.createElement("div");
                  node.classList.add('block');
                  switch(arrayTotalEmplacements[i][x])
                  {
                    case 1:
                      node.classList.add('H1');
                      break;
                    case 2:
                      node.classList.add('H2');
                      break;
                    case 3:
                      node.classList.add('H3');
                      break;
                    case 4:
                      node.classList.add('H4');
                      break;
                  }
                  document.getElementById("row_3").appendChild(node);
                  break;
                case 2:
                  var node = document.createElement("div");
                  node.classList.add('block');
                  var newContent = document.createTextNode(arrayTotalEmplacements[i][x-2]);

                  var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][x-2]));

                  if(row != -1)
                  {
                    switch(array_elements[row][3])
                    {
                    case "1":
                      node.classList.add('left');
                      break;
                    case "2":
                      node.classList.add('top_and_bottom');
                      break;
                    }
                  }

                  node.appendChild(newContent)
                  document.getElementById("row_3").appendChild(node);
                  break;
              }
            }
          }
          else
          {
            switch(x)
            {
              case 0:
                var node = document.createElement("div");
                node.classList.add('block');
                switch(arrayTotalEmplacements[i][x+1])
                {
                  case 1:
                    node.classList.add('H1');
                    break;
                  case 2:
                    node.classList.add('H2');
                    break;
                  case 3:
                    node.classList.add('H3');
                    break;
                  case 4:
                    node.classList.add('H4');
                    break;
                }
                document.getElementById("row_3").appendChild(node);
                break;
              case 1:
                var node = document.createElement("div");
                node.classList.add('block');
                var newContent = document.createTextNode(arrayTotalEmplacements[i][x-1]);

                var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][x-1]));

                if(row !== -1)
                {
                  switch(array_elements[row][3])
                  {
                  case "1":
                    node.classList.add('left');
                    break;
                  case "2":
                    node.classList.add('top_and_bottom');
                    break;
                  }
                }

                node.appendChild(newContent)
                document.getElementById("row_3").appendChild(node);
                break;
            }
          }
          if(i+1 == arrayTotalEmplacements.length && x>6)
          {
            if(arrayTotalEmplacements[i][x] == "")
            {
              for(z=0;z<2;z++)
              {
                var node = document.createElement("div");
                node.classList.add('block');
                document.getElementById("row_3").appendChild(node);
              }
            }
            else
            {
              if(x==7)
              {
                var node = document.createElement("div");
                node.classList.add('block');
                switch(arrayTotalEmplacements[i][x])
                {
                  case 1:
                    node.classList.add('H1');
                    break;
                  case 2:
                    node.classList.add('H2');
                    break;
                  case 3:
                    node.classList.add('H3');
                    break;
                  case 4:
                    node.classList.add('H4');
                    break;
                }
                document.getElementById("row_3").appendChild(node);
              }
              else if(x==8)
              {
                var node = document.createElement("div");
                node.classList.add('block');
                var newContent = document.createTextNode(arrayTotalEmplacements[i][x]);

                var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][x]));

                if(row != -1)
                {
                  switch(array_elements[row][3])
                  {
                  case "1":
                    node.classList.add('right');
                    break;
                  case "2":
                    node.classList.add('top_and_bottom');
                    break;
                  }
                }

                node.appendChild(newContent)
                document.getElementById("row_3").appendChild(node);
              }
            }
          }
        }
      }
    }
  }

  var node = document.createElement("div");
  node.classList.add('table_row');
  node.setAttribute('id', 'row_4');
  document.getElementById("Lewis").appendChild(node);

  for(z=0;z<2;z++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_4").appendChild(node);
  }

  for(i=0;i<arrayTotalEmplacements.length;i++)
  {
    var node = document.createElement("div");
    node.classList.add('block');

    switch(arrayTotalEmplacements[i][5])
    {
      case 1:
        node.classList.add('V1');
        break;
      case 2:
        node.classList.add('V2');
        break;
      case 3:
        node.classList.add('V3');
        break;
      case 4:
        node.classList.add('V4');
        break;
    }

    document.getElementById("row_4").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_4").appendChild(node);
  }

  var node = document.createElement("div");
  node.classList.add('block');
  document.getElementById("row_4").appendChild(node);

  var node = document.createElement("div");
  node.classList.add('table_row');
  node.setAttribute('id', 'row_5');
  document.getElementById("Lewis").appendChild(node);

  for(z=0;z<2;z++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_5").appendChild(node);
  }

  for(i=0;i<arrayTotalEmplacements.length;i++)
  {
    var node = document.createElement("div");
    node.classList.add('block');
    var newContent = document.createTextNode(arrayTotalEmplacements[i][6]);

    var row = array_elements.findIndex(row => row.includes(arrayTotalEmplacements[i][6]));

    if(row !== -1)
    {
      switch(array_elements[row][3])
      {
      case "1":
        node.classList.add('left');
        break;
      case "2":
        node.classList.add('left_and_right');
        break;
      }
    }

    node.appendChild(newContent)
    document.getElementById("row_5").appendChild(node);

    var node = document.createElement("div");
    node.classList.add('block');
    document.getElementById("row_5").appendChild(node);
  }

  var node = document.createElement("div");
  node.classList.add('block');
  document.getElementById("row_5").appendChild(node);

}