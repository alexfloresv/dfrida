<?php
date_default_timezone_set('America/Bogota');

class UsersController
{
  // Obtener todos los usuarios
  public static function ctrGetAllUsers()
  {
    $table = "usuario";
    $usersList = UsersModel::mdlGetAllUsers($table);
    return $usersList;
  }

  // Obtener todos los tipos de usuarios
  public static function ctrGetUsersType()
  {
    $table = "tipo_usuario";
    $typesList = UsersModel::mdlGetUsersType($table);
    return $typesList;
  }

  // Verificar usuario para iniciar sesión
  static public function ctrVerifyUser($username, $password)
  {
    $table = "usuario";
    $userData = UsersModel::mdlGetUserDataVerify($table, $username);
    if ($userData != false) {
      $verify = password_verify($password, $userData["password"]);
    } else {
      return $verify = false;
    }
    return $verify;
  }

  // Obtener datos del usuario para editar
  static public function ctrGetUserDataEdit($codUser)
  {
    $table = "usuario";
    $userData = UsersModel::mdlGetUserDataEdit($table, $codUser);
    return $userData;
  }

  // Verificar datos para iniciar sesión
  static public function ctrLogIn()
  {
    //contador de intentos fallidos
    if (!isset($_SESSION["failedAttempts"])) {
      $_SESSION["failedAttempts"] = 0;
    }

    if (isset($_POST["inputUser"]) && isset($_POST["inputPassword"])) {
      if ($_POST["inputUser"] != "" && $_POST["inputUser"] != null && $_POST["inputPassword"] != "" && $_POST["inputPassword"] != null) {
        $verify = self::ctrVerifyUser($_POST["inputUser"], $_POST["inputPassword"]);

        if ($verify != false) {
          $table = "usuario";

          $userData = UsersModel::mdlGetSessionData($table, $_POST["inputUser"]);
          $_SESSION["login"] = "ok";
          $_SESSION["idUsu"] = $userData["idUsu"];
          $_SESSION["nombreUsu"] = $userData["nombreUsu"];
          $_SESSION["nombre"] = $userData["nombre"];
          $_SESSION["idTipoUsu"] = $userData["idTipoUsu"];

          // Guardar último inicio de sesión
          $lastLogin = date("Y-m-d\TH:i:sP");

          $updateConnection = UsersModel::mdlUpdateLastLogin($table, $lastLogin, $userData["idUsu"]);
          if ($updateConnection == "ok") {
            echo '<script>
          window.location = "home";  
        </script>';
          }
        } else {
          //mensaje de error
          $_SESSION["failedAttempts"] += 1;
          echo '<br><div class="alert alert-danger text-center" role="alert"><strong>Error!</strong> <br> Usuario o Contraseña invalidos <br> Vuelva a intentarlo.<br> <strong> Le quedan ' . (3 - $_SESSION["failedAttempts"]) . ' intentos.</strong></div>';
          //mesaje de cambio de contraseña si falla 3 veces
          if ($_SESSION["failedAttempts"] >= 3) {
            echo '<button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#cambiarPasswordModal">
            Cambiar Contraseña
          </button>';
            $_SESSION["failedAttempts"] = 0;
          }
        }
      } else {
        echo '<br><div class="alert alert-warning text-center" role="alert"><strong>Advertencia!</strong> <br> Ingrese sus credenciales de Usuario</div>';
      }
    }
  }

  // Crear nuevo usuario
  static public function ctrCreateUser($crearUsuario)
  {
    if (isset($crearUsuario["userFirstName"]) && isset($crearUsuario["userLastName"]) && isset($crearUsuario["userName"]) && isset($crearUsuario["userPassword"])) {
      $table = "usuario";
      $passwordCrypt = password_hash($crearUsuario["userPassword"], PASSWORD_ARGON2ID, [
        'memory_cost' => 1 << 12,
        'time_cost' => 2,
        'threads' => 2
      ]);

      $dataCreate = array(
        "idTipoUsu" => $crearUsuario["userType"],
        "nombreUsu" => $crearUsuario["userName"],
        "nombre" => $crearUsuario["userFirstName"],
        "apellido" => $crearUsuario["userLastName"],
        "password" => $passwordCrypt,
        "DateCreate" => date("Y-m-d\TH:i:sP"),
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      $response = UsersModel::mdlCreateUser($table, $dataCreate);
      return $response;
    }
  }

  // Editar datos del usuario
  static public function ctrEditUser($EditarUsuario)
  {
    if (isset($EditarUsuario["editFirstName"]) && isset($EditarUsuario["editLastName"]) && isset($EditarUsuario["editUserName"])) {
      $table = "usuario";
      if ($EditarUsuario["editPassword"] != null) {
        $passwordCrypt = password_hash($EditarUsuario["editPassword"], PASSWORD_ARGON2ID, [
          'memory_cost' => 1 << 12,
          'time_cost' => 2,
          'threads' => 2
        ]);
        $dataUpdate = array(
          "idTipoUsu" => $EditarUsuario["editUserType"],
          "nombreUsu" => $EditarUsuario["editUserName"],
          "nombre" => $EditarUsuario["editFirstName"],
          "apellido" => $EditarUsuario["editLastName"],
          "password" => $passwordCrypt,
          "LastConnection" => date("Y-m-d\TH:i:sP"),
          "idUsu" => $EditarUsuario["codUser"]
        );

        $response = UsersModel::mdlUpdateUserComplete($table, $dataUpdate);
      } else {
        $dataUpdate = array(
          "idTipoUsu" => $EditarUsuario["editUserType"],
          "nombreUsu" => $EditarUsuario["editUserName"],
          "nombre" => $EditarUsuario["editFirstName"],
          "apellido" => $EditarUsuario["editLastName"],
          "LastConnection" => date("Y-m-d\TH:i:sP"),
          "idUsu" => $EditarUsuario["codUser"]
        );

        $response = UsersModel::mdlUpdateUserData($table, $dataUpdate);
      }
      return $response;
    }
  }

  // Eliminar usuario
  public static function ctrDeleteUser($borrarUsuario)
  {
    if (isset($borrarUsuario["codUser"])) {
      if ($borrarUsuario["codUser"] == 1) {
        // Si codUser es igual a 1=admin, devolver un mensaje de error
        return "error";
      } else {
        $table = "usuario";
        $codUser = $borrarUsuario["codUser"];
        $response = UsersModel::mdlDeleteUser($table, $codUser);
        return $response;
      }
    }
  }
}
