<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Volumes Controller
 *
*/

// This can be removed if you use __autoload() in config.php
require(APPPATH.'/libraries/REST_Controller.php');

class Volumes extends REST_Controller
{
    function api_post()
    {
        $arr = array(
            'api'   => 'create_volume',
            'args' => $this->post()
        );
        $args = array( 
            'request' => $arr,
            'sync' => false
        );
        
        $this->load->model('cav_process_socket');
        $message = $this->cav_process_socket->test($args);
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_delete($id = 0)
    {
        $arr = array(
            'api'   => 'delete_volume',
            'args' => array(
                'id'    => (int)$id
                )
        );
        $args = array( 
            'request' => $arr,
            'sync' => false
        );

        $this->load->model('cav_process_socket');
        $message = $this->cav_process_socket->test($args);
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_get()
    {
        //sleep(3);
       // $message = json_decode(file_get_contents("assets/json/volumes.json"));

        $this->load->model('cav_process_socket');
        $arr = array(
            'api'   => 'get_volume_object',
            'args' => null
        );
        $args = array( 'request' => $arr,
            'sync' => true
        );

        $message = $this->cav_process_socket->test($args);
        $this->response($message, 200);
    }

    public function api_put()
    {
        $args = array();
        if($this->put('action') === 'migrate') {
            $arr = array(
                'api'   => 'migrate_volume',
                'args' => $this->put()
            );
            $args = array( 
                'request' => $arr,
                'sync' => false
            );
        } else if($this->put('action') === 'extend') {
            $arr = array(
                'api'   => 'extend_volume',
                'args' => $this->put()
            );
            $args = array( 
                'request' => $arr,
                'sync' => false
            );
            
        } else {
            $arr = array(
                'api'   => 'recover_volume',
                'args' => $this->put()
            );
            $args = array( 
                'request' => $arr,
                'sync' => false
            );
        }
        
        $this->load->model('cav_process_socket');
        $message = $this->cav_process_socket->test($args);
        $this->response($message, 200); // 200 being the HTTP response code
    }
}
