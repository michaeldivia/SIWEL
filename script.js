function StartConvert(){
  initial_value = document.getElementsByTagName("input")[0].value;
  if(check_content(initial_value) != false){
    formula = transformFormula(initial_value);
    if(formula != null){
      displayFormula(formula);
    }
  }
  else{
    displayError("Votre formule n'est pas juste.");
  }
}
function transformFormula(char){
  tempLetter = null;
  tempNumber = null;
  error = 0;
  newString = "";
  displayString = "";
  array = char.split("-");
  array.forEach((element, key, arr) => {
    table = Array.from(element);
    table.forEach( (element, key, arr) =>{
      if(isAuthorizedElement(element)){
        if(tempLetter != null){
          if(tempNumber != null){
            a = parseInt(tempNumber);
            for(let i = 0; i < a; i++){
              newString += tempLetter;
            }
            tempNumber = null;
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
      else if(isANumber(element)){
        if(tempNumber != null){
          tempNumber += element;
          if(Object.is(arr.length - 1, key)){
            a = parseInt(tempNumber);
            for(let i = 0; i < a; i++){
              newString += tempLetter;
            }
            tempNumber = null;
            tempLetter=null;
          }
        }
        else if(tempLetter == null){
          displayError("Un nombre est tout seul !");
          error =1;
        }
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
    if(key == 0){
      displayString += newString;
    }
    else{
      displayString += "-" +newString;
    }
    newString ="";
    tempNumber = null;
    tempLetter=null;
  });
  if(error == 0){
    if(displayString.length < 100){
      return displayString;
    }
    else{
      displayError("La formule est trop longue !");
    }
  }
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