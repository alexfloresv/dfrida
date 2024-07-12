<?php

//hostin local

/* class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=bd_dfrida","root","");
    $link->exec("set names utf8");
    return $link;
  }
} */

//hostinguer

class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=u993966586_dfrida", "u993966586_dfrida", "#Dfrida1234");
    $link->exec("set names utf8");
    return $link;
  }
}