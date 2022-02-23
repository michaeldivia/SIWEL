<?php
    /**
    * debug_to_console()
    * Date : 23.02.2022
    * Dernière modification : Michael Divia
    * Permet d'enovoyé des éléments PHP dans la console en JS
    */
    function debug_to_console($data)
    {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }

    //Acred de la Base de donnée
    $host = "localhost";
    $username = "siwel";
    $password = "JeNAimePasLaMTU1C2021$";
    $dbname = "SIWEL";

    //Créer la connexion à la Base de Donnée
    $conn = new mysqli($host, $username, $password, $dbname);
    $conn->set_charset("utf8");

    //Vérifier la connexion
    if ($conn->connect_error) {
      debug_to_console("Connection failed: " . $conn->connect_error);
    } 

    //Récupérer les éléments de la table elements
    $sql = "SELECT Nom, Lettre, Celibataire, Couple FROM elements";
    $result = $conn->query($sql);

    //Transfomer le tableau en tableau compatible JS
    $elements = $result->fetch_all(MYSQLI_NUM);
    $js_elements = json_encode($elements);

    //Récupérer les éléments de la table fonction_organique
    $sql = "SELECT Fonction, Nom FROM fonction_organique";
    $result = $conn->query($sql);

    //Transfomer le tableau en tableau compatible JS
    $fonction_organique = $result->fetch_all(MYSQLI_NUM);
    $js_fonction_organique = json_encode($fonction_organique);

?>
