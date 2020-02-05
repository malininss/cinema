<?php

abstract class Api
{
    public $apiName = '';

    protected $method = ''; //GET|POST|PUT|DELETE

    public $requestUri = [];
    public $requestParams = [];

    protected $action = ''; //Название метод для выполнения, будет указан дальше


    public function __construct() {
        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        header('Access-Control-Allow-Headers: X-Requested-With, content-type');
        header("Content-Type: application/json");


        //Разбиваем строку GET параметров разделенных слешем
        $this->requestUri = explode('/', trim($_SERVER['REQUEST_URI'],'/'));
        $this->requestParams = file_get_contents('php://input');
        $this->method = $_SERVER['REQUEST_METHOD'];

        if ($this->method == 'POST' && $this->requestUri[count($this->requestUri) - 1] == 'PUT') {
          $this->method = 'PUT';
        } else if ($this->method == 'POST' && $this->requestUri[count($this->requestUri) - 1] == 'DELETE') {
          $this->method = 'DELETE';
        }
    }

    public function run() {
        //Первые 2 элемента массива URI должны быть "api" и название таблицы

        if(array_shift($this->requestUri) !== 'api' || array_shift($this->requestUri) !== $this->apiName){
            throw new RuntimeException('API Not Found', 404);
        }
        //Определение действия для обработки
        $this->action = $this->getAction();

        //Если метод(действие) определен в дочернем классе API
        if (method_exists($this, $this->action)) {
            return $this->{$this->action}();
        } elseif ($this->method === 'OPTIONS') {
            return null;
        } else {
            print_r($this->method);
            throw new RuntimeException('Invalid Method', 405);
        }
    }

    protected function response($data, $status = 500) {
        header("HTTP/1.1 " . $status . " " . $this->requestStatus($status));
        return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    protected function responseWithData($data, $status = 500) {
      header("HTTP/1.1 " . $status . " " . $this->requestStatus($status));
      return $data;
    }

    private function requestStatus($code) {
        $status = array(
            200 => 'OK',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
            400 => 'Update error',
        );
        return ($status[$code])?$status[$code]:$status[500];
    }

    protected function getAction()
    {
        $method = $this->method;
        switch ($method) {
            case 'GET':
                if($this->requestUri){
                    return 'viewAction';
                } else {
                    return 'indexAction';
                }
                break;
            case 'POST':
                return 'createAction';
                break;
            case 'PUT':
                return 'updateAction';
                break;
            case 'DELETE':
                return 'deleteAction';
                break;
            default:
                return null;
        }
    }

    abstract protected function indexAction();
    abstract protected function viewAction();
    abstract protected function createAction();
    abstract protected function updateAction();
    abstract protected function deleteAction();
}
