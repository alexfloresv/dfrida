<!-- Menu for all users -->
<div class="sb-sidenav-menu-heading">Inicio</div>
<a class="nav-link" href="home">
  <div class="sb-nav-link-icon"><i class="fa-solid fa-ranking-star"></i></div>
  D'Frida
</a>
<!-- Inventory -->
<div class="sb-sidenav-menu-heading">Inventario Almacen</div>
<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#listInventory" aria-expanded="false" aria-controls="collapseLayouts">
  <div class="sb-nav-link-icon"><i class="fa-solid fa-box-open"></i></div>
  Inventario 
  <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
</a>
<div class="collapse" id="listInventory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
  <nav class="sb-sidenav-menu-nested nav">
    <a class="nav-link" href="almacen"><i class="fa-solid fa-box"></i><span style="margin-left: 10px;">Productos Finales</span></a>
    <a class="nav-link" href="mermas"><i class="fa-solid fa-box"></i><span style="margin-left: 10px;">Materia Prima</span></a>
  </nav>
</div>
<!-- Compras -->
<div class="sb-sidenav-menu-heading">Producción</div>
<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#listRegistros" aria-expanded="false" aria-controls="collapseLayouts">
  <div class="sb-nav-link-icon"><i class="fa-solid fa-people-carry-box"></i></div>
  Producción
  <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
</a>
<div class="collapse" id="listRegistros" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
  <nav class="sb-sidenav-menu-nested nav">
  <a class="nav-link" href="nuevoIngreso"><i class="fa-solid fa-person-walking-arrow-right"></i><span style="margin-left: 10px;">Proceso Operatido</span></a>
  <a class="nav-link" href="nuevoIngreso"><i class="fa-solid fa-hand-holding-medical"></i><span style="margin-left: 10px;">Produccion</span></a>
  <a class="nav-link" href="nuevoIngreso"><i class="fa-solid fa-trash-arrow-up"></i><span style="margin-left: 10px;">Mermas</span></a>
  <a class="nav-link" href="nuevoIngreso"><i class="fa-solid fa-person-walking-arrow-loop-left"></i><span style="margin-left: 10px;">Producto Merma</span></a>

  </nav>
</div>

<!-- Notapedido -->
<div class="sb-sidenav-menu-heading">Ingresos y Salidas</div>
<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#listNotaPedido" aria-expanded="false" aria-controls="collapseLayouts">
  <div class="sb-nav-link-icon"><i class="fa-solid fa-boxes-packing"></i></div>
  Ingresos y Salidas
  <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
</a>
<div class="collapse" id="listNotaPedido" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
  <nav class="sb-sidenav-menu-nested nav">
  <a class="nav-link" href="notaPedido"><i class="fa-solid fa-arrows-down-to-line"></i><span style="margin-left: 5px;">Ingreso Produccion</span></a>
  <a class="nav-link" href="notaPedido"><i class="fa-solid fa-arrows-up-to-line"></i><span style="margin-left: 5px;">Salida Productos</span></a>
  <a class="nav-link" href="notaPedido"><i class="fa-solid fa-boxes-stacked"></i><span style="margin-left: 5px;">Ingreso Materia Prima</span></a>
    <a class="nav-link" href="notaPedido"><i class="fa-solid fa-arrow-up-from-ground-water"></i><span style="margin-left: 5px;">Salida Materia Prima</span></a>
  </nav>
</div>

<!-- Catalogo -->
<div class="sb-sidenav-menu-heading">Catálogos</div>
<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#listaCatalogo" aria-expanded="false" aria-controls="collapseLayouts">
  <div class="sb-nav-link-icon"><i class="fa-solid fa-layer-group"></i></i></div>
  Catálogos
  <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
</a>
<div class="collapse" id="listaCatalogo" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
  <nav class="sb-sidenav-menu-nested nav">
    <a class="nav-link" href="categorias"><i class="fa-solid fa-cart-plus"></i><span style="margin-left: 5px;">Pedido</span></a>
    <a class="nav-link" href="cotizacionList"><i class="fa-solid fa-file-signature"></i><span style="margin-left: 5px;">Cotizaciones</span></a>
    <a class="nav-link" href="fichaTecnicaList"><i class="fa-solid fa-book"></i><span style="margin-left: 5px;">Ficha Tecnica</span></a>
    <a class="nav-link" href="fichaTrabajoList"><i class="fa-solid fa-network-wired"></i><span style="margin-left: 5px;">Fichas de Trabajo</span></a>
    <a class="nav-link" href="products"><i class="fa-solid fa-dolly"></i><span style="margin-left: 5px;">Productos</span></a>
    <a class="nav-link" href="productMprima"><i class="fa-solid fa-truck-ramp-box"></i><span style="margin-left: 5px;">Productos Prima</span></a>
    <a class="nav-link" href="proveedores"><i class="fa-solid fa-truck"></i><span style="margin-left: 5px;">Proveedores</span></a>
    <a class="nav-link" href="clients"><i class="fa-solid fa-handshake"></i><span style="margin-left: 5px;">Clientes</span></a>
    <?php if ($_SESSION["idTipoUsu"] == 1): ?>
      <a class="nav-link text-warning" href="users"><i class="fa-solid fa-id-card-clip"></i><span style="margin-left: 5px;">Usuarios</span></a>
    <?php endif; ?>
  </nav>
</div>