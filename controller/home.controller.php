<?php
date_default_timezone_set('America/Bogota');

class HomeController
{
  // Mostrar todos los pedidos
  public static function ctrObtenerProcesosOperativosTiempoCosto()
  {
    $table = "proceso_operativo";
    $response = HomeModel::mdlObtenerProcesosOperativosTiempoCosto($table);
    return $response;
  }
}
