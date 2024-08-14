<?php
require_once "../controller/pedidos.controller.php";
require_once "../model/pedidos.model.php";
require_once "../functions/pedidos.functions.php";
require_once "../controller/cotizacion.controller.php";
require_once "../model/cotizacion.model.php";

// Inicio de sesión
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

// Funciones para escuchar entrada de datos desde $.ajax de jQuery
// Datatable de Pedidos
if (isset($_POST["todosLosPedidos"])) {
  $todosLosPedidos = new PedidosAjax();
  $todosLosPedidos->ajaxDTablePedidos();
}

// Crear pedido
if (isset($_POST["crearPedido"])) {
  // Decodificar el JSON recibido
  $jsonData = json_decode($_POST["crearPedido"], true);
  // Pasar los datos decodificados al controlador
  $crearPedido = new PedidosAjax();
  $crearPedido->jsonDataPedidos = $jsonData;
  $crearPedido->ajaxCrearPedidosJson();
}
// Editar pedido
if(isset($_POST["editarPedido"])){
  // Decodificar el JSON recibido
  $jsonData = json_decode($_POST["editarPedido"], true);
  // Pasar los datos decodificados al controlador
  $editarPedido = new PedidosAjax();
  $editarPedido->jsonDataPedidos = $jsonData;
  $editarPedido->ajaxEditarPedidosJson();
}
// Datos de Pedido
if(isset($_POST["idPedidoDatos"])){
  $datosPedidoporID = new PedidosAjax();
  $datosPedidoporID->idPedidoDatos = $_POST["idPedidoDatos"];
  $datosPedidoporID->ajaxDatosPedidoPorID();
}
// Eliminar Pedido
if(isset($_POST["idPedidoEliminar"]) && isset($_POST["idCotiEliminar"])){
  $eliminarPedido = new PedidosAjax();
  $eliminarPedido->idPedidoEliminar = $_POST["idPedidoEliminar"];
  $eliminarPedido->idCotiEliminar = $_POST["idCotiEliminar"];
  $eliminarPedido->ajaxEliminarPedido();
}

class PedidosAjax
{
  public $jsonDataPedidos;

  // Datatable de pedidos
  public function ajaxDTablePedidos()
  {
    $todosLosPedidos = PedidosController::ctrDTablePedidos();
    foreach ($todosLosPedidos as &$pedido) {
      $pedido['buttons'] = FunctionPedidos::getBtnPedido($pedido["idPedido"], $pedido["estadoPedido"], $pedido["idCoti"]);
      $pedido['estadoPedidos'] = FunctionPedidos::getEstadoPedido($pedido["estadoPedido"]);
      $pedido['clientePedido'] = FunctionPedidos::getBtnVerClientePedido($pedido["idPedido"], $pedido["idCli"]);
      $pedido['productosPedido'] = FunctionPedidos::getBtnVerProductosPedido($pedido["idPedido"], $pedido["idCoti"]);
      $pedido['productosPrimaPedido'] = FunctionPedidos::getBtnVerProductosPrimaPedido($pedido["idPedido"], $pedido["idSalMprima"]);
    }
    // Mostrar todos los productos en datatable
    echo json_encode($todosLosPedidos);
  }
  // Crear pedido
  public function ajaxCrearPedidosJson()
  {
    $jsonDataPedidos = $this->jsonDataPedidos;
    $respuesta = PedidosController::ctrCrearPedidoJson($jsonDataPedidos);
    echo json_encode($respuesta);
  }
  // Editar pedido
  public function ajaxEditarPedidosJson()
  {
    $jsonDataPedidos = $this->jsonDataPedidos;
    $respuesta = PedidosController::ctrEditarPedidoJson($jsonDataPedidos);
    echo json_encode($respuesta);
  }
  // Datos de Pedido por ID
  public $idPedidoDatos;
  public function ajaxDatosPedidoPorID(){
    $idPedidoDatos = $this->idPedidoDatos;
    $respuesta = PedidosController::ctrDatosPedidoPorID($idPedidoDatos);
    echo json_encode($respuesta);
  }
  public $idPedidoEliminar;
  public $idCotiEliminar;
  public function ajaxEliminarPedido(){
    $idPedidoEliminar = $this->idPedidoEliminar;
    $idCotiEliminar = $this->idCotiEliminar;
    $respuesta = PedidosController::ctrEliminarPedido($idPedidoEliminar, $idCotiEliminar);
    echo json_encode($respuesta);
  }

}