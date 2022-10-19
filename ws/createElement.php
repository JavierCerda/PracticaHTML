<?php
//Es te include es para coger las variables de los elementos y para instanciar el Elemento
include("./models/Element.php");

$nom = $_POST["nombre"];
$texto = $_POST["texto"];
$numSe = $_POST["num_ser"];
$activo = $_POST["activo"] ?? null;//si no recoge nada lo pone a null
$prio = $_POST["prioridad"] ?? null;


if(!empty($nom) && !empty($texto) && !empty( $numSe) && !empty( $prio)){
   if(empty($activo)){
    $activo="inactivo";
   }else{
    $activo="activo";
   }
    $pp = new Element ($nom, $texto, $numSe, $activo, $prio);
    $pp -> toJson();
}else{
    echo"Faltan datos";
}




?>