<?php
date_default_timezone_set('America/Bogota');

class ClientsController
{

  //  Get clients to create an order
  public static function ctrGetClients()
  {
    $table = "tb_client";
    $listClients = ClientsModel::mdlGetClients($table);
    return $listClients;
  }

  // Mostrar todos los clientes
  public static function ctrGetAllClients()
  {
    $table = "cliente";
    $listClients = ClientsModel::mdlGetAllClients($table);
    return $listClients;
  }
  // crear cliente nuevo
  public static function ctrCreateClient($crearCliente)
  {
    if (isset($crearCliente["NameCli"]) && isset($crearCliente["Ru"])) {
      $table = "cliente";
      $dataCreate = array(
        "rucCli" => $crearCliente["Ru"],
        "RazonSocialCli" => $crearCliente["razonSocial"],
        "nombreCli" => $crearCliente["NameCli"],
        "correoCli" => $crearCliente["EmailCli"],
        "direccionCli" => $crearCliente["AddressCli"],
        "celularCli" => $crearCliente["PhoneCli"],
        "detalleCli" => $crearCliente["DetallCli"],
        "estadoCli" => 1,//activo
        "DateCreate" => date("Y-m-d H:i:s"),
        "DateUpdate" => date("Y-m-d H:i:s")
      );
      $response = ClientsModel::mdlCreateClient($table, $dataCreate);
      return $response;
    }
  }
  // Editar Cliente
  public static function ctrUpdateClients($editarClientes)
  {
    if (isset($editarClientes["EditNameCli"]) && isset($editarClientes["EditRu"])) {
      $table = 'cliente';
      $dataUpdate = array(
        "RazonSocialCli" => $editarClientes["EditRazonSocial"],
        "rucCli" => $editarClientes["EditRu"],
        "nombreCli" => $editarClientes["EditNameCli"],
        "correoCli" => $editarClientes["EditEmailCli"],
        "direccionCli" => $editarClientes["EditAddressCli"],
        "celularCli" => $editarClientes["EditPhoneCli"],
        "detalleCli" => $editarClientes["EditDetallCli"],
        "estadoCli" => $editarClientes["EditStateCli"],
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
        "idCli" => $editarClientes["codClient"]
      );
      $response = ClientsModel::mdlUpdateClient($table, $dataUpdate);
      return $response;
    }
  }

  // Obtener datos del cliente para editar
  public static function ctrGetClientDataEdit($codClient)
  {
    $table = "cliente";
    $dataClient = ClientsModel::mdlGetClientDataEdit($table, $codClient);
    return $dataClient;
  }

  // Eliminar cliente
  public static function ctrDeleteClient($borrarCliente)
  {
    // Verificar si estadoCli es igual a 1
    if (isset($borrarCliente["estadoCli"]) && $borrarCliente["estadoCli"] == 1) {
      $response = "error";
      return $response;
    }
    $codClient = $borrarCliente["codCli"];
    $table = "cliente";
    $response = ClientsModel::mdlDeleteClient($table, $codClient);
    return $response;

  }
}


