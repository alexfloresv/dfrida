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
        Ficha Tecnica D'Frida
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formFichaTecnica " id="formFichaTecnica"
      enctype="multipart/form-data">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3>Ficha Tecnica</h3>

        <div class="form-group col-md-10">
          <label for="nombreFichaTecAdd" class="form-label" style="font-weight: bold">Nombre Ficha Tecnica:</label>
          <input type="text" class="form-control" id="nombreFichaTecAdd" name="nombreFichaTecAdd"
            placeholder="Ingrese nombre de la ficha/Opcional" >
        </div>
        <div class="col-md-2">
          <label for="fechaFichaTecAdd" class="form-label" style="font-weight: bold">Fecha: </label>
          <input type="date" class="form-control" id="fechaFichaTecAdd" name="fechaFichaTecAdd" >
        </div><br>

        <div class="form-group col-md-4">
          <label for="clienteFichaTecAdd" class="form-label" style="font-weight: bold">Cliente :</label>
          <input type="text" class="form-control" id="clienteFichaTecAdd" name="clienteFichaTecAdd"
            placeholder="Ingrese nombre Cliente/Empresa/Institucion/etc/Opcional" >
        </div>

        <div class="form-group col-md-4">
          <label for="descripcionFichaTecAdd" class="form-label" style="font-weight: bold">Descripcion Ficha:</label>
          <input type="text" class="form-control" id="descripcionFichaTecAdd" name="descripcionFichaTecAdd"
            placeholder="Descripcion del Ficha/Opcional">
        </div>

        <div class="form-group col-md-4">
          <label for="codigoFichaTecAdd" class="form-label" style="font-weight: bold">Codigo de Ficha - Orden:</label>
          <input type="text" class="form-control" id="codigoFichaTecAdd" name="codigoFichaTecAdd"
            placeholder="Ingrese el Codigo de la Ficha /Opcional">
        </div>

        <div class="form-group col-md-6">
          <label for="nombreSoliFichaTecAdd" class="form-label" style="font-weight: bold">Nombre Solicitante:</label>
          <input type="text" class="form-control" id="nombreSoliFichaTecAdd" name="nombreSoliFichaTecAdd" value=""
            placeholder="Nombre del solicitante/Opcional">
        </div>

        <div class="form-group col-md-2">
          <label for="celularFichaTecAdd" class="form-label" style="font-weight: bold">Numero Celular:</label>
          <input type="number" class="form-control" id="celularFichaTecAdd" name="celularFichaTecAdd" value=""
            placeholder="Ingrese Celular/Opcional">
        </div>

        <div class="form-group col-md-4">
          <label for="correoFichaTecAdd" class="form-label" style="font-weight: bold">Correo:</label>
          <input type="text" class="form-control" id="correoFichaTecAdd" name="correoFichaTecAdd" value=""
            placeholder="Ingrese Correo/Opcional">
        </div>

        <div class="col-md-12" style="margin-bottom: 10px;">
          <label for="detalleFichaTecAdd" class="form-label" style="font-weight: bold">Observaciones: </label>
          <input type="text" class="form-control" id="detalleFichaTecAdd" name="detalleFichaTecAdd"
            placeholder="Ingrese observacion para la Ficha tecnica">
        </div>
        <!-- fin -->
      </div>

      <!-- Ficha tecnica php-->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <h3>Subir Ficha Tecnica</h3>
          <div class="d-inline-flex flex-column align-items-center m-2" style="text-align: center;">
            <button type="button" class="btn btn-warning btnfileFichaTecnica" id="btnfileFichaTecnica"
              style="flex-direction: column-reverse; align-items: center;">
              <span style="display: block;">Agregar Ficha técnica</span>
              <i class="fa-solid fa-upload" style="font-size: 30px;"></i>
            </button>
            <input type="file" id="fileFichaTecnica" name="fileFichaTecnica" style="display: none;" />
            <div id="progressBarContainer"
              style="width: 100%; background-color: #ddd; margin-top: 10px; border-radius: 5px;">
              <div id="progressBar" style="height: 30px; width: 0%; background-color: #4CAF50; border-radius: 5px;">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- fin -->

      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarFichaTecnica">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success"
          id="btnRegistrarFichaTecnica">Registrar Ficha técnica</button>

    </form>
</div>


</main>
</div>
</div>


