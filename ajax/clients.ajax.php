<?php

require_once "../controller/clients.controller.php";
require_once "../model/clients.model.php";
require_once "../functions/alertas.function.php";
require_once "../functions/clientes.functions.php";

//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de clientes
if (isset($_POST["todosLosClientes"])) {
  $todosLosClientes = new ClientsAjax();
  $todosLosClientes->ajaxDTableClientes();
}
//  crear Cliente
if (isset($_POST["jsonCrearCliente"])) {
  $create = new ClientsAjax();
  $create->jsonCrearCliente = $_POST["jsonCrearCliente"];
  $create->ajaxCrearCliente($_POST["jsonCrearCliente"]);
}
//  visualizar datos cliente
if (isset($_POST["codCli"])) {
  $view = new ClientsAjax();
  $view->codClient = $_POST["codCli"];
  $view->ajaxEditClient();
}
//editar Clientes
if (isset($_POST["jsonEditarClientes"])) {
  $edit = new ClientsAjax();
  $edit->jsonEditarClientes = $_POST["jsonEditarClientes"];
  $edit->ajaxEditarClientes($_POST["jsonEditarClientes"]);
}
//borrar Cliente
if (isset($_POST["jsonBorraClientes"])) {
  $delete = new ClientsAjax();
  $delete->jsonBorraCliente = $_POST["jsonBorraClientes"];
  $delete->ajaxBorrarCliente($_POST["jsonBorraClientes"]);
}

//fin $.ajax de jquery
class ClientsAjax
{
  //datatable de Clientes
  public function ajaxDTableClientes()
  {
    $todosLosClientes = ClientsController::ctrGetAllClients();
    foreach ($todosLosClientes as &$cliente) {
      $cliente['buttons'] = FunctionClientes::getBtnClientes($cliente["idCli"], $cliente["estadoCli"]);
      $cliente['estadoCli'] = FunctionClientes::getEstadoClientes($cliente["estadoCli"]);
    }
    //mostar todos los Clientes DataTable
    echo json_encode($todosLosClientes);
  }
  //  crear Cliente
  public function ajaxCrearCliente($jsonCrearCliente)
  {
    $crearCliente = json_decode($jsonCrearCliente, true);
    $valoresVacios = 0;
    foreach ($crearCliente as $valor) {
      if (empty($valor)) {
        $valoresVacios++;
      }
    }
    if ($valoresVacios > 4) {
      echo json_encode("error");
      return;
    }
    $response = ClientsController::ctrCreateClient($crearCliente);
    echo json_encode($response);
  }
  //  visualizar datos cliente
  public $codClient;
  public function ajaxEditClient()
  {
    $codClient = $this->codClient;
    $response = ClientsController::ctrGetClientDataEdit($codClient);
    echo json_encode($response);
  }
  //  editar Clientes
  public function ajaxEditarClientes($jsonEditarClientes)
  {
    $editarClientes = json_decode($jsonEditarClientes, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ClientsController::ctrUpdateClients($editarClientes);
    echo json_encode($response);
  }
  //  borrar Cliente
  public function ajaxBorrarCliente($jsonBorraCliente)
  {
    $borrarCliente = json_decode($jsonBorraCliente, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ClientsController::ctrDeleteClient($borrarCliente);
    echo json_encode($response);
  }

}

