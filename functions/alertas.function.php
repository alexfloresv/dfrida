<?php

class FunctionAlertas
{
  //funciones para alertas

  //  Mensaje de alerta por acción
  public static function mensajeAlerta($tipo, $titulo, $mensaje, $ruta)
  {
    $alert =
      '<script>
        Swal.fire({
          icon: "' . $tipo . '",
          title: "' . $titulo . '",
          text: "' . $mensaje . '",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "' . $ruta . '";
          }
        });
      </script>';
    return $alert;
  }

  // Mensaje de alerta por acción con timer
  public static function mostrarAlertaTimer($tipo, $titulo, $mensaje, $ruta)
  {
    $alert =
      '<script>
        Swal.fire({
          icon: "' . $tipo . '",
          title: "' . $titulo . '",
          text: "' . $mensaje . '",
          timer: 1500,
          showConfirmButton: false
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location = "' . $ruta . '";
          }
        });
      </script>';
    return $alert;
  }

}
