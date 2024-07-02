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
      <h1 class="mt-4">Catálogo de Usuarios</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddUser">
          Agregar Usuario
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableUsuarios -->
          <h5 class="mt-4 tituloUsuarios"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableUsuarios -->
          <table id="dataTableUsuarios" class="display dataTableUsuarios">
            <thead>
              <!-- dataTableUsuarios -->
            </thead>
            <tbody>
              <!--dataTableUsuarios-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>

<!-- Modal Crear usuario -->
<div class="modal fade" id="modalAddUser" tabindex="-1" role="dialog" aria-labelledby="modalAddUser" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" id="formCrearUsuario">

          <!-- Username -->
          <div class="form-group">
            <label for="userName" class="col-form-label">Nombre de Usuario</label>
            <input type="text" class="form-control" id="userName" name="userName" required>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="userPassword" class="col-form-label">Contraseña:</label>
            <input type="password" class="form-control" id="userPassword" name="userPassword" required>
          </div>

          <!-- First Name -->
          <div class="form-group">
            <label for="userFirstName" class="col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="userFirstName" name="userFirstName" required>
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <label for="userLastName" class="col-form-label">Apellido:</label>
            <input type="text" class="form-control" id="userLastName" name="userLastName" required>
          </div>

          <!-- Profile -->
          <div class="form-group">
            <label for="userType" class="col-form-label">Perfil:</label>
            <select class="form-control" id="userType" name="userType">
              <?php
              $typesList = UsersController::ctrGetUsersType();
              foreach ($typesList as $key => $value) {
                echo '<option value="' . $value["idTipoUsu"] . '">' . $value["descripcionTipo"] . '</option>';
              }
              ?>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary " id="btnCrearUsuario">Crear Usuario</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal Edit User -->
<div class="modal fade" data-bs-backdrop="static" id="modalEditUser" tabindex="-1" aria-labelledby="modalEditUser"
  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Editar usuario</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="post" id="formCrearEditarUsuario">
        <div class="modal-body">
          <div class="box-body">

            <!-- First Name -->
            <div class="form-group">
              <label for="editFirstName" class="col-form-label">Nombre:</label>
              <input type="text" class="form-control" id="editFirstName" name="editFirstName" required>
            </div>

            <!-- Last Name -->
            <div class="form-group">
              <label for="editLastName" class="col-form-label">Apellido:</label>
              <input type="text" class="form-control" id="editLastName" name="editLastName" required>
            </div>

            <!-- Username -->
            <div class="form-group">
              <label for="editUserName" class="col-form-label">Usuario</label>
              <input type="text" class="form-control" id="editUserName" name="editUserName" required>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="editPassword" class="col-form-label">Contraseña:</label>
              <input type="password" class="form-control" id="editPassword" name="editPassword">
            </div>

            <!-- Profile -->
            <div class="form-group">
              <label for="editUserType" class="col-form-label">Perfil:</label>
              <select class="form-control" name="editUserType" id="editUserType">
                <?php
                $typesList = UsersController::ctrGetUsersType();
                foreach ($typesList as $key => $value) {
                  echo '<option value="' . $value["idTipoUsu"] . '">' . $value["descripcionTipo"] . '</option>';
                }
                ?>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="codUser" name="codUser" class="codUser">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            id="btnCerrarEditarUsuario">Cerrar</button>
          <button type="button" class="btn btn-primary" id="btnEditarUsuario">Editar Usuario</button>
        </div>
      </form>
    </div>
  </div>
</div>