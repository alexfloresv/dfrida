<?php
require_once "../controller/proveedores.controller.php";
require_once "../model/proveedores.model.php";
require_once "../functions/proveedores.functions.php";

//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de Proveedores
if (isset($_POST["todosLosProveedores"])) {
  $todosLosProveedores = new ProveedoresAjax();
  $todosLosProveedores->ajaxDTableProveedores();
}
//  crear Proveedor
if (isset($_POST["jsonCrearProveedores"])) {
  $create = new ProveedoresAjax();
  $create->jsonCrearProveedores = $_POST["jsonCrearProveedores"];
  $create->ajaxCrearProveedor($_POST["jsonCrearProveedores"]);
}
//  visualizar datos Proveedor
if (isset($_POST["codPov"])) {
  $view = new ProveedoresAjax();
  $view->codPoveedor = $_POST["codPov"];
  $view->ajaxViewProveedor($_POST["codPov"]);
}
//editar Proveedores
if (isset($_POST["jsonEditarProveedores"])) {
  $edit = new ProveedoresAjax();
  $edit->jsonEditarProveedores = $_POST["jsonEditarProveedores"];
  $edit->ajaxEditarProveedores($_POST["jsonEditarProveedores"]);
}
//borrar Proveedor
if (isset($_POST["jsonBorraProveedores"])) {
  $delete = new ProveedoresAjax();
  $delete->jsonBorraProveedor = $_POST["jsonBorraProveedores"];
  $delete->ajaxBorrarProveedor($_POST["jsonBorraProveedores"]);
}

//fin $.ajax de jquery
class ProveedoresAjax
{
  //datatable de Proveedores
  public function ajaxDTableProveedores()
  {
    $todosLosProveedores = ProveedoresController::ctrDTableProveedores();
    foreach ($todosLosProveedores as &$proveedor) {
      $proveedor['buttons'] = FunctionProveedores::getBtnProveedores($proveedor["idProv"], $proveedor["estadoProv"]);
      $proveedor['estadoProv'] = FunctionProveedores::getEstadoProveedores($proveedor["estadoProv"]);
    }
    //mostar todos los Proveedores DataTable
    echo json_encode($todosLosProveedores);
  }
  //  crear Proveedor
  public function ajaxCrearProveedor($jsonCrearProveedores)
  {
    $crearProveedor = json_decode($jsonCrearProveedores, true);

/*     $valoresVacios = 0;
    foreach ($crearProveedor as $valor) {
      if (empty($valor)) {
        $valoresVacios++;
      }
    }
    if ($valoresVacios > 2) {
      echo json_encode("error");
      return;
    } */
    $response = ProveedoresController::ctrCrearProveedor($crearProveedor);
    echo json_encode($response);
  }
  //  visualizar datos Proveedor
  public function ajaxViewProveedor($codPov)
  {
    $crearProveedor = json_decode($codPov, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProveedoresController::ctrViewProveedor($codPov);
    echo json_encode($response);
  }
  //  editar Proveedores
  public function ajaxEditarProveedores($jsonEditarProveedores)
  {
    $editarProveedores = json_decode($jsonEditarProveedores, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProveedoresController::ctrEditarProveedores($editarProveedores);
    echo json_encode($response);
  }
  //  borrar Proveedor
  public function ajaxBorrarProveedor($jsonBorraProveedor)
  {
    $borrarProveedor = json_decode($jsonBorraProveedor, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProveedoresController::ctrDeleteProveedor($borrarProveedor);
    echo json_encode($response);
  }

}

