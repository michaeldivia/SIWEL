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
					<p>
						Lorem ipsum
					</p>
				</div>

				<div class="input-group">
					<span class="input-group-addon" id="basic-addon1">Formule Semi-developpée</span>
					<input type="text" placeholder="CH3-O2C" class="form-control" aria-describedby="case pour la formule semi-développée" id="atomsToDecompose">
				</div>

				<div class="submit_button_div">
					<button class="btn btn-default btnTransform" onclick="StartConvert()">
						Transformer
					</button>
				</div>

				<div class="brute_formula_div">
					
				</div>
				<div class="lewis_div">
					<p id="displayLewis"></p>
				</div>
				<footer id="footer">
					<div class="inner">
						<p>Crée par Michael Divia, Hugo Germano, Esteban Lopez et Henok Sese</p>
						<p>©2022 ETML</p>
					</div>
				</footer>
	  		</div>
		</body>
	</main>
</html>
<?php
	$var = 0;
?>
