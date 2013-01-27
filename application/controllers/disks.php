<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Shares Controller
 *
*/

// This can be removed if you use __autoload() in config.php
require(APPPATH.'/libraries/REST_Controller.php');

class Disks extends REST_Controller
{
    function api_post()
    {
        sleep(4);
        $volumes = json_decode(file_get_contents("assets/json/volumes.json"));
        $new_volumes = array();
        $i = 0 ;
        foreach ($volumes as $key => $value) { 
            $new_volumes[$i] =  $value;
            $i++;
        }
        $new_volumes[$i] = $this->post();
        file_put_contents('assets/json/volumes.json', json_encode($new_volumes));

        $message = array('message' => 'Successfully Added!!');
        
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_delete()
    {
        sleep(3);
        $volumes = json_decode(file_get_contents("assets/json/volumes.json"));
        $new_volumes = array();
        $i = 0 ;
        foreach ($volumes as $key => $value) {
            if((string)$value->id !== $this->get('id')) {  
                $new_volumes[$i] =  $value;
                $i++;
            }
        }
        file_put_contents('assets/json/volumes.json', json_encode($new_volumes));

        $message = array('id' => $this->get('id'), 'message' => 'Successfully deleted!!');
        
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_get()
    {
        //sleep(2);
        $message = json_decode(file_get_contents("assets/json/disks.json"));

   /* $this->load->model('cav_process_socket');
    $arr = array(
        'api'   => 'get_volume_object',
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
        sleep(4);
        json_encode($this->put());
        $message = array('message' => 'Successfully updated !!');
        $this->response($message, 200); // 200 being the HTTP response code
    }
}