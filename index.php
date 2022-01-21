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
			<div class="title_div">
				SIWEL
			</div>
			<div class="search_bar_div">
				<input id="seach_bar" type="text" placeholder="H2O" />
			</div>

			<div class="input-group">
				<span class="input-group-addon" id="basic-addon1">@</span>
				<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" id="atomsToDecompose">
			</div>


			<div class="submit_button_div">
				<button class="btn btn-default btnTransform" onclick="StartConvert()">
					Transformer
				</button>
			</div>
			<div class="explanation_div">
				
			</div>
			<div class="brute_formula_div">
				
			</div>
			<div class="lewis_div">
				<p id="displayLewis"></p>
			</div>
		</body>
	</main>
</html>
<?php
	$var = 0;
?>
