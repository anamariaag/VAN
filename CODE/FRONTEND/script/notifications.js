const getNotifications = async () => {
    console.log("busca notificaciones");
    document.getElementById("notifList").innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "http://localhost:3000/api/notif?usuario=" + localStorage.usuario
    );
    xhr.setRequestHeader("x-auth-user", localStorage.token);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            let notificaciones = JSON.parse(xhr.response);
            document.getElementById("numNotif").innerText =
                notificaciones.length;
            for (let i = 0; i < notificaciones.length; i++) {
                let toAdd = document.createElement("li");
                toAdd.setAttribute("onclick", "deleteNotification(this)");
                toAdd.innerHTML =
                    '<a class="dropdown-item" href="#">' +
                    notificaciones[i] +
                    "<a>";
                document.getElementById("notifList").append(toAdd);
            }
        }
    };
    setTimeout(getNotifications, 10000);
};

const deleteNotification = (toDel) => {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/api/notif");
    xhr.setRequestHeader("x-auth-user", localStorage.token);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            toDel.remove();
            document.getElementById("numNotif").innerText--;
            // getNotifications();
        }
    };
};

getNotifications();
