<?php 
include("./interfaces/IToJson.php");

class Element implements iToJson{

    private $nombre;
    private $texto;
    private $numSer;
    private $estado;
    private $prioridad;
    
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
    $texArray = json_encode($arr);
    $abrir = fopen("../doc/doc.txt", "a");
    fwrite($abrir, $texArray . PHP_EOL);
    fclose($abrir);
    echo $texArray;
	}
}



?>