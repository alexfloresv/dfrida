<?php
date_default_timezone_set('America/Bogota');

class HomeController
{
  // Mostrar todos los procesos operativos precio y horas
  public static function ctrObtenerProcesosOperativosTiempoCosto()
  {
    $table = "proceso_operativo";
    $response = HomeModel::mdlObtenerProcesosOperativosTiempoCosto($table);
    return $response;
  }
  // Mostrar el conteo de los estados operativos
  public static function ctrObtenerEstadosProcesosOperativosHome(){
    $table = "proceso_operativo";
    $response = HomeModel::mdlObtenerEstadosProcesosOperativosHome($table);
    return $response;
  }
  // Obtener el total recaudado por año
  public static function ctrObtenerTotalRecaudadoAnio(){
    $table = "proceso_operativo";
    $response = HomeModel::mdlObtenerTotalRecaudadoAnio($table);
    return $response;
  }
}
