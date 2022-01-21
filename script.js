/**
 * Commentaire : Fonction qui fait la conversion complète de la formule semi-developpé en formule de lewis
 * Auteur: Hugo Germano
 */
function StartConvert(){
  //récupère la formule que l'utilisateur a tapé dans l'input
  initial_value = document.getElementsByTagName("input")[0].value;
  //vérifie si la valeur que l'utilisateur a rentré correspond aux formules qu'on autorise
  // Si c'est juste, transforme la formule pour qu'elle soit plus pratique à utiliser pour la suite
  if(check_content(initial_value) != false){
    //transforme la formule entré par l'utilisateur
    formula = transformFormula(initial_value);
    //si la formule a été transformé avec succès, affichage à l'utilisateur
    if(formula != null){
      //affichage de la formule
      displayFormula(formula);
    }
  }
  //Si c'est faux, alerte l'utilisateur que la formule n'est pas juste
  else{
    displayError("Votre formule n'est pas juste.");
  }
}
/*
* Commentaire : décomposition de la formule entré par l'utilisateur en morceau plus utilisable
* Auteur : Hugo Germano
* @params : char ; string de la formule entré par l'utilisateur
*/
function transformFormula(char){
  //déclaration des variables pour l'algorithme
  tempLetter = null;
  tempNumber = null;
  error = 0;
  newString = "";
  displayString = "";
  //séparation des différentes petites formules au sein de la grande formule
  array = char.split("-");
  //foreach qui va parcourir chaque petite formule
  array.forEach((element, key) => {
    //création du tableau et foreach de chaque charactère du tableau
    table = Array.from(element);
    table.forEach( (element, key, arr) =>{
      //vérifie si c'est un élément autorisé
      if(isAuthorizedElement(element)){
        //vérifie si une lettre est déjà en cours dans le programme
        if(tempLetter != null){
          // si un nombre à la dernière itération a été déclaré
          if(tempNumber != null){
            // transforme le string en int
            a = parseInt(tempNumber);
            //ajoute autant de fois l'élément à la grande formule qu'il y a de nombre
            for(let i = 0; i < a; i++){
              newString += tempLetter;
            }
            //remet les nombres à null
            tempNumber = null;
            //met le bon élément à la templetter
            tempLetter=element;
          }
          
          else{
            newString += tempLetter;
            tempLetter=element;
          }
        }
        else{
          tempLetter=element;
        }
        if(Object.is(arr.length - 1, key)){            
          newString += element;
        }
      }
      //vérifie si c'est un nombre
      else if(isANumber(element)){
        //vérifie si un nombre n'est pas déjà en cours
        if(tempNumber != null){
          //ajoute le nombre à celui de la précèdante itération
          tempNumber += element;
          //vérifie si on est à la dernière case du tableau
          if(Object.is(arr.length - 1, key)){
            //convertit le string en int
            a = parseInt(tempNumber);
            //ajoute le nombre de fois la la lettre de la dernière itération autant que fois que le nombre indique
            for(let i = 0; i < a; i++){
              newString += tempLetter;
            }
            //remets les valeurs à null
            tempNumber = null;
            tempLetter=null;
          }
        }
        //vérifie si une lettre a été mise en mémoire à la dernière itération, si non, alerte l'utilisateur qu'une lettre est seule
        else if(tempLetter == null){
          displayError("Un nombre est tout seul !");
          // erreur déclaré pour plus tard
          error =1;
        }
        //si la lettre n'est pas null, ajoute la lettre autant de fois que le nombre l'indique
        else{
          tempNumber=element;
          if(Object.is(arr.length - 1, key)){
            a = parseInt(tempNumber);
            for(let i = 0; i < a; i++){
              newString += tempLetter;
            }
            tempNumber = null;
            tempLetter=null;
          }
        }
      }
    });
    //si première petite formule, ajoute directement le string sans tiret à la grande formule transformé
    if(key == 0){
      displayString += newString;
    }
    //sinon ajoute la petite formule avec un tiret devant
    else{
      displayString += "-" +newString;
    }
    //réinitialise à "zéro" les différentes variables
    newString ="";
    tempNumber = null;
    tempLetter=null;
  });
  //si il n'y a pas eu d'erreur, il continu
  if(error == 0){
    //si la formule est plus courte que 100, il l'affiche à l'utilisateur
    if(displayString.length < 100){
      return displayString;
    }
    // si plus grand que 100, prévient que l'utilisateur que la formule est trop longue
    else{
      displayError("La formule est trop longue !");
    }
  }
  // si il y a une erreur, retourne null
  else{
    return null;
  }
}
function displayFormula(char){
  document.getElementById("displayLewis").innerHTML = char;
  document.getElementById('search_bar').classList.remove('error');
}
function displayError(char){
  alert(char);
  document.getElementById("search_bar").className = "error";
}
function isAuthorizedElement(char) {
  return (/H|O|C/).test(char)
}
function isANumber(char) {
  return (/[0-9]/).test(char)
}
function check_content(brute)
{
  if (!/^[COH0-9\-]+$/.test(brute))
  {
    return false;
  }
}