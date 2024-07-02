<?php
class Conexion
{
  static public function conn()
  {
    $link = new PDO("mysql:host=localhost;dbname=bd_dfrida","root","");
    $link->exec("set names utf8");
    return $link;
  }
}
//conectar a la base de datos hostinger
/* class Conexion
{
static public function conn()
{
$link = new PDO("mysql:host=localhost;dbname=u553466910_dfrida","u553466910_admin_dfrida","/j1/jkU5");
$link->exec("set names utf8");
return $link;
}
} */