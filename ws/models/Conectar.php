<?php 
require_once __DIR__ ."/../../conf/conf.inc.php";
class Conectar{
    protected $db;
    function conectar(){    
        $opciones = [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"];
        try {
            $this->db= new PDO('mysql:host=' . DB_HOST . ';dbname='. DB_NAME ,DB_USER,DB_PASS, $opciones);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->db;
        } catch (PDOException $e) {
            echo 'Falló la conexión: ' . $e->getMessage();
        }
    }

}

/*
//esto seria para el metodo mostrar element
$resultado = $db->query('SELECT * FROM elementos');
while ($personas = $resultado->fetch()){ //O bien ($resultado->fetch(PDO::FETCH_BOTH)
    echo json_encode($personas['id']." ".$personas['nombre']." ".$personas['descripcion']) ;
}
//esto seria para el metodo createelemet
$registros = $db->exec('INSERT INTO elementos (nombre) VALUES ("José"),("Luís")');
if ($registros){
    echo "Se han activado $registros registros.";
}
//esto seria el modify
$registros = $db->exec('UPDATE elementos SET nombre=("pepe") WHERE nombre=("José")');
if ($registros){
    echo "Se han activado $registros registros.";
}
//este es el delete
$registros = $db->exec('DELETE FROM elementos WHERE nombre=("pepe") ');
if ($registros){
    echo "Se han activado $registros registros.";
}*/
?>