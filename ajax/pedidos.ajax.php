<?php
require_once "../controller/pedidos.controller.php";
require_once "../model/pedidos.model.php";
require_once "../functions/pedidos.functions.php";

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
if (isset($_POST["tituloPedido"]) && isset($_POST["nombrePedido"]) && isset($_POST["fechaPedido"]) && isset($_POST["idCliente"]) && isset($_POST["idFichaTecnica"]) && isset($_POST["idCoti"])) {
  // Recibir los datos del formulario
  $tituloPedido = $_POST["tituloPedido"];
  $nombrePedido = $_POST["nombrePedido"];
  $fechaPedido = $_POST["fechaPedido"];
  $idCliente = $_POST["idCliente"];
  $idFichaTecnica = $_POST["idFichaTecnica"];
  $idCoti = $_POST["idCoti"];

  // Crear un array con los datos recibidos
  $jsonData = array(
    "tituloPedido" => $tituloPedido,
    "nombrePedido" => $nombrePedido,
    "fechaPedido" => $fechaPedido,
    "idCliente" => $idCliente,
    "idFichaTecnica" => $idFichaTecnica,
    "idCoti" => $idCoti
  );

  // Pasar los datos al controlador
  $crearPedido = new PedidosAjax();
  $crearPedido->jsonDataPedidos = $jsonData;
  $crearPedido->ajaxCrearPedidosJson();
}

class PedidosAjax
{
  public $jsonDataPedidos;

  // Datatable de pedidos
  public function ajaxDTablePedidos()
  {
    $todosLosPedidos = PedidosController::ctrDTablePedidos();
    foreach ($todosLosPedidos as &$pedido) {
      $pedido['buttons'] = FunctionPedidos::getBtnPedido($pedido["idPedido"]);
      $pedido['estadoPedidos'] = FunctionPedidos::getEstadoPedido($pedido["idCoti"]);
      $pedido['clientePedido'] = FunctionPedidos::getBtnVerClientePedido($pedido["idPedido"], $pedido["idCli"]);
      $pedido['productosPedido'] = FunctionPedidos::getBtnVerProductosPedido($pedido["idPedido"], $pedido["idCoti"]);
      $pedido['productosPrimaPedido'] = FunctionPedidos::getBtnVerProductosPrimaPedido($pedido["idPedido"], $pedido["idCoti"]);
    }
    // Mostrar todos los productos en datatable
    echo json_encode($todosLosPedidos);
  }

  public function ajaxCrearPedidosJson()
  {
    $jsonDataPedidos = $this->jsonDataPedidos;
    $respuesta = PedidosController::ctrCrearPedidoJson($jsonDataPedidos);
    echo json_encode($respuesta);
  }
}