<?php 
require_once __DIR__ ."/models/Element.php";

$id = isset($_GET['id']) ? $_GET['id'] : null;

//si esta definido el id hace 1
if(isset($_GET['id'])) {
//1
    $element = Element::getElemento($id);
}else{
    $element = Element::getElementos();
}

echo $element  ;

?>