<?php
//controladores
require_once "../controller/users.controller.php";
require_once "../model/users.model.php";
require_once "../functions/alertas.function.php";
require_once "../functions/usuarios.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

//funciones para escuchar entrad ade datos desde $.ajax de jquery
//datatable de usuarios
if (isset($_POST["todosLosUsuarios"])) {
  $todosLosUsuarios = new UsersAjax();
  $todosLosUsuarios->ajaxDTableUsuarios();
}
//  crear usuario
if (isset($_POST["jsonCrearUsuario"])) {
  $create = new UsersAjax();
  $create->jsonCrearUsuario = $_POST["jsonCrearUsuario"];
  $create->ajaxCrearUsuario($_POST["jsonCrearUsuario"]);
}
//  visualizar datos usuario
if (isset($_POST["codUser"])) {
  $view = new UsersAjax();
  $view->codUser = $_POST["codUser"];
  $view->ajaxVerUser();
}
//editar usuario
if (isset($_POST["jsonEditarUsuario"])) {
  $edit = new UsersAjax();
  $edit->jsonEditarUsuario = $_POST["jsonEditarUsuario"];
  $edit->ajaxEditarUsuario($_POST["jsonEditarUsuario"]);
}
//borrar usuario
if (isset($_POST["jsonBorraUsuario"])) {
  $delete = new UsersAjax();
  $delete->jsonBorraUsuario = $_POST["jsonBorraUsuario"];
  $delete->ajaxBorrarUsuario($_POST["jsonBorraUsuario"]);
}


class UsersAjax
{
  //datatable de usuarios
  public function ajaxDTableUsuarios()
  {
    $todosLosUsuarios = UsersController::ctrGetAllUsers();
    foreach ($todosLosUsuarios as &$usuario) {
      $usuario['buttons'] = FunctionUsuario::getBtnUsuarios($usuario["idUsu"]);
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todosLosUsuarios);
  }
  //  crear usuario
  public function ajaxCrearUsuario($jsonCrearUsuario)
  {
    $crearUsuario = json_decode($jsonCrearUsuario, true);

    $valoresVacios = 0;
    foreach ($crearUsuario as $valor) {
      if (empty($valor)) {
        $valoresVacios++;
      }
    }
    if ($valoresVacios > 2) {
      echo json_encode("error");
      return;
    }
    $response = UsersController::ctrCreateUser($crearUsuario);
    echo json_encode($response);
  }
  //  visualizar datos usuario
  public $codUser;
  public function ajaxVerUser()
  {
    $codUser = $this->codUser;
    $response = UsersController::ctrGetUserDataEdit($codUser);
    echo json_encode($response);
  }
  //  editar usuario
  public function ajaxEditarUsuario($jsonEditarUsuario)
  {
    $EditarUsuario = json_decode($jsonEditarUsuario, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = UsersController::ctrEditUser($EditarUsuario);
    echo json_encode($response);
  }
  //  borrar usuario
  public function ajaxBorrarUsuario($jsonBorraUsuario)
  {
    $borrarUsuario = json_decode($jsonBorraUsuario, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = UsersController::ctrDeleteUser($borrarUsuario);
    echo json_encode($response);
  }

}

