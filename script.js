var initial_value;
var is_break;
var nombre;

function StartConvert(){
  tempLetter = null;
  tempNumber = null;
  newString = "";
  initial_value = "";
  displayString = "";
  initial_value = document.getElementsByTagName("input")[0].value;
  array = initial_value.split("-");
  array.forEach((element, key, arr) => {
    table = Array.from(element);
    table.forEach( (element, key, arr) =>{
      if(isCharacterACapitalLetter(element)){
        if(tempLetter != null){
          //newString += tempLetter;
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
  document.getElementById("displayLewis").innerHTML = displayString;
}

function isCharacterACapitalLetter(char) {
  return (/[A-Z]/).test(char)
}
function isANumber(char) {
  return (/[0-9]/).test(char)
}

/**function StartConvert()
{
  initial_value = "";
  is_break = "";
  nombre = "";
  document.getElementById("seach_bar").className = document.getElementById("seach_bar").className.replace(" error", "");

  initial_value = document.getElementsByTagName("input")[0].value;

  if (check_content(initial_value) == false)
  {
    document.getElementById("seach_bar").className = document.getElementById("seach_bar").className + " error";
    return;
  }

  break_down(initial_value);
}**/

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