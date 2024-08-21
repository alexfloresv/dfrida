<?php

///hostin local

/* class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=bd_dfrida", "root", "");
    $link->exec("set names utf8");
    return $link;
  }
} */

//hostinguer acide

class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=u553466910_dfrida", "u553466910_root_dfrida", "^Mhq*Q6sp$0l");
    $link->exec("set names utf8");
    return $link;
  }
}

/* https://auth-db1077.hstgr.io/index.php?db=u553466910_dfrida */

///

//hostinguer pruebas unitarias

/* class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=u993966586_dfrida", "u993966586_dfrida", "#Dfrida1234");
    $link->exec("set names utf8");
    return $link;
  }
} */

