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
      <h1 class="mt-4">Lista Salidas de Productos Prima</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-primary me-4" id="btnAddSalidaMprima">
          Registrar Salida de Productos del Inventario Prima
        </button>
        <button type="button" class="btn btn-success" id="btnDescargarSalidaMPrima">
          <i class="fas fa-file-excel me-2"></i> Descargar Salida de  Productos Prima
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableSalidasMprima -->
          <h5 class="mt-4 tituloSalidas"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableSalidasMprima -->
          <table id="dataTableSalidasMprima" class="display dataTableSalidasMprima">
            <thead>
              <!-- dataTableSalidasMprima -->
            </thead>
            <tbody>
              <!--dataTableSalidasMprima-->
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
<div class="modal fade" id="modalProdSalidas" tabindex="-1" aria-labelledby="modalProdSalidasLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Productos salida de Almacen</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">

        <table id="modalDataTableProdSalida" class="display modalDataTableProdSalida">
          <thead>
            <!-- modalDataTableProdSalida -->
          </thead>
          <tbody>
            <!--modalDataTableProdSalida-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>