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
      <h1 class="mt-4">
        Ficha Trabajo D'Frida Editar
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formProcesoTrabajoEdit" id="formProcesoTrabajoEdit">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3>Flujo de Trabajo</h3>

        <!-- datos de la cotizacion Enpresa -->
        <div class="form-group col-md-6">
          <label for="tituloProcesEdit" class="form-label" style="font-weight: bold">Nombre Proceso:</label>
          <input type="text" class="form-control" id="tituloProcesEdit" name="tituloProcesEdit"
            placeholder="Ingrese el nombre del proceso">
        </div>

        <!-- producto -->
        <div class="col-md-6" id="prodFichProcTrabEdit">

        </div>

        <!-- Utiliza CSS para agregar espacio entre los divs -->
        <div style="height: 20px;"></div> <!-- Ajusta el valor de height según necesites -->

        <div class="col-md-12" style="margin-bottom: 10px;">
          <label for="detalleFichaProcEdit" class="form-label" style="font-weight: bold">Observaciones: </label>
          <textarea class="form-control" id="detalleFichaProcEdit" name="detalleFichaProcEdit"
            placeholder="Ingrese observación para el proceso de trabajo Opcional" rows="4"></textarea>
        </div>
        <!-- fin -->
      </div>

      <!-- procesos -->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Procesos a establecer para el flujo trabajo</h3>
        <div class="d-inline-flex m-2">
          <button type="button" class="btn btn-success" id="botonAbrirModalProceso" data-bs-toggle="modal"
            data-bs-target="#modalAddProceso">Agregar Nuevo Proceso</button>
        </div>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-4">Proceso</div>
          <div class="col-lg-2">Tiempo</div>
          <div class="col-lg-4">Observación</div>
        </div>

        <!-- aqui se agregan los procesos del modal de procesos  -->
        <div class="form-group row AddProcesoTrabajo">

          <!-- aqui se agregan los procesos selecionado del modal de procesos  -->
        </div>

      </div>
      <!-- fin -->

      <!-- campo que guardel valor del boton y del ajax -->
      <input type="hidden" class="form-control" id="codFichTrab" name="codFichTrab">

      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarFichaTrabajoEdit">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success " id="btnEditarFichaTrabajo">Editar
          Ficha Trabajo</button>
      </div>
    </form>
  </main>
</div>
</div>

<!-- Modal proceso -->
<div class="modal fade" id="modalAddProceso" tabindex="-1" aria-labelledby="modalTitleAddProceso" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalTitleAddProceso">Proceso nuevo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalProcesoTrabajo">
        <!-- Contenido único del modal -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="botonAgregarProceso">Agregar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>