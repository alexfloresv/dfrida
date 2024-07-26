<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <?php require "modules/header.php" ?>
</head>

<?php
if (isset($_SESSION["login"]) && $_SESSION["login"] == "ok") {
  echo '<body class="sb-nav-fixed">';

  include "modules/navbar.php";

  echo '
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" style="width: 245px;">
            <div class="sb-sidenav-menu" >
              <div class="nav">';
  include "modules/menu.php";

  if (isset($_GET["ruta"])) {
    if (
      $_GET["ruta"] == "home" ||
      $_GET["ruta"] == "users" ||
      $_GET["ruta"] == "clients" ||
      $_GET["ruta"] == "proveedores" ||
      $_GET["ruta"] == "products" ||
      $_GET["ruta"] == "productMprima" ||
      $_GET["ruta"] == "cotizacion" ||
      $_GET["ruta"] == "cotizacionList" ||
      $_GET["ruta"] == "fichaTecnica" ||
      $_GET["ruta"] == "fichaTecnicaList" ||
      $_GET["ruta"] == "fichaTecnicaEdit" ||
      $_GET["ruta"] == "fichaTrabajo" ||
      $_GET["ruta"] == "fichaTrabajoList" ||
      $_GET["ruta"] == "fichaTrabajoEdit" ||
      $_GET["ruta"] == "ingresoList" ||
      $_GET["ruta"] == "ingresoProd" ||
      $_GET["ruta"] == "ingresoProdEdit" ||
      $_GET["ruta"] == "almacenProductos" ||
      $_GET["ruta"] == "salidaList" ||
      $_GET["ruta"] == "salidaProd" ||
      $_GET["ruta"] == "salidaProdEdit" ||
      $_GET["ruta"] == "ingresoMprimaList" ||
      $_GET["ruta"] == "ingresoMprima" ||
      $_GET["ruta"] == "ingresoMprimaEdit" ||
      $_GET["ruta"] == "almacenMateriaPrima" ||
      $_GET["ruta"] == "salidaMprimaList" ||
      $_GET["ruta"] == "salidaMprima" ||
      $_GET["ruta"] == "salidaMprimaEdit" ||

      $_GET["ruta"] == "signout"
    ) {
      include "modules/" . $_GET["ruta"] . ".php";
    } else {
      include "web/404.html";
    }
  } else {
    include "modules/home.php";
  }
  echo '<footer>';
  include "modules/footer.php";
  echo '</footer>';
  echo '</div>';
  echo '</div>';
} else {
  include "modules/login.php";
}
?>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
  crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
  crossorigin="anonymous"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

<!-- funciones data table -->
<script src="dataTables/dt-usuarios.js"></script>
<script src="dataTables/dt-clientes.js"></script>
<script src="dataTables/dt-proveedores.js"></script>
<script src="dataTables/dt-productos.js"></script>
<script src="dataTables/dt-categoriaProd.js"></script>
<script src="dataTables/dt-productoMprima.js"></script>
<script src="dataTables/dt-categoriaProdMprima.js"></script>
<script src="dataTables/dt-cotizacion.js"></script>
<script src="dataTables/dt-fichaTecnica.js"></script>
<script src="dataTables/dt-fichaTrabajo.js"></script>
<script src="dataTables/dt-ingresos.js"></script>
<script src="dataTables/dt-almacenProductos.js"></script>
<script src="dataTables/dt-salidas.js"></script>
<script src="dataTables/dt-ingresosMprima.js"></script>
<script src="dataTables/dt-almacenMateriaPrima.js"></script>
<script src="dataTables/dt-salidasMprima.js"></script>


<!-- funciones js -->
<script src="js/users.js"></script>
<script src="js/clients.js"></script>
<script src="js/proveedores.js"></script>
<script src="js/products.js"></script>
<script src="js/categoriaProd.js"></script>
<script src="js/productoMprima.js"></script>
<script src="js/categoriaProdMprima.js"></script>
<script src="js/cotizacion.js"></script>
<script src="js/pdf.js"></script>
<script src="js/fichaTecnica.js"></script>
<script src="js/fichaTrabajo.js"></script>
<script src="js/pdfFichasTrabajo.js"></script>
<script src="js/ingresoProd.js"></script>
<script src="js/salidaProd.js"></script>
<script src="js/ingresoMprima.js"></script>
<script src="js/salidaMprima.js"></script>



</body>

</html>