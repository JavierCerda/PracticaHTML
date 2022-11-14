<?php 
include("./interfaces/IToJson.php");
include_once  __DIR__ .("./respuesta.php");
require_once __DIR__ ."/Conectar.php";

class Element extends Conectar implements iToJson{

    private $nombre;
    private $texto;
    private $numSer;
    private $estado;
    private $prioridad;
    private static $conexion;
    
    function __construct($nombre, $text, $numSer, $estado, $prioridad) {
        $this->nombre = $nombre;
        $this->texto = $text;
        $this->numSer = $numSer;
        $this->estado = $estado;
        $this->prioridad = $prioridad;
      }

    /**
     * Get the value of nombre
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of texto
     */ 
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set the value of texto
     *
     * @return  self
     */ 
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }

    /**
     * Get the value of numSer
     */ 
    public function getNumSer()
    {
        return $this->numSer;
    }

    /**
     * Set the value of numSer
     *
     * @return  self
     */ 
    public function setNumSer($numSer)
    {
        $this->numSer = $numSer;

        return $this;
    }

    /**
     * Get the value of estado
     */ 
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set the value of estado
     *
     * @return  self
     */ 
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get the value of prioridad
     */ 
    public function getPrioridad()
    {
        return $this->prioridad;
    }

    /**
     * Set the value of prioridad
     *
     * @return  self
     */ 
    public function setPrioridad($prioridad)
    {
        $this->prioridad = $prioridad;

        return $this;
    }
	/**
	 *
	 * @return mixed
	 */
	function toJson() {
        
        $arr = array(
            'Nombre' => $this -> nombre,
            'Texto' => $this -> texto,
            'numSer' => $this -> numSer,
            'estado' => $this-> estado,
            'prioridad' => $this-> prioridad
        );
        return json_encode($arr);
        /*$abrir = fopen("../doc/doc.txt", "a");
        fwrite($abrir, $texArray . PHP_EOL);
        fclose($abrir);
        echo $texArray;*/
	}


    public static function crearCon(){
        self::$conexion = new Conectar();
        self::$conexion = self::$conexion->db;
    }

    public static function getElemento($id){
        try{
            if ($id != null && is_numeric($id) && $id > 0) {
                $pp = new Conectar;
                $baz = $pp->conectar();
                $dato = $baz->query("SELECT * FROM elementos WHERE id=$id");
                if ($dato->rowCount() == 0) {
                    return self::menss(false,"El elemento con id $id no existe",null);
                }
                $resultado = $baz->query("SELECT * FROM `elementos` WHERE `id`=$id");
                $arrRes = $resultado->fetchAll(PDO::FETCH_ASSOC);
                return self::menss(true,"Estos son los elementos obtenidos",$arrRes);
            }
            return self::menss(false,"Introduce un id valido",null);
        }catch(PDOException $e){
            return self::menss(false,"ha fallado el modificar element", null);     
        }
    }
    public static function getElementos(){
        try{
            $pp = new Conectar;
            $baz = $pp->conectar();
            $dato = $baz->query("SELECT * FROM elementos");
            if ($dato->rowCount() == 0) {
                return self::menss(false,"no hay ningun elemento",null);
            }
            $resultado = $baz->query("SELECT * FROM elementos");
            $arrRes = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return self::menss(true,"Estos son los elementos encontrados",$arrRes);
        }catch(PDOException $e){
            return self::menss(false,"ha fallado el get elements", null);
        }
    }

    public static function deleteElement($id, $nombre, $texto, $num_ser, $activo, $prioridad){
        try{
            if ($id != null && is_numeric($id) && $id > 0) {
                $pp = new Conectar;
                $baz = $pp->conectar();
                $dato = $baz->query("SELECT * FROM elementos WHERE id=$id");
                if ($dato->rowCount() == 0) {
                    return self::menss(false,"El elemento con id $id no existe",null);
                }
                $baz->exec("DELETE FROM `elementos` WHERE `id`=$id");
                $fin = new Element($nombre, $texto, $num_ser, $activo, $prioridad);
                return self::menss(true,"El elemento está eliminado", json_decode($fin->toJson()));
            }
            return self::menss(false,"Introduce un id valido",null); 
        }catch(PDOException $e){
            return self::menss(false,"ha fallado el delete element", null);
        }
    }

    public static function modificarElemento($id, $nombre, $texto, $num_ser, $activo ,$prioridad){
        try{
            
            if ($id != null && is_numeric($id) && $id > 0) {
                $pp = new Conectar;
                $baz = $pp->conectar();
                $dato = $baz->query("SELECT * FROM elementos WHERE id=$id");
                if ($dato->rowCount() == 0) {
                    return self::menss(false,"El elemento con id $id no existe" ,null);
                }
                if ($nombre != null && $texto != null && $num_ser != null && $activo != null && $prioridad != null) {
                    $consulta = "UPDATE elementos SET ";
                    $condicion = " WHERE id = '$id'";
                    $coma = "";
                    if ($nombre != null) {
                        $consulta .= $coma . " nombre = '$nombre'";
                        $coma = ",";
                    }
                    if ($texto != null) {
                        $consulta .= $coma . " descripcion = '$texto'";
                        $coma = ",";
                    }
                    if ($num_ser != null) {
                        $consulta .= $coma . " nserie = '$num_ser'";
                        $coma = ",";
                    }
                    if ($activo != null) {
                        $consulta .= $coma . " estado = '$activo'";
                        $coma = ",";
                    }
                    if ($prioridad != null) {
                        $consulta .= $coma . " prioridad = '$prioridad'";
                        $coma = ",";
                    }
                    $consulta .= $condicion;
                    $baz->exec($consulta);
                    $fin = new Element($nombre, $texto, $num_ser, $activo, $prioridad);
                    return self::menss(true,"El elemento está modificado ", json_decode($fin->toJson()));
                }
                return self::menss(false,"Tienes que introducir todos los valores",null); 
            }
            return self::menss(false,"Introduce un id valido",null);
            
        }catch(PDOException $e){
            return self::menss(false,"ha fallado el modificar element", null);
        }
    }
    public static function crearElemento($id, $nombre, $texto, $num_ser, $activo ,$prioridad){
        try{  

            $pp = new Conectar;
            $baz = $pp->conectar();
            $consulta = "INSERT INTO elementos (id ,nombre, descripcion, nserie, estado, prioridad) VALUES ('$id','$nombre','$texto','$num_ser','$activo','$prioridad')";
            $baz->exec($consulta);                
            $fin = new Element($nombre, $texto, $num_ser, $activo, $prioridad);
            return self::menss(true,"El elemento está creado ", json_decode($fin->toJson()));

        }catch(PDOException $e){
            return self::menss(false,"ha fallado el create element", null);
        }
    }
    public static function menss($succ, $mess,  $data ){
        $arr = array(
            'success' => $succ,
            'message' => $mess,
            'data' => $data
        );
        $texArray = json_encode($arr);
        return $texArray;
    }  
}


?>