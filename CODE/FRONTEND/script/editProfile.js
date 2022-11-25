





//al querer actualizar informacion
//del usuario, este primero debe de mostrar de 
//manera automatica los datos
//que ya se tienen 
//es por ello que se necesita primero la funcion
//que muestra el HTML del updateProdile
//para que en caso de que  no quiera actualzar todos los campos
//guarde y se quede el que ya tenia 

function updateProfileToHTML(profile){
    console.log("mostrando pagina de actualizar perfil");
    infoUpdatePerfil.innerHTML=`
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
                                src="https://randomuser.me/api/portraits/women/3.jpg"
                                alt="Admin"
                                class="rounded-circle"
                                width="270"
                            />
                            <div class="mt-3">
                                <h4>@valrmzl</h4>
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
                                    value="Lupita"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Apellido</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updateNombre"
                                    type="text"
                                    class="form-control"
                                    value="Lopez"
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
                                    value="(239) 816-9029"
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Contraseña</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input id="updateContraseña"
                                    type="text"
                                    class="form-control"
                                    value="(320) 380-4539"
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
                                    value="hhtp"
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
                                    >Guardar cambios</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

//una vez que ya se tienen los campos actualizados 
//podemos tomarlos para actualizarlos

async function loadProfileJSON(){
    console.log("CARGANDO VENTANA DE EDITAR");
    let datosToUpdate={};
    
    datosToUpdate.nombre=document.getElementById("updateNombre").value;
    datosToUpdate.apellido=document.getElementById("updateApellido").value;
    datosToUpdate.usuario=document.getElementById("updateUsuario").value;
    datosToUpdate.contraseña=document.getElementById("updateContraseña").value;
    datosToUpdate.imagen=document.getElementById("updateImagen").value;
    console.table(datosToUpdate);
    let url = "http://localhost:3000/api/profile"
    let resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-auth-user': localStorage.token
        }
    })
    if (resp.ok) {
        let toHtml = await resp.json();
        //console.log(toHtml);
        updateProfileToHTML(toHtml);
    } else {
        document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Surgio un error al momento de cargar los datos.
      </div>`
    }

    

       
   



}

const updateProfile = () => {
    let datosToUpdate={};
    datosToUpdate.nombre=document.getElementById("updateNombre").value;
    datosToUpdate.apellido=document.getElementById("updateApellido").value;
    datosToUpdate.usuario=document.getElementById("updateUsuario").value;
    datosToUpdate.contraseña=document.getElementById("updateContraseña").value;
    datosToUpdate.imagen=document.getElementById("updateImagen").value;


    console.table(datosToUpdate);



    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/api/profile");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-auth-user", localStorage.token);


    xhr.send([JSON.stringify(datosToUpdate)]);

    xhr.onload = () => {
        if (xhr.status == 400) {
            alert(xhr.response);
        } else if (xhr.status == 401) alert(xhr.response);
        else if (xhr.status != 201) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            console.log("los datos fueron actualizados");
            console.table(datosToUpdate);
            window.location.href = "profile.html";
        }
    };
};
