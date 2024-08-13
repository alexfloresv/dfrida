<?php
date_default_timezone_set('America/Bogota');

class MermaController
{
  //datatable de produccion
  public static function ctrDTableMerma()
  {
    $table = "merma";
    $response = MermaModel::mdlDTableMerma($table);
    return $response;
  }
  //  aceptar merma
  public static function ctrAceptarMerma($codSalMprimas)
  {
    $table = "salida_mprima";
    $response = MermaModel::mdlAceptarMerma($table, $codSalMprimas);
    return $response;
  }

 //  aceptar merma registro
  public static function ctrAceptarMermaRegsitro($dataMerma, $jsonProductosMerma)
  {
    $table = "merma";

    $dataUpdate = array(
      "idMerma" => $dataMerma["codMerma"],
      "nombreMerma" => $dataMerma["nombreMerma"],
      "fechaMermaAprob" => $dataMerma["fechaMermaAprob"],
      "jsonMerma" => $jsonProductosMerma,
      "estadoMerma" => 2,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );

    $response = MermaModel::mdlAceptarMermaRegsitro($table, $dataUpdate);
    return $response;
  }



}
