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
        Cotizacion D'Frida
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formNuevaCotizacio " id="formNuevaCotizacio">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3>Datos de la Empresa</h3>

        <!-- datos de la cotizacion Enpresa -->
        <div class="form-group col-md-10">
          <label for="tituloCotiAdd" class="form-label" style="font-weight: bold">Titulo Cotizacion:</label>
          <input type="text" class="form-control" id="tituloCotiAdd" name="tituloCotiAdd"
            placeholder="Ingrese un titulo de Cotizacion">
        </div>
        <div class="col-md-2">
          <label for="fechaCotiAdd" class="form-label" style="font-weight: bold">Fecha Cotizacion: </label>
          <input type="date" class="form-control" id="fechaCotiAdd" name="fechaCotiAdd">
        </div><br>

        <div class="form-group col-md-4">
          <label for="razonSocialCotiAdd" class="form-label" style="font-weight: bold">Razon Social :</label>
          <input type="text" class="form-control" id="razonSocialCotiAdd" name="razonSocialCotiAdd"
            placeholder="Ingrese la razon social de la empresa">
        </div>

        <div class="form-group col-md-4">
          <label for="nombreComercialCotiAdd" class="form-label" style="font-weight: bold">Nombre Comercial :</label>
          <input type="text" class="form-control" id="nombreComercialCotiAdd" name="nombreComercialCotiAdd"
            placeholder="Nombre comercial de la empresa">
        </div>

        <div class="form-group col-md-4">
          <label for="rucCotiAdd" class="form-label" style="font-weight: bold">Ruc :</label>
          <input type="number" class="form-control" id="rucCotiAdd" name="rucCotiAdd"
            placeholder="Ingrese el Ruc de la empresa">
        </div>
        <!-- fin -->

        <!-- datos de solicitante persona  -->
        <h3>Datos de Solicitante</h3>

        <div class="form-group col-md-6">
          <label for="nombreCotiAdd" class="form-label" style="font-weight: bold">Nombres Solicitante:</label>
          <input type="text" class="form-control" id="nombreCotiAdd" name="nombreCotiAdd" value=""
            placeholder="Nombre del solicitante">
        </div>

        <div class="form-group col-md-2">
          <label for="celularCotiAdd" class="form-label" style="font-weight: bold">Numero Celular:</label>
          <input type="number" class="form-control" id="celularCotiAdd" name="celularCotiAdd" value=""
            placeholder="Ingrese Celular">
        </div>

        <div class="form-group col-md-4">
          <label for="correoCotiAdd" class="form-label" style="font-weight: bold">Correo:</label>
          <input type="text" class="form-control" id="correoCotiAdd" name="correoCotiAdd" value=""
            placeholder="Ingrese Correo">
        </div>

        <div class="col-md-4">
          <label for="direccionCotiAdd" class="form-label" style="font-weight: bold">Direccion: </label>
          <input type="text" class="form-control" id="direccionCotiAdd" name="direccionCotiAdd"
            placeholder="Ingrese Direccion">
        </div>

        <div class="col-md-8" style="margin-bottom: 10px;">
          <label for="detalleCotiAdd" class="form-label" style="font-weight: bold">Observaciones: </label>
          <input type="text" class="form-control" id="detalleCotiAdd" name="detalleCotiAdd"
            placeholder="Ingrese observacion para la cotizacion Opcional">
        </div>
        <!-- fin -->
      </div>

      <!-- Productos -->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Productos</h3>
        <div class="d-inline-flex m-2">
          <button type="button" class="btn btn-warning" data-bs-toggle="modal"
            data-bs-target="#modalAddProdCoti">Agregar Productos</button>
        </div>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-4">Nombre</div>
          <div class="col-lg-2">Unidad</div>
          <div class="col-lg-2">Cantidad</div>
          <div class="col-lg-2">Precio Producto</div>
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->
        <div class="form-group row AddProductoCotizacion">

          <!-- aqui se agregan los productos selecionado del modal de prodcutos  -->
        </div>

        <!-- total producto  -->
        <div class="form-group row ">
          <div class="form-group col-md-4">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>

          <div class="form-group col-md-2">
            <label for="totalProdCotiAdd" class="form-label" style="font-weight: bold">Total Producto : </label>
            <input type="text" class="form-control" id="totalProdCotiAdd" name="totalProdCotiAdd" value=""
              placeholder="Total Producto Prima" readonly required>
          </div>
        </div>
        <!-- fin -->
      </div>
      <!-- fin -->

      <!-- Productos materia prima-->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Productos Materia Prima</h3>
        <div class="d-inline-flex m-2">
          <button type="button" class="btn btn-warning" data-bs-toggle="modal"
            data-bs-target="#modalAddProdMprimaCoti">Agregar Productos Materia Prima</button>
        </div>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-4">Nombre</div>
          <div class="col-lg-2">Unidad Medida</div>
          <div class="col-lg-2">Cantidad</div>
          <div class="col-lg-2">Precio Materia Prima</div>
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->
        <div class="form-group row AddProductoMprimaCotizacion">
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->

        <!-- fin -->

        <!-- total producto materia prima -->
        <div class="form-group row ">
          <div class="form-group col-md-4">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>

          <div class="form-group col-md-2">
            <label for="totalProdMprimaCotiAdd" class="form-label" style="font-weight: bold">Total Producto Prima:
            </label>
            <input type="text" class="form-control" id="totalProdMprimaCotiAdd" name="totalProdMprimaCotiAdd" value=""
              placeholder="Total Producto Prima" readonly required>
          </div>
        </div>
        <!-- fin -->
      </div>
      <!-- fin -->

      <!-- Calculo totales-->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Valores Totales Cotizacion</h3>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-4"></div>
          <div class="col-lg-2"> </div>
          <div class="col-lg-2">IGV</div>
          <div class="col-lg-2">Sub Total</div>
          <div class="col-lg-2">Total S/</div>
        </div>
        <div class="form-group row totalCotizacion">
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <button type="button" class="btn btn-info btnCalcularTotal" id="btnCalcularTotal">Calular Total Cotizacion
            </button>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="igvCotizacionAdd" name="igvCotizacionAdd" value=""
              placeholder="IGV" readonly required>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="subTotalCotizacionAdd" name="subTotalCotizacionAdd" value=""
              placeholder="Sub Total Cotizacion" readonly required>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="totalCotizacionAdd" name="totalCotizacionAdd" value=""
              placeholder="Total Cotizacion" readonly required>
          </div>
        </div>
      </div>
      <!-- fin -->
      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarCotizacion">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success "
          id="btnRegistrarCotizacion">Registrar Cotizacion</button>
      </div>
    </form>
  </main>
</div>
</div>

<!-- Modal produtos -->
<div class="modal fade" id="modalAddProdCoti" tabindex="-1" aria-labelledby="modalAddProdCoti" aria-hidden="true">
  <div class="modal-dialog modal-lg"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalAddProdCoti">Lista Productos </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableProductos" class="display dataTableProductos">
          <thead>
            <!-- dataTableProductos -->
          </thead>
          <tbody>
            <!--dataTableProductos-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal produtos materia prima -->
<div class="modal fade" id="modalAddProdMprimaCoti" tabindex="-1" aria-labelledby="modalAddProdMprimaCoti"
  aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalAddProdMprimaCoti">Lista Productos Materia Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableProductosMprima" class="display dataTableProductosMprima">
          <thead>
            <!-- dataTableProductosMprima -->
          </thead>
          <tbody>
            <!--dataTableProductosMprima-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>