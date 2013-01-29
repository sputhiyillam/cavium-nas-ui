<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Shares Controller
 *
*/

// This can be removed if you use __autoload() in config.php
require(APPPATH.'/libraries/REST_Controller.php');

class Disks extends REST_Controller
{   
        
    function api_get()
    {
        //sleep(2);
        $message = json_decode(file_get_contents("assets/json/disks.json"));
/*
        $this->load->model('cav_process_socket');
        $arr = array(
            'api'   => 'get_disk_object',
            'args' => null
        );
        $args = array( 'request' => $arr,
                'sync' => true
                 );
        //$new_args = json_encode($args);

        $message = $this->cav_process_socket->test($args);
  */  
        $this->response($message, 200);
    }

    public function api_put()
    {      
        $arr = array(
            'api'   => $this->put('action'),
            'args' => array(
                'disk_name' => $this->put('name'),
                'id' => $this->put('id')
                )
        );
        $args = array( 
            'request' => $arr,
            'sync' => false
        );
        $this->load->model('cav_process_socket');
        $message = $this->cav_process_socket->test($args);
        //sleep(20);
        $this->response($message, 200); // 200 being the HTTP response code
    }
}
