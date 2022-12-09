<?php 
require_once __DIR__ ."/models/Element.php";

$id = isset($_GET['id']) ? $_GET['id'] : null;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
$texto = isset($_POST['texto']) ? $_POST['texto'] : null;
$num_ser = isset($_POST['num_ser']) ? $_POST['num_ser'] : null;
$activo = isset($_POST['activo']) ? $_POST['activo'] : null;
$prioridad = isset($_POST['prioridad']) ? $_POST['prioridad'] : null;

$element = null;
echo $_POST['nombre'];
echo $nombre;
//si esta definido hace 1
$element = Element::crearElemento($id, $nombre, $texto, $num_ser, $activo ,$prioridad);
echo($element);

?>