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
      <h1 class="mt-4"> Catálogo de Clientes</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Clientes</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAddClients">
          Agregar Clientes
        </button>
      </div>
      <!-- inicio -->
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableClientes -->
          <h5 class="mt-4 tituloClientes"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableClientes -->
          <table id="dataTableClientes" class="display dataTableClientes">
            <thead>
              <!-- dataTableClientes -->
            </thead>
            <tbody>
              <!--dataTableClientes-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>

</div>

<!-- Modal Add Clients -->
<div class="modal fade" id="modalAddClients" tabindex="-1" role="dialog" aria-labelledby="modalAddClients"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalCreatCli">Nuevo Cliente</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" method="post"  id="formCrearCliente">
          <!-- RUC Client -->
          <div class="form-group">
            <label for="Ru" class="col-form-label">RUC / DNI :</label>
            <input type="text" class="form-control" id="Ru" name="Ru" placeholder="Opcional">
          </div>
          <!-- Razon social -->
          <div class="form-group">
            <label for="razonSocial" class="col-form-label">Razón social:</label>
            <input type="text" class="form-control" id="razonSocial" name="razonSocial" placeholder="Opcional">
          </div>
          <!-- Name Client -->
          <div class="form-group">
            <label for="NameCli" class="col-form-label">Nombre Cliente:</label>
            <input type="text" class="form-control" id="NameCli" name="NameCli" required placeholder="Obligatorio">
          </div>
          <!-- Email Client -->
          <div class="form-group">
            <label for="EmailCli" class="col-form-label">Correo Electrónico:</label>
            <input type="email" class="form-control" id="EmailCli" name="EmailCli" placeholder="Opcional">
          </div>
          <!-- Address Client -->
          <div class="form-group">
            <label for="AddressCli" class="col-form-label">Dirección:</label>
            <input type="text" class="form-control" id="AddressCli" name="AddressCli" placeholder="Opcional">
          </div>
          <!-- Phone Client -->
          <div class="form-group">
            <label for="PhoneCli" class="col-form-label">Celular:</label>
            <input type="number" class="form-control" id="PhoneCli" name="PhoneCli" placeholder="Obligatorio">
          </div>
            <!-- Observacion Cliente -->
            <div class="form-group">
            <label for="DetallCli" class="col-form-label">Observación:</label>
            <input type="text" class="form-control" id="DetallCli" name="DetallCli" placeholder="Opcional">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="btnCrearCliente">Crear Cliente</button>
          </div>
         </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal Edit Clients -->
<div class="modal fade" id="modalEditClients" tabindex="-1" role="dialog" aria-labelledby="modalEditClients"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalEditCli">Editar Cliente</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" method="post" id="formEditarClientes">
          <!-- RUC Client -->
          <div class="form-group">
            <label for="EditRu" class="col-form-label">RUC:</label>
            <input type="text" class="form-control" id="EditRu" name="EditRu" placeholder="Opcional">
          </div>
          <!-- Razon social -->
          <div class="form-group">
            <label for="EditRazonSocial" class="col-form-label">Razón social:</label>
            <input type="text" class="form-control" id="EditRazonSocial" name="EditRazonSocial" placeholder="Opcional">
          </div>
          <!-- Name Client -->
          <div class="form-group">
            <label for="EditNameCli" class="col-form-label">Nombre Cliente:</label>
            <input type="text" class="form-control" id="EditNameCli" name="EditNameCli" required>
          </div>
          <!-- Email Client -->
          <div class="form-group">
            <label for="EditEmailCli" class="col-form-label">Correo Electrónico:</label>
            <input type="email" class="form-control" id="EditEmailCli" name="EditEmailCli" placeholder="Opcional">
          </div>
          <!-- Address Client -->
          <div class="form-group">
            <label for="EditAddressCli" class="col-form-label">Dirección:</label>
            <input type="text" class="form-control" id="EditAddressCli" name="EditAddressCli" placeholder="Opcional">
          </div>
          <!-- Phone Client -->
          <div class="form-group">
            <label for="EditPhoneCli" class="col-form-label">Número de Teléfono:</label>
            <input type="number" class="form-control" id="EditPhoneCli" name="EditPhoneCli" placeholder="Opcional">
          </div>
          <!-- Detalle Client -->
          <div class="form-group">
            <label for="EditDetallCli" class="col-form-label">Observación Cliente:</label>
            <input type="text" class="form-control" id="EditDetallCli" name="EditDetallCli" placeholder="Opcional">
          </div>
          <!-- State Client -->
          <div class="form-group">
            <label for="EditStateCli" class="col-form-label">Estado:</label>
            <select class="form-control" id="EditStateCli" name="EditStateCli" required>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>
          <div class="modal-footer">
            <input type="hidden" id="codClient" name="codClient" class="codClient">
            <button type="button" class="btn btn-secondary" data-dismiss="modal"
              id="btnCerrarEditarClientes">Cerrar</button>
            <button type="button" class="btn btn-primary" id="btnEditarClientes">Editar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

