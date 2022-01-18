function StartConvert(){
  tempLetter = null;
  tempNumber = null;
  error = 0;
  newString = "";
  initial_value = "";
  displayString = "";
  initial_value = document.getElementsByTagName("input")[0].value;
  array = initial_value.split("-");
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
          document.getElementById("search_bar").className = "error";
          alert("Un nombre est tout seul !");
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
      else{
        document.getElementById("search_bar").className = "error";
        alert("Ceci n'est pas un caractère autorisé");
        error =1;
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
      document.getElementById("displayLewis").innerHTML = displayString;
      document.getElementById('search_bar').classList.remove('error');
    }
    else{
      document.getElementById("search_bar").className = "error";
      alert("La formule est trop longue !");
    }
  }
}

function isAuthorizedElement(char) {
  return (/H|O|C/).test(char)
}
function isANumber(char) {
  return (/[0-9]/).test(char)
}
function check_content(brute)
{
  if (!/^[COHcoh0-9\-]+$/.test(brute))
  {
    return false;
  }
}

function break_down(brute)
{

}