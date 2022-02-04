<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>SIWEL</title>
		<link rel="stylesheet" href="./style.css">
		<script type="text/javascript" src="./script.js"></script>

		<!-- Bootstrap CDN !-->
		
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">

		<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
	
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
		

	</head>
	<main>
		<body>
			<div class="bodyContainer">
				<div class="title_div">
					<p>
						<span class="titleS">S</span><span class="titleI">I</span><span class="titleW">W</span><span class="titleE">E</span><span class="titleL">L</span>
					</p>
				</div>

				<div class="explanation_div">
					<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
				</div>

				<div class="input-group" id="inputFormuleSemi">
					<span class="input-group-addon" id="spanSemDeveloppee">Formule Semi-developpée</span>
					<input type="text" placeholder="CH3-O2C" class="form-control" aria-describedby="case pour la formule semi-développée" id="atomsToDecompose" value="CH3-CO2" onkeypress="if(window.event.keyCode==13)StartConvert()">
				</div>

				<div class="submit_button_div">
					<button class="btn btn-default btnTransform" onclick="StartConvert()">
						Transformer
					</button>
				</div>
				<button id="testButton" onclick="test()">
					Test
				</button>

				<div class="divResultats">
					<p>
						Formule brute : <span id="spanFormuleBrute"></span> 
					</p>

					<p>
						Formule développée de Lewis : <span id="spanFormuleLewis"></span>
					</p>
				</div>
				<footer id="footer">
					<div class="inner">
						<p>Crée par Michael Divià, Hugo Germano, Esteban Lopez et Henok Sese</p>
						<p>©2022 ETML</p>
					</div>
				</footer>
	  		</div>
		</body>
	</main>
	<script>

		var elementsPrincipaux = ["C","H","O"];

		var formuleBruteSansNombres="";

		var formuleBruteFinale="";

		str_formuleSemi = document.getElementById("atomsToDecompose").value;

		function test(){

			array_formule = str_formuleSemi.split("-");

			array_formule.forEach((element) => {

				var numeroRepetitions = element.match(/\d+/g);

				var letr =  element.match(/[COH]+/g);

				for(var counter=0;counter < numeroRepetitions.length;counter++)
				{
					var normalLetters = letr[counter].slice(0,-1);

					var letterToCopy = letr[counter].slice(-1);

					var numberedFormula = letterToCopy.repeat(numeroRepetitions[counter]);
					completedFormula = normalLetters+numberedFormula;
					
				}

				formuleBruteSansNombres = formuleBruteSansNombres+=completedFormula;
				
			});

			console.log(formuleBruteSansNombres);
			formuleBrute();
		}

		function formuleBrute(){

			elementsPrincipaux.forEach((element) => {

				var re = new RegExp(element, 'g');

				var count = (formuleBruteSansNombres.match(re) || []).length;

				formuleBruteFinale+=element+count;
			})

			console.log(formuleBruteFinale);



		}
	</script>
</html>
<?php
	$var = 0;
?>
