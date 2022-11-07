<?php 

require_once ("./models/Element.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$id = $_GET['id'] ?? "";
$newUser = new Element("", "", "", "", "");

if ($id !== "") {
    echo $newUser->deleteElement($id);
}


?>