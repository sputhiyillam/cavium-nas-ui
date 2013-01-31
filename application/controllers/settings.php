<?php defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH.'/libraries/REST_Controller.php');

class Settings extends REST_Controller
{   
    
    function api_get()
    {
        
        $message = json_decode(file_get_contents("assets/json/settings.json"));
       /*$this->load->model('cav_process_socket');
        $arr = array(
            'api'   => 'get_lan_ip',
            'args' => null
        );
        $args = array( 'request' => $arr,
                'sync' => true
                 );
        $message = $this->cav_process_socket->test($args);*/
        $this->response($message, 200);
    }

    public function api_put()
    {
      echo json_encode($this->put());
      /*  $this->load->model('cav_process_socket');
        $arr = array(
            'api'   => 'set_lan_ip',
            'args' => $this->put()
        );
        $args = array( 'request' => $arr,
            'sync' => false
        );
        $message = $this->cav_process_socket->test($args);*/
        //$this->response($message, 200);
    }
}
