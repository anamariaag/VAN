//let listTarea;
const colors = {
    WORK: "primary",
    SCHOOL: "secondary",
    HOME: "success",
    URGENT: "warning",
    PENDING: "danger",
    FRIENDS: "light",
    FAMILY: "info",
};

function tareasListToHTML(listTarea) {
    //console.log(listTarea);
    //listArray = [listTarea]
    let tareas = "";
    listTarea.map((tarea) => {
        let users = tarea.users.join(", ");
        let tags = "";
        let colorTag;
        //console.log(tarea.tags);
        for (let i = 0; i < tarea.tags.length; i++) {
            colorTag = tarea.tags[i];
            //console.log(colors[colorTag], tarea.tags[i]);
            tags += `<div class="badge badge-${colors[colorTag]} ml-2"
            >
                ${tarea.tags[i]}
            </div>`;
        }
        //console.log(tags);
        if (tarea.users.includes(localStorage.usuario)) {
            if (tarea.completed == true) {
                tareas = tareas + tareaCompleteToHTML(tarea, users, tags);
            } else {
                tareas = tareaIncompleteToHTML(tarea, users, tags) + tareas;
            }
        }
    });
    document.getElementById("tareas").innerHTML = tareas;
}

function tareaIncompleteToHTML(tarea, users, tags) {
    //html de la tarea
    let date = new Date(String(tarea.date).slice(0, -1));
    //console.log(date);
    return `
    <li class="list-group-item">
    <!--color de tarea: bg-->
    <div
        class="todo-indicator bg-primary"
        
    ></div>
    <div class="widget-content p-0">
        <div
            class="widget-content-wrapper"
        >
            <div
                class="widget-content-left mr-2"
            >
                <div
                    class="custom-checkbox custom-control"
                >
                    <input
                        class="custom-control-input"
                        id="task${tarea.id}"
                        type="checkbox"
                        onclick="completeTarea('${tarea.id}')"
                    />
                    <label
                        class="custom-control-label"
                        for="task${tarea.id}"
                        >&nbsp;</label
                    >
                </div>
            </div>
            <div
                class="widget-content-left"
                id = "containerIncomplete"
            >
                <div
                    class="widget-heading"
                    id = "title${tarea.id}"
                >
                ${tarea.description}
                </div>
                <!--autor-->
                <div
                    class="widget-subheading"
                >
                    ${users}
                    <!--etiquetas color: badge-->
                    ${tags}
                </div>
                <div
                    class="widget-subheading"
                >
                    ${date.toDateString()}
                </div>
            </div>
            <div
                class="widget-content-right"
            >
                <!--editar y eliminar tareas-->
                <button
                    class="border-0 btn-transition btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#editarTarea"
                    onclick="editTareaModal('${tarea.description}', '${
        tarea.date
    }', '${tarea.id}')"
                >
                    <i
                        class="fa fa-edit"
                    ></i>
                </button>
                <button
                    class="border-0 btn-transition btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#eliminarTarea"
                    onclick="confirmarDeleteTarea('${tarea.id}')"
                >
                    <i
                        class="fa fa-trash"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</li>
    `;
}

function tareaCompleteToHTML(tarea, users, tags) {
    //html de la tarea
    let date = new Date(String(tarea.date).slice(0, -1));
    //console.log(date);
    return `
    <li class="list-group-item" style="background: #eee">
    <!--color de tarea: bg-->
    <div
        class="todo-indicator bg-primary"
        
    ></div>
    <div class="widget-content p-0">
        <div
            class="widget-content-wrapper"
        >
            <div
                class="widget-content-left mr-2"
            >
                <div
                    class="custom-checkbox custom-control"
                >
                    <input
                        class="custom-control-input"
                        id="task${tarea.id}"
                        type="checkbox"
                        checked
                        onclick="completeTarea('${tarea.id}')"
                    />
                    <label
                        class="custom-control-label"
                        for="task${tarea.id}"
                        >&nbsp;</label
                    >
                </div>
            </div>
            <div
                class="widget-content-left"
                id = "containerComplete"
            >
                <div
                    class="widget-heading" 
                    id = "title${tarea.id}"
                ><del>${tarea.description}</del>
                
                </div>
                <!--autor-->
                <div
                    class="widget-subheading"
                >
                    ${users}
                    <!--etiquetas color: badge-->
                    ${tags}
                </div>
                <div
                    class="widget-subheading"
                >
                    ${date.toDateString()}
                </div>
            </div>
            <div
                class="widget-content-right"
            >
                <!--editar y eliminar tareas-->
                <button
                    class="border-0 btn-transition btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#editarTarea"
                    onclick="editTareaModal('${tarea.description}', '${
        tarea.date
    }', '${tarea.id}')"
                >
                    <i
                        class="fa fa-edit"
                    ></i>
                </button>
                <button
                    class="border-0 btn-transition btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#eliminarTarea"
                    onclick="confirmarDeleteTarea('${tarea.id}')"
                >
                    <i
                        class="fa fa-trash"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</li>
    `;
}

async function loadTareasJSON() {
    console.log("loading tareas");
    let etiquetas = document.getElementById("etiqueta").value;
    let desc = document.getElementById("search").value;
    let date = filterDay;

    if (etiquetas == "ALL") etiquetas = undefined;
    if (desc == "") desc = undefined;

    //console.log(date);
    let url = "http://localhost:3000/api/tarea";
    let filtro = false;
    if (etiquetas != undefined) {
        url = url + "?etiquetas=" + etiquetas + "&";
        filtro = true;
    }
    if (desc != undefined) {
        url = url + "?descriptcion=" + desc + "&";
        filtro = true;
    }
    if (date != undefined) {
        date =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        url = url + "?date=" + date + "&";
        filtro = true;
    }
    if (filtro) url = url.substring(0, url.length - 1);
    //console.log(url);
    let resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-user-token": localStorage.token,
        },
    });
    if (resp.ok) {
        let toHtml = await resp.json();
        //console.log(toHtml);
        tareasListToHTML(toHtml);
    } else {
        document.getElementById(
            "alerts"
        ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Surgio un error al momento de cargar los datos.
      </div>`;
    }
}

function confirmarDeleteTarea(idTarea) {
    //console.log(idTarea);
    document.getElementById("modalDelete").innerHTML = `
        <div class="modal fade" id="eliminarTarea" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Eliminar tarea</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <p class="text-center">
                            ¿Estas seguro que deseas eliminar esta tarea?
                        </p>
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                            onclick="deleteTarea('${idTarea}')"
                        >
                            Si, eliminar
                        </button>
                        <button
                            type="button"
                            class="btn btn-light"
                            data-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function deleteTarea(idTarea) {
    let url = "http://localhost:3000/api/tarea/" + idTarea;
    let resp = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-user-token": localStorage.token,
        },
    });
    if (resp.ok) {
        loadTareasJSON();
        //let toHtml = await resp.json();
        //console.log("tareas");
        //console.log(toHtml);
        //tareasListToHTML(toHtml);
    } else {
        if (resp.status == 404) {
            document.getElementById(
                "alerts"
            ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> No se puede eliminar esa tarea.
            </div>`;
        } else {
            document.getElementById(
                "alerts"
            ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> Surgio un error.
            </div>`;
        }
    }
}

function addTarea() {
    let tarea = {};
    tarea.date =
        document.getElementById("fechaTarea").value == null ||
        document.getElementById("fechaTarea").value == ""
            ? new Date()
            : document.getElementById("fechaTarea").value;
    //console.log(tarea.fecha);
    tarea.description = document.getElementById("descripcionTarea").value;
    if (tarea.description == "" || tarea.description == null) {
        document.getElementById(
            "modalalertsTarea"
        ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Por favor añade una descripción.
        </div>`;
        setTimeout(() => {
            document.getElementById("modalalertsTarea").innerHTML = ``;
        }, 5000);
    } else {
        //console.log("?");
        //tarea.description = document.getElementById("descripcionTarea").value;
        tarea.tags = document.getElementById("etiquetasAgregadasNew").innerText;
        //el default user
        tarea.users =
            document.getElementById("editselectUsersNew").innerText == ""
                ? localStorage.usuario
                : document.getElementById("editselectUsersNew").innerText;
        tarea.completed = false;
        //console.log(tarea);
        postTarea(tarea);
    }
    location.reload();
}

async function postTarea(datos) {
    let url = "http://localhost:3000/api/tarea";
    let resp = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-user-token": localStorage.token,
        },
        body: JSON.stringify(datos),
    });
    if (resp.ok) {
        //window.location.href = "home.html";
        alert("¡Tarea agregada con éxito!");
        loadTareasJSON();
    } else {
        // document.getElementById(
        //     "modalalertsM"
        // ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        // <strong>Error!</strong> Surgio un error al momento de cargar los datos. Vuelve a intentarlo
        // </div>`;
        // setTimeout(() => {
        //     document.getElementById("modalalertsM").innerHTML = ``;
        // }, 5000);
        console.log(JSON.stringify(resp));
        alert(resp);
    }
}

function editTareaModal(tareadescription, tareadate, tareaid) {
    let date = new Date(String(tareadate).slice(0, -1));
    date = date.toISOString().slice(0, 10);
    document.getElementById("modalEditarTarea").innerHTML = `
        <div class="modal fade" id="editarTarea" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Editar Tarea</h4>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                        >
                            &times;
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="col-lg-12">
                            <div class="card" id="card">
                                <div class="card-body">
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Tarea</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input
                                                type="text"
                                                class="form-control"
                                                value = "${tareadescription}"
                                                id= "descripcionTareaEdit"
                                            />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">
                                                Selección usuarios
                                            </h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <select
                                                class="form-control"
                                                id="selectUsersEdit"
                                                onchange="selectUser('selectUsersEdit', 'addselectUsersEditar')"
                                            >
                                                <option>
                                                    -- SELECCIONAR --
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Usuarios</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item"
                                                    id="addselectUsersEditar"
                                                ></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">
                                                Selección etiquetas
                                            </h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <select
                                                class="form-control"
                                                id="selectEtiquetaEdit"
                                                onchange="selectUser('selectEtiquetaEdit', 'etiquetasAgregadasEdit')"
                                            >
                                                <option>
                                                    -- SELECCIONAR --
                                                </option>
                                                <option id="WORK">WORK</option>
                                                <option id="URGENT">
                                                    URGENT
                                                </option>
                                                <option id="HOME">HOME</option>
                                                <option id="FRIENDS">FRIENDS</option>
                                                <option id="FAMILY">FAMILY</option>
                                                <option id="PENDING">PENDING</option>
                                                <option id="SCHOOL">
                                                    SCHOOL
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Etiquetas</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item"
                                                    id="etiquetasAgregadasEdit"
                                                ></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Fecha</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input
                                                type="date"
                                                class="form-control"
                                                value="${date}"
                                                id="fechaTareaEdit"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" onclick="editTarea('${tareaid}')">
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            class="btn btn-light"
                            data-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    getUsers("selectUsersEdit", "addselectUsersEditar");
}

function editTarea(tareaid) {
    let tareaEdit = {};
    tareaEdit.id = tareaid;
    tareaEdit.date = document.getElementById("fechaTareaEdit").value;
    //console.log(tarea.fecha);
    tareaEdit.description = document.getElementById(
        "descripcionTareaEdit"
    ).value;
    tareaEdit.tags = document
        .getElementById("etiquetasAgregadasEdit")
        .innerText.split(", ");
    //falta poner default user
    tareaEdit.users =
        document.getElementById("addselectUsersEditar").innerText == ""
            ? localStorage.usuario
            : document
                  .getElementById("addselectUsersEditar")
                  .innerText.split(", ");
    tareaEdit.completed = false;
    //console.table(tareaEdit);
    postEditTarea(tareaEdit);
}

async function postEditTarea(datos) {
    let url = "http://localhost:3000/api/tarea";
    let resp = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-user-token": localStorage.token,
        },
        body: JSON.stringify(datos),
    });
    //console.log(datos);
    if (resp.ok) {
        loadTareasJSON();
        window.location.href = "home.html";
    } else {
        document.getElementById(
            "modalalertsE"
        ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Surgio un error al momento de editar los datos. Vuelve a intentarlo.
        </div>`;
        setTimeout(() => {
            document.getElementById("modalalertsM").innerHTML = ``;
        }, 5000);
    }
}

async function completeTarea(idtarea) {
    let url = "http://localhost:3000/api/tarea/done/" + idtarea;
    let resp = await fetch(url, {
        method: "PUT",
        headers: {
            "x-user-token": localStorage.token,
        },
    });
    //console.log(datos);
    if (resp.ok) {
        loadTareasJSON();
    } else {
        document.getElementById(
            "modalalertsE"
        ).innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Surgio un error al momento de editar los datos. Vuelve a intentarlo.
        </div>`;
        setTimeout(() => {
            document.getElementById("modalalertsM").innerHTML = ``;
        }, 5000);
    }
}
