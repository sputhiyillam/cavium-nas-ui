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
        //$this->some_model->updateUser( $this->get('id') );
        $message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');
        
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_delete()
    {
    	//$this->some_model->deletesomething( $this->get('id') );
        $message = array('id' => $this->get('id'), 'message' => 'DELETED!');
        
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    function api_get()  
    {
        sleep(1);
        $disks = json_decode(file_get_contents("assets/json/disks.json"));
        $this->response($disks, 200);
    }

	public function api_put()
    {
        if($this->put('action') == "remove"){
            $disks = json_decode(file_get_contents("assets/json/disks.json"));
            
            foreach ($disks as $key => $value) {
                
                if($value->id == $this->put('id')) {
                    
                    $value->description = "----";
                    $value->size = "----";
                    $value->volumes = false;
                    $value->status = "Not Installed";
                    $value->actions->claim=false;
                    $value->actions->eject=false;
                }
            }
            
            file_put_contents('assets/json/disks.json', json_encode($disks));
            
            $message = array('id' => $this->put('id'), 'message' => 'Successfully updated!');
            $this->response($message, 200); // 200 being the HTTP response code
            
        } else{
            
            $disks = json_decode(file_get_contents("assets/json/disks.json"));
            foreach ($disks as $key => $value) {
                
                if($value->id == $this->put('id')) {
                    
                    $value->status = "Good";
                    $value->actions->claim=false;
                }
            }
            
            file_put_contents('assets/json/disks.json', json_encode($disks));
            
            $message = array('id' => $this->put('id'), 'message' => 'Successfully Claimed!');
            
            $this->response($message, 200); // 200 being the HTTP response code
        }
        
    }

}
