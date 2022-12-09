addEventListener('load', (event) => {
    table_load();
})
const elementos = [

];
fetch('ws/getElement.php')
    .then(res => res.json())
    .then(data => {
        //aqui cogemos y recorremos el array de objetos de la base de datos
        for (let i = 0; i < data.data.length; i++) {
            elementos.push(data.data[i]);
        }
    })

console.log(elementos);

function table_load() {
    let table = document.getElementById("table");
    console.log(table);

    cabeceraTabla(table);
    rellenarTabla(table);

}




function rellenarTabla(table) {
    for (let i = 0; i < elementos.length; i++) {
        //Creo la fila y sus celdas
        let data = elementos[i];
        let tr = document.createElement('tr');
        tr.id = i;
        let id = data.id;
        let nom = data.nombre;
        let des = data.descripcion;
        let nser = data.nserie;
        let est = data.estado;
        let pri = data.prioridad;
        let tdNombre = document.createElement('td');
        let tdDescripcion = document.createElement('td');
        let tdSerie = document.createElement('td');
        let tdActivo = document.createElement('td');
        let tdPrioridad = document.createElement('td');
        let tdBorrar = document.createElement('td');
        let boton = document.createElement('button');
        let botoned = document.createElement('button');
        let botonguar = document.createElement('button');
        //Le doy un valor a las celdas
        tdNombre.innerHTML = data.nombre;
        tdDescripcion.innerHTML = data.descripcion;
        tdSerie.innerHTML = data.nserie;
        tdActivo.innerHTML = data.estado;
        tdPrioridad.innerHTML = data.prioridad;

        botoned.innerHTML = "Editar";
        botonguar.innerHTML = "Guardar";
        botonguar.hidden = true;
        boton.innerHTML = " <img class='img'  src=\"./img/el.png\"/>";
        boton.onclick = function () {

            Borrar(i, id, nom, nser, des, est, pri);
        };
        botoned.onclick = function () {
            edita(i);
            //esto es para ocultar el boton editar y mostrar el guardar
            botoned.hidden = true;
            botonguar.hidden = false;
        };
        botonguar.onclick = function () {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Seguro que quieres editar?',
                text: "Si editas modificaras el contenido de este!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                reverseButtons: true
            })
                .then((result) => {
                    //guarda(i);


                    //esto es para ocultar el boton editar y mostrar el guardar
                    botonguar.hidden = true;
                    botoned.hidden = false;
                    //let res = editarGuar(id,fromDat);
                    //console.log(res);
                    if (result.isConfirmed) {
                        let fromDat = guarda(i);
                        editarGuar(id, fromDat);
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            'No se ha editado el usuario :)',
                            'error'
                        )
                        location.reload();
                    }
                })

        };
        tdBorrar.appendChild(boton);
        //Añado al tr los td
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdSerie);
        tr.appendChild(tdActivo);
        tr.appendChild(tdPrioridad);
        tr.appendChild(tdBorrar);
        tr.appendChild(botoned);
        tr.appendChild(botonguar);
        //Añado a la tabla el tr
        table.appendChild(tr);
    }
}

function cabeceraTabla(table) {
    let tr = document.createElement('tr');
    let thNombre = document.createElement('th');
    let thDescripcion = document.createElement('th');
    let thSerie = document.createElement('th');
    let thActivo = document.createElement('th');
    let thPrioridad = document.createElement('th');
    let thBorrar = document.createElement('th');
    thNombre.innerHTML = "Nombre";
    thDescripcion.innerHTML = "Descripcion";
    thSerie.innerHTML = "Numero Serie";
    thActivo.innerHTML = "Activo";
    thPrioridad.innerHTML = "Prioridad";
    thBorrar.innerHTML = "Eliminar";

    tr.appendChild(thNombre);
    tr.appendChild(thDescripcion);
    tr.appendChild(thSerie);
    tr.appendChild(thActivo);
    tr.appendChild(thPrioridad);
    tr.appendChild(thBorrar);

    table.appendChild(tr);
}

function Borrar(i, id, nom, des, nser, est, pri) {
    Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: "Si lo eliminas ya no aparecera mas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Eliminado correctamente',
                'success'
            )
            id = parseInt(id);
            let fromDat = new FormData();
            fromDat.append('nombre', nom);
            fromDat.append('texto', des);
            fromDat.append('num_ser', nser);
            fromDat.append('activo', est);
            fromDat.append('prioridad', pri);

            fetch(`ws/deleteElement.php?id=${id}`, {
                method: 'post',
                body: fromDat,
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
            });
            let id_lin = document.getElementById(i);
            id_lin.remove();
        }
    })
}

function Crear() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'quieres crear un usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {


            let nom = document.getElementById("nom").value;
            let des = document.getElementById("des").value;
            let nums = document.getElementById("nums").value;
            let est;
            let prioridad;
            if (nom == null || nom == "" || nom.length == 0) {
                swalWithBootstrapButtons.fire(
                    'no creado!',
                    'Tienes que introducir al menos el nombre',
                    'error'
                )
            } else {
                //comprobamos el estado
                if (document.getElementById("est").checked) {
                    est = "activado";
                } else {
                    est = "desactvado";
                }

                //comprobamos la prioridad
                if (document.getElementById("alta").checked) {
                    prioridad = "alta";
                } else {
                    if (document.getElementById("media").checked) {
                        prioridad = "media";
                    } else {
                        if (document.getElementById("media").checked) {
                            prioridad = "baja";
                        }
                    }
                }
                let fromDat = new FormData();
                fromDat.append('nombre', nom);
                fromDat.append('texto', des);
                fromDat.append('num_ser', nums);
                fromDat.append('activo', est);
                fromDat.append('prioridad', prioridad);
                fetch("ws/createElement2.php", {
                    method: "POST",
                    body: fromDat
                })
                    .then((res) => {
                        if (res.ok) {
                            console.log("bien");
                        } else {
                            console.log("mal");
                        }
                        return res;
                    })
                swalWithBootstrapButtons.fire(
                    'Creado!',
                    'tu usuario con nombre ' + nom + ' ha sido creado',
                    'success'
                )
                    .then((res) => res.json())
            }
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha creado el usuario',
                'error'
            )
        }
    })

}

function editarGuar(id, fromDat) {
    console.log(fromDat);
    fetch(`ws/modifyElements.php?id=${id}`, {
        method: 'post',
        body: fromDat,
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                Swal.fire(
                    'Editado!',
                    'Tu usuario con id ' + response.data.id + ' sido editado',
                    'success'
                )
            } else {
                Swal.fire(
                    'No Editado!',
                    'Tienes que rellenar todos los campos',
                    'error'
                )
            }

        });

}

function buscar() {
    const searchText = document.getElementById('searchTerm').value.toLowerCase().trim();
    for (let i = 0; i < elementos.length; i++) {
        let tr = document.getElementById(i);
        if (searchText.length >= 3) {
            if (elementos[i].nombre.toLocaleLowerCase().includes(searchText) || elementos[i].descripcion.toLocaleLowerCase().includes(searchText)) {
                tr.style.backgroundColor = "#000000";
            } else {
                tr.style.backgroundColor = "#23232300";
            }
        } else {
            tr.style.backgroundColor = "#23232300";
        }
    }
}

function edita(i) {
    let celda = document.getElementById(i);
    for (j = 0; j < 5; j++) {
        let celdaj = celda.getElementsByTagName('td')[j];
        let txt = celdaj.innerHTML;
        celdaj.innerHTML = '';
        let inp = celdaj.appendChild(document.createElement('input'));
        inp.value = txt;
        //el intento del 10 no se ha podido
        /*
        if(j==3){
            inpc = celdaj.appendChild(document.createElement('input'));
            inpc.type="checkbox";
            selectList.id = "che";
        }else if(j==4){
            array = ["Alta","Media","Baja"];
            selectList = document.createElement("select");
            selectList.id = "mySelect";
            myParent.appendChild(selectList);
            for (i = 0; i < array.length; i++) {
                opcion = document.createElement("opcion");
                opcion.value = array[i];
                opcion.text = array[i];
                selectList.appendChild(opcion);
            }
            
        }else{*/
    }
}

function guarda(i) {
    let celda = document.getElementById(i);
    let fromDat = new FormData();

    for (j = 0; j < 5; j++) {
        let celdaj = celda.getElementsByTagName('td')[j];
        let inputj = celda.getElementsByTagName('td')[j].firstChild;
        /*
        if(j==3){
            if(document.getElementById('che').checked){
                inputj.value=1;
            }else{
                inputj.value=0;
            }
        }*/
        let txt = inputj.value;
        switch (j) {
            case 0:
                fromDat.append('nombre', txt);
                break;
            case 1:
                fromDat.append('texto', txt);
                break;
            case 2:
                fromDat.append('num_ser', txt);
                break;
            case 3:
                fromDat.append('activo', txt);
                break;
            case 4:
                fromDat.append('prioridad', txt);
                break;
        }
        celdaj.innerHTML = txt;
        inputj.remove();
    }
    let count = 0;
    for (let key in elementos[i]) {
        elementos[i][key] = celda.getElementsByTagName('td')[count].innerHTML;
        count++;
    }
    return fromDat;
}



