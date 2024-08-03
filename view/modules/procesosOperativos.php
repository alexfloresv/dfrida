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
      <h1 class="mt-4" style="text-align: center;">Procesos Operativos</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" id="btnAddSalidaProd">
          Crear Proceso Operativo
        </button>
        <span style="margin-right: 10px;"></span>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalTipoProcesoOp"
          id="btnAddSalidaProd">
          Crear Tipo de Proceso Operativo
        </button>
        <span style="margin-right: 10px;"></span>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#modalDataTableTipoProcesoOp" id="btnViewTiposDeProcesos">
          Todos los Tipos de Procesos
        </button>
      </div>

      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProcesoOperativo -->
          <h5 class="mt-4 tituloProcOp"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProcesoOperativo -->
          <table id="dataTableProcesoOperativo" class="display dataTableProcesoOperativo">
            <thead>
              <!-- dataTableProcesoOperativo -->
            </thead>
            <tbody>
              <!--dataTableProcesoOperativo-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>

<!-- Modal Crear proceso operativo-->
<div class="modal fade" id="modalCrearProcesoOp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalCrearProcesoOp" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalCrearProcesoOpH1">Crear Proceso Operativo</h1>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <div class="container">
          <form id="formProcesoOpAdd">
            <div class="row">
              <div class="col-md-6  mb-3">
                <label for="nombreProcOpAdd" class="form-label" style="font-weight: bold">Nombre Del Proceso Operativo:
                </label>
                <input type="text" class="form-control" id="nombreProcOpAdd" name="nombreProcOpAdd"
                  placeholder="Ingrese el nombre del proceso operativo ">
              </div>

              <div class="col-md-6  mb-3">
                <label for="descripcionProcOpAdd" class="form-label" style="font-weight: bold">Descripcion Proceso:
                </label>
                <input type="text" class="form-control" id="descripcionProcOpAdd" name="descripcionProcOpAdd"
                  placeholder="Ingrese una descripcion del proceso operativo ">
              </div>

              <div class="col-md-2 ">
                <label for="fechaRegProcOpAdd" class="form-label" style="font-weight: bold"> Fecha Registro:</label>
                <input type="date" class="form-control" id="fechaRegProcOpAdd" name="fechaRegProcOpAdd">
              </div>
              <div class="col-md-2 ">
                <label for="fechaFinProcOpAdd" class="form-label" style="font-weight: bold"> Fecha Fin Proceso:</label>
                <input type="date" class="form-control" id="fechaFinProcOpAdd" name="fechaFinProcOpAdd">
              </div>

              <!-- selec2 selecionar una salida de productos prima -->
              <div class="col-md-6 ">
                <div class="form-group">
                  <label for="idSalProdPrima">Selecionar Salida de Productos Prima</label>
                  <select class="form-select" id="idSalProdPrima" name="idSalProdPrima">
                  </select>
                </div>
              </div>

              <!-- ver las salidas de productos prima -->
              <div class="col-md-2">
                <div class="form-group">
                  <label for="codTipProc">Productos prima</label>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#modalverSalidasMprima">
                    Ver Salidas
                  </button>
                </div>
              </div>

              <!-- selec2 para pedidos -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idPedidoProcOp">Selecionar Pedido</label>
                  <select class="form-select" id="idPedidoProcOp" name="idPedidoProcOp">
                  </select>
                </div>
              </div>
              <!-- selec2 para tipos de procesos -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOp">Selecionar el Tipo de Proceso</label>
                  <select class="form-select" id="idTipoProcOp" name="idTipoProcOp">
                  </select>
                </div>
              </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" id="crearProcOpModal">Crear Proceso Operativo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin -->
<!-- Modal Editar proceso operativo-->
<div class="modal fade" id="modalEditarProcesoOp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalEditarProcesoOp" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalCrearProcesoOpH1">Editar Proceso Operativo</h1>
      </div>
      <div class="modal-body">
        <div class="container">
          <form id="formProcesoOpEdit">
            <div class="row">
              <div class="col-md-6  mb-3">
                <label for="nombreProcOpEdit" class="form-label" style="font-weight: bold">Nombre Del Proceso Operativo:
                </label>
                <input type="text" class="form-control" id="nombreProcOpEdit" name="nombreProcOpEdit"
                  placeholder="Ingrese el nombre del proceso operativo ">
              </div>

              <div class="col-md-6  mb-3">
                <label for="descripcionProcOpEdit" class="form-label" style="font-weight: bold">Descripcion Proceso:
                </label>
                <input type="text" class="form-control" id="descripcionProcOpEdit" name="descripcionProcOpEdit"
                  placeholder="Ingrese una descripcion del proceso operativo ">
              </div>

              <div class="col-md-2 ">
                <label for="fechaRegProcOpEdit" class="form-label" style="font-weight: bold"> Fecha Registro:</label>
                <input type="date" class="form-control" id="fechaRegProcOpEdit" name="fechaRegProcOpEdit">
              </div>
              <div class="col-md-2 ">
                <label for="fechaFinProcOpEdit" class="form-label" style="font-weight: bold"> Fecha Fin Proceso:</label>
                <input type="date" class="form-control" id="fechaFinProcOpEdit" name="fechaFinProcOpEdit">
              </div>

              <!-- selec2 selecionar una salida de productos prima -->
              <div class="col-md-6 ">
                <div class="form-group">
                  <label for="idSalProdPrimaEdit">Selecionar Salida de Productos Prima</label>
                  <select class="form-select" id="idSalProdPrimaEdit" name="idSalProdPrimaEdit">
                  </select>
                </div>
              </div>

              <!-- ver las salidas de productos prima -->
              <div class="col-md-2">
                <div class="form-group">
                  <label for="codTipProc">Productos prima</label>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#modalverSalidasMprimaEdit">
                    Ver Salidas
                  </button>
                </div>
              </div>

              <!-- selec2 para pedidos -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idPedidoProcOpEdit">Selecionar Pedido</label>
                  <select class="form-select" id="idPedidoProcOpEdit" name="idPedidoProcOpEdit">
                  </select>
                </div>
              </div>

              <!-- selec2 para tipos de procesos -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOpEdit">Selecionar el Tipo de Proceso</label>
                  <select class="form-select" id="idTipoProcOpEdit" name="idTipoProcOpEdit">
                  </select>
                </div>
              </div>

              <!-- campo que guarde el id del registro-->
              <input type="hidden" class="form-control" id="codProcOpEdit" name="codProcOpEdit">
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" id="editarProcOpModal">Editar Proceso Operativo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin -->

<!-- Modal ver todas las salidas de productos prima no tocar-->
<div class="modal fade" id="modalverSalidasMprima" tabindex="-1" aria-labelledby="modalverSalidasMprima"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="">Todas las Salidas de Almacen Producto Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="">

        <table id="dataTableSalidasMprima" class="display dataTableSalidasMprima">
          <thead>
            <!-- dataTableSalidasMprima -->
          </thead>
          <tbody>
            <!--dataTableSalidasMprima-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Fin  -->

<!-- Modal ver todas las salidas de productos prima no tocar-->
<div class="modal fade" id="modalverSalidasMprimaEdit" tabindex="-1" aria-labelledby="modalverSalidasMprimaEdit"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalverSalidasMprimaEdit">Todas las Salidas de Almacen Producto Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="">

        <table id="dataTableSalidasMprimaEdit" class="display dataTableSalidasMprimaEdit">
          <thead>
            <!-- dataTableSalidasMprimaEdit -->
          </thead>
          <tbody>
            <!--dataTableSalidasMprimaEdit-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Fin  -->

<!-- Modal ver productos prima salidas del boton no tocar-->
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
<!-- Fin -->

<!-- modal Tipo de  Proceso Operativo-->
<div class="modal fade" id="modalTipoProcesoOp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalTipoProcesoOp" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalCrearProcesoOpH1">Crear Tipo de Proceso Operativo</h1>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <div class="container">
          <form id="formTipoProcesoOpAdd">
            <div class="row">
              <!-- nombre de tipo de proceso operativo -->
              <div class="col-md-6  mb-3">
                <label for="nombreTipoProcOpAdd" class="form-label" style="font-weight: bold">Nombre Tipo de Proceso
                  Operativo:
                </label>
                <input type="text" class="form-control" id="nombreTipoProcOpAdd" name="nombreTipoProcOpAdd"
                  placeholder="Ingrese el nombre del tipo de proceso operativo ">
              </div>
              <!-- descripcion del tipo de proceso operativo -->
              <div class="col-md-6  mb-3">
                <label for="descripcionTipoProcOpAdd" class="form-label" style="font-weight: bold">Descripcion Tipo de
                  Proceso:
                </label>
                <input type="text" class="form-control" id="descripcionTipoProcOpAdd" name="descripcionTipoProcOpAdd"
                  placeholder="Ingrese una descripcion del tipo de proceso operativo ">
              </div>
              <!-- selecionar la fichas de trabajo creadas -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idFichTrabProcAdd">Selecionar Ficha de Trabajo</label>
                  <select id="idFichTrabProcAdd" style="width: 100%;"></select>
                </div>
              </div>
              <!-- ver las fichas de trabajo creadas -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="codTipProc">Ver las Fichas de Trabajo Registradas</label>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#modalverFichasTrabajo">
                    Ver Todas las Fichas de Trabajo
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" id="crearTipoProcModal">Crear Tipo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin -->
<!-- modal editar Tipo de  Proceso Operativo-->
<div class="modal fade" id="modalEditTipoProcesoOp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalEditTipoProcesoOp" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalEditTipoProcesoOp">Editar Tipo de Proceso Operativo</h1>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <div class="container">
          <form id="formTipoProcesoOpEdit">
            <div class="row">
              <!-- nombre de tipo de proceso operativo -->
              <div class="col-md-6  mb-3">
                <label for="nombreTipoProcOpEdit" class="form-label" style="font-weight: bold">Nombre Tipo de Proceso
                  Operativo:
                </label>
                <input type="text" class="form-control" id="nombreTipoProcOpEdit" name="nombreTipoProcOpEdit"
                  placeholder="Ingrese el nombre del tipo de proceso operativo ">
              </div>
              <!-- descripcion del tipo de proceso operativo -->
              <div class="col-md-6  mb-3">
                <label for="descripcionTipoProcOpEdit" class="form-label" style="font-weight: bold">Descripcion Tipo de
                  Proceso:
                </label>
                <input type="text" class="form-control" id="descripcionTipoProcOpEdit" name="descripcionTipoProcOpEdit"
                  placeholder="Ingrese una descripcion del tipo de proceso operativo ">
              </div>
              <!-- selecionar la fichas de trabajo creadas -->
              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="idFichTrabProcEdit">Selecionar Ficha de Trabajo</label>
                  <select id="idFichTrabProcEdit" style="width: 100%;"></select>
                </div>
              </div>

              <!-- campo que guarde el id del registro-->
              <input type="hidden" class="form-control" id="codTipoProc" name="codTipoProc">

              <!-- ver las fichas de trabajo creadas -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="codTipProc">Ver las Fichas de Trabajo Registradas</label>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#modalverFichasTrabajo">
                    Ver Todas las Fichas de Trabajo
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
              id="cerrarModalEditTipoProc">Cerrar</button>
            <button type="button" class="btn btn-primary" id="editarTipoProcModal">Editar Tipo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin editar-->

<!-- modal data table  ver todas las fichas de trabajo creadas no tocar-->
<div class="modal fade" id="modalverFichasTrabajo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalverFichasTrabajo" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalInicioProcesoOpH1">Todas las fichas de trabajo
          Registradas</h1>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <div class="container">

          <div class="row">

            <div class="card-body">
              <!-- dataTableFichaTrabajo -->
              <table id="dataTableFichaTrabajo" class="display dataTableFichaTrabajo">
                <thead>
                  <!-- dataTableFichaTrabajo -->
                </thead>
                <tbody>
                  <!--dataTableFichaTrabajo-->
                </tbody>
              </table>
              <!-- fin -->
            </div>

            <div class="modal-footer">
              <button type="button" id="cerrarFichasTrabajoModal" class="btn btn-danger"
                data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal ver todos los procesos de trabajo no tocar-->
<div class="modal fade" id="modalProcesosTrabajo" tabindex="-1" aria-labelledby="modalProcesosTrabajoLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalProcesosTrabajoLabel">Procesos Trabajo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">

        <table id="ModalDataTableProcesoTrabajo" class="display ModalDataTableProcesoTrabajo">
          <thead>
            <!-- ModalDataTableProcesoTrabajo -->
          </thead>
          <tbody>
            <!--ModalDataTableProcesoTrabajo-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Fin ver todas las fichas de trabajo creadas -->

<!-- Modal ver todos los tipos de procesos-->
<div class="modal fade" id="modalDataTableTipoProcesoOp" tabindex="-1" aria-labelledby="modalDataTableTipoProcesoOp"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalDataTableTipoProcesoOp">Tipos de Procesos Operativos</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">

        <table id="modalDataTableTiposDeProceso" class="display modalDataTableTiposDeProceso">
          <thead>
            <!-- modalDataTableTiposDeProceso -->
          </thead>
          <tbody>
            <!--modalDataTableTiposDeProceso-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Fin ver todas las fichas de trabajo creadas -->

<!-- Modal ver productos prima salidas del boton de proceso operativo no tocar-->
<div class="modal fade" id="modalProdSalidasProcOP" tabindex="-1" aria-labelledby="modalProdSalidasProcOP"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Productos salida de Almacen</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="">

        <table id="modalDataTableProdSalidaProcOp" class="display modalDataTableProdSalidaProcOp">
          <thead>
            <!-- modalDataTableProdSalidaProcOp -->
          </thead>
          <tbody>
            <!--modalDataTableProdSalidaProcOp-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Fin -->

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


              <div class="col-md-6 mb-3">
                <label for="fechaFinProcOpAdd" class="form-label" style="font-weight: bold"> Fecha Inicio
                  Proceso:</label>
                <input type="date" class="form-control" id="fechaFinProcOpAdd" name="fechaFinProcOpAdd" disabled>
              </div>

              <div class="col-md-6 mb-3">
                <label for="fechaFinProcOpAdd" class="form-label" style="font-weight: bold"> Fecha Fin
                  Proceso:</label>
                <input type="date" class="form-control" id="fechaFinProcOpAdd" name="fechaFinProcOpAdd" disabled>
              </div>

              <!-- selec2 para tipos de procesos -->
              <div class="col-md-12  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOp">Tipo de proceso adjunto</label>
                  <input type="text" class="form-control" id="fechaFinProcOpAdd" name="fechaFinProcOpAdd" disabled>
                </div>
              </div>

              <div class="col-md-12  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOp">Agregar Proceso de trabajo</label>
                  <select class="form-select" id="idTipoProcOp" name="idTipoProcOp">
                  </select>
                </div>
              </div>

              <div class="col-md-4  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOp">Proceso Activo</label>
                  <select class="form-select" id="idTipoProcOp" name="idTipoProcOp">
                  </select>
                </div>
              </div>

              <div class="col-md-4  mb-3">
                <div class="form-group">
                  <label for="idTipoProcOp">Cambiar estado al proceso activo </label>
                  <select class="form-select" id="idTipoProcOp" name="idTipoProcOp">
                    <option value="3">En Proceso</option>
                    <option value="3">Detenido</option>
                    <option value="4">Terminado</option>
                  </select>
                </div>
              </div>

              <!-- ver todos los proceso adjuntos  -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="codTipProc">Todos los procesos de Trabajo</label>
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#modalverProcesoTrabajo">
                    Ver procesos de Trabajo Adjuntos
                  </button>
                </div>
              </div>

              <div class="col-md-6  mb-3">
                <div class="form-group">
                  <label for="estadoPrincipal">Cambiar estado al proceso principal</label>
                  <select class="form-select" id="estadoPrincipal" name="estadoPrincipal">
                    <option value="3">En ejecucion</option>
                    <option value="4">Listo</option>
                    <option value="3">Detenido</option>
                    <option value="6">Retrasado</option>
                  </select>
                </div>
              </div>

              <!-- ver todos los proceso adjuntos  -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="">Finalizar Todo el proceso operativo</label>
                  <button type="button" class="btn btn-success">
                    Finalizar proceso Operativo
                  </button>
                </div>
              </div>

          </form>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success">Iniciar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin de estados de procesos operativos -->

<!-- modal data table  ver todas las fichas de trabajo creadas no tocar-->
<div class="modal fade" id="modalverProcesoTrabajo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalverProcesoTrabajo" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="">Todos los procesos de trabajo</h1>
      </div>
      <div class="modal-body" id="">
        <div class="container">

          <div class="row">

            <div class="card-body">
              <!-- dataTableAllProcesosDeTrabajo -->
              <table id="dataTableAllProcesosDeTrabajo" class="display dataTableAllProcesosDeTrabajo">
                <thead>
                  <!-- dataTableAllProcesosDeTrabajo -->
                </thead>
                <tbody>
                  <!--dataTableAllProcesosDeTrabajo-->
                </tbody>
              </table>
              <!-- fin -->
            </div>

            <div class="modal-footer">
              <button type="button" id="" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>