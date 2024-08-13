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
      <h1 class="mt-4">Lista de Mermas</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableMerma -->
          <h5 class="mt-4 tituloMerma"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableMerma -->
          <table id="dataTableMerma" class="display dataTableMerma">
            <thead>
              <!-- dataTableMerma -->
            </thead>
            <tbody>
              <!--dataTableMerma-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>


<!-- Modal productos ingresados-->
<div class="modal fade" id="modalMateriaPrimaMerma" tabindex="-1" aria-labelledby="modalMateriaPrimaMerma"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">

        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <span style="margin-right: 10px;"></span>

        <form id="formMermaAdd">

          <!-- Productos materia prima-->
          <div class="container row g-3" style="border: 3px solid #808080; padding: 3px;     margin-left: 2px; ">
            <h3>Edite y elimine la Materia Prima a Mermar</h3>

            <span style="margin-right: 10px;"></span>

            <div class="col-md-6  mb-6">
              <label for="nombreMerma" class="form-label" style="font-weight: bold">Nombre Merma:
              </label>
              <input type="text" class="form-control" id="nombreMerma" name="nombreMerma"
                placeholder="Ingrese una descripcion del proceso operativo ">
            </div>

            <div class="col-md-6 ">
              <label for="fechaMermaAprob" class="form-label" style="font-weight: bold"> Fecha Aceptada:</label>
              <input type="date" class="form-control" id="fechaMermaAprob" name="fechaMermaAprob">
            </div>

            <span style="margin-right: 10px;"></span>

            <div class="row" style="font-weight: bold">
              <div class="col-lg-2">Nombre</div>
              <div class="col-lg-2">Codigo</div>
              <div class="col-lg-2">Unidad</div>
              <div class="col-lg-2">Cantidad</div>
              <div class="col-lg-2">Precio Producto</div>
            </div>
            <!-- aqui se agregan los productos del modal de prodcutos  -->
            <div class="form-group row AddMateriaPrimaMerma">

              <!-- aqui se agregan los productos selecionado del modal de prodcutos  -->
            </div>
            <!-- campo que guarde el id del registro-->
            <input type="hidden" class="form-control" id="codMerma" name="codMerma">

            <span style="margin-right: 10px;"></span>
          </div>
          <!-- fin -->
          <span style="margin-right: 10px;"></span>
      </div>
      </form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" id="crearRegistroAceptarMerma">AceptarMerma</button>
      </div>
    </div>
  </div>
</div>
<!-- fin modal de aceptar produccion -->

<!-- modal de estados de procesos operativos en merma-->
<div class="modal fade" id="modalEstadosProcesosOpMerma" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalEstadosProcesosOpMerma" aria-hidden="true">
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
</div>
<!-- fin modal/ -->

<!-- fin del div de bodyu -->
</div>