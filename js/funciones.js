addEventListener('load', (event) => {
    table_load();
})
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
        let botoned = document.createElement('button');
        let botonguar = document.createElement('button');
        //Le doy un valor a las celdas
        tdNombre.innerHTML = elemento.nombre;
        tdDescripcion.innerHTML = elemento.texto;
        tdSerie.innerHTML = elemento.num_ser;
        tdActivo.innerHTML = elemento.activo;
        tdPrioridad.innerHTML = elemento.prioridad;

        botoned.innerHTML = "Editar";
        botonguar.innerHTML = "Guardar";
        botonguar.hidden=true;
        boton.innerHTML = " <img class='img'  src=\"./img/el.png\"/>";
        boton.onclick = function () {
            Borrar(i);
        };
        botoned.onclick = function () {
            edita(i);
            //esto es para ocultar el boton editar y mostrar el guardar
            botoned.hidden=true;
            botonguar.hidden=false;
        };
        botonguar.onclick = function () {
            guarda(i);
            //esto es para ocultar el boton editar y mostrar el guardar
            botonguar.hidden=true;
            botoned.hidden=false;
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

function Borrar(i){
    let id_lin = document.getElementById(i);
    id_lin.remove();
}

    
function buscar(){ 
    const searchText = document.getElementById('searchTerm').value.toLowerCase().trim();
    for(let i = 0; i<elementos.length; i++){
        let tr = document.getElementById(i);
        if (searchText.length >= 3) {
            if(elementos[i].nombre.toLocaleLowerCase().includes(searchText) || elementos[i].texto.toLocaleLowerCase().includes(searchText)){
                tr.style.backgroundColor="#000000";
            }else{
                tr.style.backgroundColor="#23232300";
            }
        }else{
            tr.style.backgroundColor="#23232300";
        }
    }
}

function edita(i) {
    let celda = document.getElementById(i);
    for(j=0;j<5;j++){
        let celdaj = celda.getElementsByTagName('td')[j];
        let txt = celdaj.innerHTML;
        celdaj.innerHTML = '';
        let inp = celdaj.appendChild(document.createElement('input'));
        inp.value=txt;
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
    for(j=0;j<5;j++){
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
    celdaj.innerHTML = txt;
    inputj.remove;
    }
    let count = 0;
    for(let key in elementos[i]) {
        elementos[i][key] = celda.getElementsByTagName('td')[count].innerHTML; 
        count ++;
    }
}
    
  
