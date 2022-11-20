window.onload = function (){
    nav();
}
function nav() {
    //con esto primero lo que hacemos es un fetch para coger
    //los datos de la pag nav.html y se lo metemos dentro de los nav
    fetch('nav.html')
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        var container = document.getElementById('lista1');
        container.innerHTML = response;
        //cogemos la URL del sitio en el que nos encontramos
        let cadenaDeTexto = window.location.href;
        //la separamos
        var url = cadenaDeTexto.split( '//' );
        var url2 = url[1].split( '/' );
        if(url2[2] === "hoja1.html"){
            var intro = document.getElementById('hoj1');  
            intro.style.backgroundColor = '#FF00FF';
        }if(url2[2] === "hoja2.html"){
            var intro = document.getElementById('hoj2');  
            intro.style.backgroundColor = '#FF00FF';
        }if(url2[2] === "hoja3.html"){
            var intro = document.getElementById('hoj3');  
            intro.style.backgroundColor = '#FF00FF';
        }if(url2[2] === "hoja4.html"){
            var intro = document.getElementById('hoj4');  
            intro.style.backgroundColor = '#FF00FF';
        }if(url2[2] === "hoja5.html"){
            var intro = document.getElementById('hoj5');  
            intro.style.backgroundColor = '#FF00FF';
        }
    });
    
}
