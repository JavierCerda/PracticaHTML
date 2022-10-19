window.onload = function (){
    table_load();
}
const elementos = [
    {"nombre": "Javier", "texto": "Hola123", "num_ser": 123456, "activo": 1, "prioridad": "alta"},
    {"nombre": "Fran", "texto": "Hola123", "num_ser": 123456, "activo": 1, "prioridad": "alta"},
    {"nombre": "Victor", "texto": "Hola123", "num_ser": 123456, "activo": 1, "prioridad": "alta"},
    {"nombre": "manuel", "texto": "Hola123", "num_ser": 123456, "activo": 1, "prioridad": "alta"},
    {"nombre": "vicente", "texto": "Hola123", "num_ser": 123456, "activo": 1, "prioridad": "alta"},
];

function table_load() {
    let table = document.getElementById("table");
    console.log(table);

    cabeceraTabla(table);
    rellenarTabla(table);
    
}

function rellenarTabla(table) {
    for(let i = 0; i<elementos.length; i++){
        //Creo la fila y sus celdas
        let elemento = elementos[i];
        let tr = document.createElement('tr');
        tr.id = i;
        let tdNombre = document.createElement('td');
        let tdDescripcion = document.createElement('td');
        let tdSerie = document.createElement('td');
        let tdActivo = document.createElement('td');
        let tdPrioridad = document.createElement('td');
        let tdBorrar = document.createElement('td');
        let boton = document.createElement('button');
    
        //Le doy un valor a las celdas
        tdNombre.innerHTML = elemento.nombre;
        tdDescripcion.innerHTML = elemento.texto;
        tdSerie.innerHTML = elemento.num_ser;
        tdActivo.innerHTML = elemento.activo;
        tdPrioridad.innerHTML = elemento.prioridad;
        
        boton.innerHTML = " <img class='img'  src=\"./img/el.png\"/>";
        boton.onclick = function () {
            Borrar(i)
        };
        tdBorrar.appendChild(boton)
        //Añado al tr los td
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdSerie);
        tr.appendChild(tdActivo);
        tr.appendChild(tdPrioridad);
        tr.appendChild(tdBorrar);
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

function Borrar(i){
    let id_lin = document.getElementById(i);
    id_lin.remove();
}

function buscar(){
    const searchText = document.getElementById('searchTerm').value.toLowerCase().trim();
    if (searchText.length >= 3) {
        let resul = document.getElementById("resul");
        let table = document.getElementById("table");
        while (resul.firstChild) {
            table.appendChild(resul.firstChild);
        }
        for(let i = 0; i<elementos.length; i++){
            if(searchText == elementos[i].nombre.toLowerCase() || searchText  == elementos[i].texto.toLowerCase() || searchText == elementos[i].num_ser || searchText ==  elementos[i].prioridad ){
                let tr = document.getElementById(i);
                resul.appendChild(tr);
            }
        }
    }
}
