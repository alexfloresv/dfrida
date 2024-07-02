<?php
date_default_timezone_set('America/Bogota');

class ProveedoresController
{
  // Obtener todos los Proveedoress
  public static function ctrDTableProveedores()
  {
    $table = "proveedores";
    $usersList = ProveedoresModel::mdlDTableProveedores($table);
    return $usersList;
  }

  // Crear nuevo Proveedores
  static public function ctrCrearProveedor($crearProveedor)
  {
    $table = "proveedores";
    $dataCreate = array(
      "razonSocialProv" => $crearProveedor["razonSocialProv"],
      "rucProv" => $crearProveedor["rucProv"],
      "nombreProv" => $crearProveedor["nombreProv"],
      "correoProv" => $crearProveedor["correoProv"],
      "direccionProv" => $crearProveedor["direccionProv"],
      "celularProv" => $crearProveedor["celularProv"],
      "detalleProv" => $crearProveedor["detalleProv"],
      "estadoProv" => 1,// 1 = Activo & 2 = Desactivado
      "DateCreate" => date("Y-m-d\TH:i:sP"),
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ProveedoresModel::mdlCrearProveedor($table, $dataCreate);
    return $response;
  }

  //  visualizar datos Proveedor
  static public function ctrViewProveedor($codPov)
  {
    $table = "proveedores";
    $response = ProveedoresModel::mdlViewProveedor($table, $codPov);
    return $response;
  }

  //  editar Proveedor
  static public function ctrEditarProveedores($EditarProveedores)
  {
    $table = "proveedores";

    $dataUpdate = array(
      "idProv" => $EditarProveedores["codProveedorEdit"],
      "razonSocialProv" => $EditarProveedores["razonSocialProvEdit"],
      "rucProv" => $EditarProveedores["rucProvEdit"],
      "nombreProv" => $EditarProveedores["nombreProvEdit"],
      "correoProv" => $EditarProveedores["correoProvEdit"],
      "direccionProv" => $EditarProveedores["direccionProvEdit"],
      "celularProv" => $EditarProveedores["celularProvEdit"],
      "detalleProv" => $EditarProveedores["detalleProvEdit"],
      "estadoProv" => $EditarProveedores["estadoProvEdit"],
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ProveedoresModel::mdlEditarProveedores($table, $dataUpdate);

    return $response;
  }

  //  borrar Proveedor
  public static function ctrDeleteProveedor($borrarProveedor)
  {
    // Verificar si estadoProv es igual a 1
    if (isset($borrarProveedor["estadoProv"]) && $borrarProveedor["estadoProv"] == 1) {
      $response = "error";
      return $response;
    }
    $codPov = $borrarProveedor["codPov"];
    $table = "proveedores";
    $response = ProveedoresModel::mdlDeleteProveedor($table, $codPov);
    return $response;

  }
}
