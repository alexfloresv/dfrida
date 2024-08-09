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
          <i class="fas fa-file-excel me-2"></i> Descargar Salida de Productos Prima
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
<div class="modal fade" id="modalProdSalidas" tabindex="-1" aria-labelledby="modalProdSalidasLabel" aria-hidden="true">
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

<!-- modal de estados de procesos operativos -->
<div class="modal fade" id="modalEstadosProcesosOp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalEstadosProcesosOp" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="">Proceso Operativo en Ejecucion</h1>
      </div>
      <div class="modal-body" id="">
        <div class="container">
          <form id="formEstadosProcesosOp">
            <div class="row">

              <!--proceso operativo -->
              <div class="col-md-12  mb-3">
                <div class="form-group">
                  <label for="nombrePorcesoOpNombreEstate">Proceso Operativo Asignado</label>
                  <input type="text" class="form-control" id="nombrePorcesoOpNombreEstate"
                    name="nombrePorcesoOpNombreEstate" disabled>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="fechaInicioProcOpEstate" class="form-label" style="font-weight: bold"> Fecha Inicio
                  Proceso:</label>
                <input type="date" class="form-control" id="fechaInicioProcOpEstate" name="fechaInicioProcOpEstate"
                  disabled>
              </div>

              <div class="col-md-6 mb-3">
                <label for="fechaFinProcOpEstate" class="form-label" style="font-weight: bold"> Fecha Fin
                  Proceso:</label>
                <input type="date" class="form-control" id="fechaFinProcOpEstate" name="fechaFinProcOpEstate" disabled>
              </div>

              <!-- selec2 para tipos de procesos -->
              <div class="col-md-12  mb-3">
                <div class="form-group">
                  <label for="tipoPorcesoOpNombreEstate">Tipo de proceso adjunto</label>
                  <input type="text" class="form-control" id="tipoPorcesoOpNombreEstate"
                    name="tipoPorcesoOpNombreEstate" disabled>
                </div>
              </div>


              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="estadoPrincipalProcOP">Estado proceso principal</label>
                  <select class="form-select" id="estadoPrincipalProcOP" name="estadoPrincipalProcOP" disabled>
                    <option value="1">Registrado</option>
                    <option value="2">En proceso</option>
                    <option value="3">Cuello de botella</option>
                    <option value="4">Listo</option>
                    <option value="5">Prenda Terminada</option>
                    <option value="6">Retrasado</option>
                  </select>
                </div>
              </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>