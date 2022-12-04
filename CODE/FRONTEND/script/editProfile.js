//al querer actualizar informacion
//del usuario, este primero debe de mostrar de
//manera automatica los datos
//que ya se tienen
//es por ello que se necesita primero la funcion
//que muestra el HTML del updateProdile
//para que en caso de que  no quiera actualzar todos los campos
//guarde y se quede el que ya tenia

function updateProfileToHTML(profile) {
    console.log("mostrando pagina de actualizar perfil");
    infoUpdatePerfil.innerHTML = `
    <div class="container" id="updatePerfil">
    <div class="main-body">
        <br />
        <br />
        <br />
        <br />
        <div class="row">
            <div class="col-lg-4">
                <div class="card" id="card">
                    <div class="card-body">
                        <div
                            class="d-flex flex-column align-items-center text-center"
                        >
                            <img
                                src="${profile.imagen}"
                                alt="Admin"
                                class="rounded-circle"
                                width="270"
                            />
                            <div class="mt-3">
                                <h4>@${profile.usuario}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card" id="card">
                    <div class="card-body">
                        <br /><br /><br />
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Nombre</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updateNombre"
                                    type="text"
                                    class="form-control" 
                                    value=${profile.nombre}
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Apellido</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updateApellido"
                                    type="text"
                                    class="form-control" 
                                    value=${profile.apellido}
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Usuario</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input  id="updateUsuario"
                                    type="text"
                                    class="form-control" 
                                    value=${profile.usuario}
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Contraseña</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updatePassword"
                                    type="password"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">URL</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updateImagen"
                                    type="text"
                                    class="form-control" 
                                    value=${profile.imagen}
                                />
                            </div>
                        </div>

                        <br /><br />

                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9 text-secondary">
                                <a
                                    class="btn btn-info"
                                    id="btn_guardarCambios"
                                    href="profile.html"
                                    onclick="updateProfileJSON()",
                                    >Guardar cambios</a
                                >
                            </div>
                            <div id="alertas">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

    document.getElementById("updateNombre").value = profile.nombre;
    document.getElementById("updateApellido").value = profile.apellido;
    document.getElementById("updateUsuario").value = profile.usuario;
    // document.getElementById("updatePassword").value = profile.password;
    document.getElementById("updateImagen").value = profile.imagen;
}

//una vez que ya se tienen los campos actualizados
//podemos tomarlos para actualizarlos

async function loadProfileJSON() {
    console.log("CARGANDO VENTANA DE EDITAR");
    let datosToUpdate = [];
    let currentUser = localStorage.id;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/api/users/" + currentUser);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(
                "¡No ha iniciado sesión! No tiene permisos para ver esta página :("
            );
        } else {
            datosToUpdate = JSON.parse(xhr.response);
            console.table(datosToUpdate);
            let profile = datosToUpdate[0];
            updateProfileToHTML(profile);
        }
    };
}

let profiles = [];
async function allProfiles() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/api/users");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(
                "¡No ha iniciado sesión! No tiene permisos para ver esta página :("
            );
        } else {
            profiles = JSON.parse(xhr.response);
            console.table(profiles);
        }
    };
}

async function updateProfileJSON(arreglo) {
    //debugger;
    console.log("CARGANDO VENTANA DE EDITAR");
    let update = {};
    //primero hay que revisar que no exista
    //algun usuario en la BD
    //con el mismo usuario

    //obtener todos los usuarios
    let allUsers = allProfiles;
    console.log("TODOS LOS USUARIOS");
    console.table(allUsers);
/*
    if(document.getElementById("updateUsuario").value.lenght==0 ||
    /^\s+$/.test(document.getElementById("updateUsuario").value)
    ){
        alert("No puedes dejar el campo vacio");
        console.log("No puedes dejar el campo vacio");
        return;
    }*/
   
    console.log( document.getElementById("updateUsuario").value);

    update.usuario = document.getElementById("updateUsuario").value;

    update.nombre = document.getElementById("updateNombre").value;
    
    update.apellido = document.getElementById("updateApellido").value;
    update.password = document.getElementById("updatePassword").value;
    update.imagen = document.getElementById("updateImagen").value;

  


    let xhr = new XMLHttpRequest();
    let currentUser = localStorage.id;

    xhr.open("PUT", "http://localhost:3000/api/users/" + currentUser);

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send(JSON.stringify(update));

    xhr.onload = function () {
        if(xhr.status==400){
            
            alert("El nombre de usuario que se queria actualizar no esta disponible");
        }
        if (xhr.status != 200) {
            alert(
                "¡No ha iniciado sesión! No tiene permisos para ver esta página :("
            );
        } else {
            datosToUpdate = JSON.parse(xhr.response);
            console.table(datosToUpdate);
            let profile = datosToUpdate[0];
            updateProfileToHTML(profile);
        }
    };
}
