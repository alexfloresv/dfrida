<?php
require_once "../controller/pedidos.controller.php";
require_once "../model/pedidos.model.php";
require_once "../functions/pedidos.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de Pedidos
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
  $crearPedido->ajaxCrearPedido($jsonData);
}
/////////////////////////////

class PedidosAjax
{
  //datatable de pedidos
  public function ajaxDTablePedidos()
  {
    $todosLosPedidos = PedidosController::ctrDTablePedidos();
    foreach ($todosLosPedidos as &$pedido) {
      $pedido['buttons'] = FunctionPedidos::getBtnPedido($pedido["idPedido"]);
      $pedido['estadoPedidos'] = FunctionPedidos::getEstadoPedido($pedido["idCoti"]);
      $pedido['clientePedido'] = FunctionPedidos::getBtnVerClientePedido($pedido["idPedido"],$pedido["idCli"]);
      $pedido['productosPedido'] = FunctionPedidos::getBtnVerProductosPedido($pedido["idPedido"],$pedido["idCoti"]);
      $pedido['productosPrimaPedido'] = FunctionPedidos::getBtnVerProductosPrimaPedido($pedido["idPedido"],$pedido["idCoti"]);
    }
    //mostar todos los productos datatable
    echo json_encode($todosLosPedidos);
  }
  public function ajaxCrearPedido($jsonData)
  {
    $respuesta = PedidosController::ctrCrearPedido($jsonData);
    echo json_encode($respuesta);
  }
}

