var initial_value;
var is_break;
var nombre;

function StartConvert()
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