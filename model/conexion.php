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

/* class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=u553466910_dfrida", "u553466910_root_dfrida", "^Mhq*Q6sp$0l");
    $link->exec("set names utf8");
    return $link;
  }
} */

//buscar usuario en mysql hostinger ACIDE
//SELECT USER();
// 
//credenciales conexion remota
//host:154.56.48.204
//usu:u553466910_root_dfrida
//pass:^Mhq*Q6sp$0l


///

//hostinguer pruebas unitarias

class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=u993966586_dbdfrida", "u993966586_dbdfrida", "#Dfrida1234");
    $link->exec("set names utf8");
    return $link;
  }
}
//buscar usuario en mysql hostinger
//SELECT USER();
// 
//credenciales conexion remota
//host: 193.203.175.106
//usu: u993966586_dbdfrida
//pass: #Dfrida1234
