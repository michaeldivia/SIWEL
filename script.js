var initial_value;
var is_break;

function StartConvert()
{
  initial_value = "";
  is_break = "";

  initial_value = document.getElementsByTagName("input")[0].value;

  break_down(initial_value);
}

function break_down(brute)
{
  for (var i = 0; i < brute.length; i++)
  {
    if (!isNaN(brute[i]))
    {
      is_break = is_break.concat(brute[i-1]);
    }
    else
    {
      is_break = is_break.concat(brute[i]);
    }
 }
 alert(is_break);
}