<?php
require_once __DIR__ . "/../interfaces/IToJson.php";

class Response implements ItoJson
{

    public $success;
    public $messsage;
    public $data;

    function __construct($success, $message, $data)
    {
        $this->setSuccess($success);
        $this->setMessage($message);
        $this->setData($data);
    }

    public function setSuccess($success)
    {
        $this->success = $success;
    }

    public function setMessage($message)
    {
        $this->messsage = $message;
    }

    public function isSuccess()
    {
        return $this->success;
    }

    public function getMessage()
    {
        return $this->messsage;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function toJson()
    {
        return json_encode($this);
    }
}