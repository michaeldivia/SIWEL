<?php

/*
 * Filename: c:\UwAmp\www\CryptoEsports\src\php\database\databaseQuery.php
 * Path: c:\UwAmp\www\CryptoEsports\src\php\database
 * Created Date: Friday, August 21st 2020, 11:00:28 am
 * Author: esteban lopez gomez
 * 
 * Copyright (c) 2020 CryptoEsports
 */

   include_once('databaseConfig.php');


class DatabaseQuery
{
   /**
    * Objet permattant de se connecter à la DB
    *
    * @var \PDO
    */
   private $connection;

   /**
    * Ouvre la connexion à la db et retourne un objet PDO
    *
    * @return \PDO
    */
   public function __construct()
   {
      try
      {
         $user = $GLOBALS['db_params']['username'];
         $pass = $GLOBALS['db_params']['password'];
         $dbname = $GLOBALS['db_params']['dbname'];
         $host = $GLOBALS['db_params']['host'];
         $charset = $GLOBALS['db_params']['charset'];

         $this->connection = new \PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=' . $charset,$user, $pass,array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION));
      }
      catch (Exception $ex)
      {
         var_dump($ex);
      }
   }

   /**
    * SELECT request
    *
    * @param string $query
    * @param array $values
    * @return array
    */
   public function select($query, $values)
   {
      try
      {
         $req = $this->connection->prepare($query);

         if(!empty($values))
         {
            $req->execute($values);
         }
         else
         {

            $req->execute();
            
         }

         return $req->fetchAll(PDO::FETCH_ASSOC);
      }
      catch(Exception $ex)
      {
         return($ex);
      }
   }
}

?>