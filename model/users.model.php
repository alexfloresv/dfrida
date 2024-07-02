<?php

require_once "conexion.php";

class UsersModel
{
  // Actualizar último inicio de sesión
  public static function mdlUpdateLastLogin($table, $lastlogin, $userId)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET LastConnection=:LastConnection WHERE idUsu = :idUsu");
    $statement -> bindParam(":LastConnection", $lastlogin, PDO::PARAM_STR);
    $statement -> bindParam(":idUsu", $userId, PDO::PARAM_INT);
    if ($statement->execute()){
      return "ok";
    }
    else
    {
      return "error";
    }
  }

 public static function mdlGetUserDataVerify($table, $username)
  {
    $statement = Conexion::conn()->prepare("SELECT usuario.idUsu, usuario.password FROM $table WHERE nombreUsu = :nombreUsu");
    $statement -> bindParam(":nombreUsu", $username , PDO::PARAM_STR);
    $statement -> execute();
    return $statement -> fetch();
  }

  // Tomar los datos del usuario para guardar en la sesión
  public static function mdlGetSessionData($table, $user)
  {
    $statement = Conexion::conn()->prepare("SELECT idUsu, idTipoUsu, nombreUsu, nombre FROM $table WHERE nombreUsu = :nombreUsu");
    $statement -> bindParam(":nombreUsu", $user , PDO::PARAM_STR);
    $statement -> execute();
    return $statement -> fetch();
  }

  // Obtener todos los usuarios
  public static function mdlGetAllUsers($table)
  {
    $statement = Conexion::conn()->prepare("SELECT usuario.idUsu, usuario.nombreUsu, usuario.nombre, usuario.apellido, usuario.LastConnection, tipo_usuario.descripcionTipo FROM $table INNER JOIN tipo_usuario ON usuario.idTipoUsu = tipo_usuario.idTipoUsu ORDER BY idUsu ASC");
    $statement -> execute();
    return $statement -> fetchAll(PDO::FETCH_ASSOC);
  }
  
  // Mostrar datos para editar usuario
  public static function mdlGetUserDataEdit($table, $codUser)
  {
    $statement = Conexion::conn()->prepare("SELECT usuario.idUsu, usuario.idTipoUsu, usuario.nombreUsu, usuario.nombre, usuario.apellido FROM $table WHERE usuario.idUsu = $codUser");
    $statement -> execute();
    return $statement -> fetch();
  }

  // Obtener todos los tipos de usuarios
  public static function mdlGetUsersType($table)
  {
    $statement = Conexion::conn()->prepare("SELECT tipo_usuario.idTipoUsu, tipo_usuario.descripcionTipo FROM $table");
    $statement -> execute();
    return $statement -> fetchAll();
  }
  
  // Crear nuevo usuario
  public static function mdlCreateUser($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idTipoUsu, nombreUsu, nombre, apellido, password, DateCreate, DateUpdate) VALUES(:idTipoUsu, :nombreUsu, :nombre, :apellido, :password, :DateCreate, :DateUpdate)");
    $statement -> bindParam(":idTipoUsu", $dataCreate["idTipoUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombreUsu", $dataCreate["nombreUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombre", $dataCreate["nombre"], PDO::PARAM_STR);
    $statement -> bindParam(":apellido", $dataCreate["apellido"], PDO::PARAM_STR);
    $statement -> bindParam(":password", $dataCreate["password"], PDO::PARAM_STR);
    $statement -> bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    $statement -> bindParam(":DateUpdate", $dataCreate["DateUpdate"], PDO::PARAM_STR);

    if($statement -> execute())
    {
      return "ok";
    }
    else
    {
      return "error";
    }
  }
  
  // Actualizar datos completos del usuario y contraseña
  public static function mdlUpdateUserComplete($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idTipoUsu=:idTipoUsu, nombreUsu=:nombreUsu, nombre=:nombre, apellido=:apellido, password=:password, LastConnection=:LastConnection WHERE idUsu=:idUsu");
    $statement -> bindParam(":idTipoUsu", $dataUpdate["idTipoUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombreUsu", $dataUpdate["nombreUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombre", $dataUpdate["nombre"], PDO::PARAM_STR);
    $statement -> bindParam(":apellido", $dataUpdate["apellido"], PDO::PARAM_STR);
    $statement -> bindParam(":password", $dataUpdate["password"], PDO::PARAM_STR);
    $statement -> bindParam(":LastConnection", $dataUpdate["LastConnection"], PDO::PARAM_STR);
    $statement -> bindParam(":idUsu", $dataUpdate["idUsu"], PDO::PARAM_STR);
    if($statement -> execute())
    {
      return "ok";
    }
    else
    {
      return "error";
    }
  }

  // Actualizar datos del usuario sin cambiar la contraseña
  public static function mdlUpdateUserData($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idTipoUsu=:idTipoUsu, nombreUsu=:nombreUsu, nombre=:nombre, apellido=:apellido, LastConnection=:LastConnection WHERE idUsu=:idUsu");
    $statement -> bindParam(":idTipoUsu", $dataUpdate["idTipoUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombreUsu", $dataUpdate["nombreUsu"], PDO::PARAM_STR);
    $statement -> bindParam(":nombre", $dataUpdate["nombre"], PDO::PARAM_STR);
    $statement -> bindParam(":apellido", $dataUpdate["apellido"], PDO::PARAM_STR);
    $statement -> bindParam(":LastConnection", $dataUpdate["LastConnection"], PDO::PARAM_STR);
    $statement -> bindParam(":idUsu", $dataUpdate["idUsu"], PDO::PARAM_STR);
    if($statement -> execute())
    {
      return "ok";
    }
    else
    {
      return "error";
    }
  }

  // Eliminar usuario
  public static function mdlDeleteUser($table, $codUser)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idUsu = :idUsu");
    $statement -> bindParam(":idUsu", $codUser, PDO::PARAM_INT);
    if ($statement -> execute())
    {
      return "ok";
    }
    else
    {
      return "error";
    }
  }

}