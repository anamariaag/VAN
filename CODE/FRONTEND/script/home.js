let listTarea;
const colors = {
    WORK: "primary",
    SCHOOL: "secondary",
    HOME: "success",
    URGENT: "warning",
    PENDING: "danger",
    FRIENDS: "light",
    FAMILY: "info"
}

function tareasListToHTML(){
    document.getElementById("tareas").innerHTML = listTarea.map(tarea =>{
        let users = tarea.users.join(", ");
        let tags = "";
        let colorTag;
        for(let i = 0; i < tarea.tags.length(); i++){
            colorTag = tarea.tags[i];
            tags.append(`<div class="badge badge-${colors.colorTag} ml-2"
            >
                ${tarea.tags[i]}
            </div>`);
        }
        return tareaToHTML(tarea, users, tags);
    }).join("");
}

function tareaToHTML(tarea, users, tags){
    //html de la tarea
    return (`
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
                        onclick="tareaCompletada()"
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
            >
                <div
                    class="widget-heading"
                >
                ${tarea.name}
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
                    ${tarea.date}
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
                    onclick="getUsers('selectUsersEditar', 'addselectUsersEditar')"
                >
                    <i
                        class="fa fa-edit"
                    ></i>
                </button>
                <button
                    class="border-0 btn-transition btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#eliminarTarea"
                >
                    <i
                        class="fa fa-trash"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</li>
    `)
}




async function deleteTarea(id){
    let url = "http://localhost:3000/api/tarea/"+ id
    let resp = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'x-auth-user': localStorage.token
        }
    })
    if (resp.ok) {
        let toHtml = await resp.json();
        //console.log(toHtml);
        tareasListToHTML(toHtml);
    } else {
        if(resp.status == 404){
            document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> No se puede eliminar esa tarea.
            </div>`
        }else{
            document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> Surgio un error.
            </div>`
        }
    }
}


const agregarTarea = () => {
    
};


const editarTarea = () => {
    
};


const completeTarea = () => {
    
};