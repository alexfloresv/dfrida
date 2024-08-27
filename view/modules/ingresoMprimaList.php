</div>
</div>
<div class="sb-sidenav-footer">
  <div class="small">Sesión iniciada como:</div>
  <?php echo $_SESSION["nombre"] ?>
</div>
</nav>
</div>
<div id="layoutSidenav_content">
  <main class="bg">
    <div class="container-fluid px-4">
      <h1 class="mt-4">Lista Ingresos de Productos Prima</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-primary me-4" id="btnAddIngresoMprima">
          Ingresar Producto Prima a Inventario
        </button>
        <button type="button" class="btn btn-success" id="btnDescargarIngresosMPrima">
          <i class="fas fa-file-excel me-2"></i> Descargar Ingresos de Productos Prima
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableIngresosMprima -->
          <h5 class="mt-4 tituloIngresosMprima"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableIngresosMprima -->
          <table id="dataTableIngresosMprima" class="display dataTableIngresosMprima">
            <thead>
              <!-- dataTableIngresosMprima -->
            </thead>
            <tbody>
              <!--dataTableIngresosMprima-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>


<!-- Modal productos ingresados-->
<div class="modal fade" id="modalProdIngresados" tabindex="-1" aria-labelledby="modalProdIngresadosLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalProdIngresadosLabel">Productos Ingresados Al Almacén Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">

        <table id="ModalDataTableProdIngresados" class="display ModalDataTableProdIngresados">
          <thead>
            <!-- ModalDataTableProdIngresados -->
          </thead>
          <tbody>
            <!--ModalDataTableProdIngresados-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>