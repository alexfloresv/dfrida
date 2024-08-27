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
        Editar Ficha Tecnica D'Frida
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formEditarFcichaTecnica " id="formEditarFcichaTecnica">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3>Ficha Tecnica</h3>

        <!-- datos de la ficha tecnica  -->
        <div class="form-group col-md-10">
          <label for="nombreFichaTecEdit" class="form-label" style="font-weight: bold">Nombre Ficha Tecnica:</label>
          <input type="text" class="form-control" id="nombreFichaTecEdit" name="nombreFichaTecEdit"
            placeholder="Ingrese nombre de la ficha">
        </div>
        <div class="col-md-2">
          <label for="fechaFichaTecEdit" class="form-label" style="font-weight: bold">Fecha: </label>
          <input type="date" class="form-control" id="fechaFichaTecEdit" name="fechaFichaTecEdit">
        </div><br>

        <!-- cliente -->
        <div class="form-group col-md-4" id="nombreClienteDivEdit">

        </div>

        <!-- producto -->
        <div class="form-group col-md-4" id="prodFichaTecEdit">

        </div>

        <div class="form-group col-md-4">
          <label for="codigoFichaTecEdit" class="form-label" style="font-weight: bold">Codigo de Ficha - Orden:</label>
          <input type="text" class="form-control" id="codigoFichaTecEdit" name="codigoFichaTecEdit"
            placeholder="Ingrese el Codigo de la FIcha">
        </div>

        <div class="form-group col-md-6">
          <label for="nombreSoliFichaTecEdit" class="form-label" style="font-weight: bold">RUC/DNI:</label>
          <input type="text" class="form-control" id="nombreSoliFichaTecEdit" name="nombreSoliFichaTecEdit" value=""
            placeholder="Opcional">
        </div>

        <div class="form-group col-md-2">
          <label for="celularFichaTecEdit" class="form-label" style="font-weight: bold">Numero Celular:</label>
          <input type="number" class="form-control" id="celularFichaTecEdit" name="celularFichaTecEdit" value=""
            placeholder="Ingrese Celular">
        </div>

        <div class="form-group col-md-4">
          <label for="correoFichaTecEdit" class="form-label" style="font-weight: bold">Correo:</label>
          <input type="text" class="form-control" id="correoFichaTecEdit" name="correoFichaTecEdit" value=""
            placeholder="Ingrese Correo">
        </div>

        <div class="col-md-12" style="margin-bottom: 10px;">
          <label for="detalleFichaTecEdit" class="form-label" style="font-weight: bold">Observaciones: </label>
          <input type="text" class="form-control" id="detalleFichaTecEdit" name="detalleFichaTecEdit"
            placeholder="Ingrese observacion para la Ficha tecnica">
        </div>
        <!-- fin -->

        <!-- campo que guardel valor del boton y del ajax -->
        <input type="hidden" class="form-control" id="codFichaTec" name="codFichaTec">

        <!-- campo que guardel valor del boton y del ajax -->
        <input type="hidden" class="form-control" id="codFichaTecEdit" name="codFichaTecEdit">

        <!-- campo que guarda el valor dela ficha tecnica del ajax para validarlo en el servidor-->
        <input type="hidden" class="form-control" id="fichaTecDocEdit" name="fichaTecDocEdit">

      </div>

      <!-- archivo ficha tecnica -->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <h3>Subir Nueva Ficha Tecnica</h3>
          <div class="d-inline-flex flex-column align-items-center m-2" style="text-align: center;">
            <button type="button" class="btn btn-warning btnfileFichaTecnicaEdit" id="btnfileFichaTecnicaEdit"
              style="flex-direction: column-reverse; align-items: center;">
              <span style="display: block;">Editar Ficha técnica</span>
              <i class="fa-solid fa-upload" style="font-size: 30px;"></i>
            </button>
            <input type="file" id="fileFichaTecnicaEdit" style="display: none;" />
            <div id="progressBarContainer"
              style="width: 100%; background-color: #ddd; margin-top: 10px; border-radius: 5px;">
              <div id="progressBarEdit" style="height: 30px; width: 0%; background-color: #4CAF50; border-radius: 5px;">
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- fin -->

      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarEditFichaTecnica">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success " id="btnEditarFichaTecnica">Editar
          Ficha tecnica</button>
      </div>
    </form>
  </main>
</div>
</div>