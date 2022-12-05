const getNotifications = async () => {
    console.log("busca notificaciones");
    document.getElementById("notifList").innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://van-dasw.onrender.com/api/notif?usuario=" + localStorage.usuario
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
    console.log(toDel.innerText);
    let xhr = new XMLHttpRequest();
    xhr.open(
        "DELETE",
        "https://van-dasw.onrender.com/api/notif?name=" +
            toDel.innerText +
            "&user=" +
            localStorage.usuario
    );
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
