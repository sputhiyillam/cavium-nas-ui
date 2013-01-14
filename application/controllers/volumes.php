<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Shares Controller
 *
*/

// This can be removed if you use __autoload() in config.php
require(APPPATH.'/libraries/REST_Controller.php');

class Volumes extends REST_Controller
{
    function api_post()
    {
        //$this->some_model->updateUser( $this->get('id') );
        $message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'desc' => $this->post('email'), 'message' => 'ADDED!');
        
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

        $volumes = array(
            array(
                'id' => 1,
                'name' => 'volume11',
                'description' => 'description about volume1',
                'size' => array(
                    'used' => '10 GB',
                    'total' => '100 GB',
                    ),
                'status' => 'Good',
                'RAID' => 'SPAN',
                'disks' => array('HDD1'),
                'actions' => array(
                    'edit' => true,
                    'delete' => true,
                    'migrate' => array(
                        'to_raid1' => false,
                        'to_raid5' => false,
                        'to_raid10' => false,
                        ),
                    'extend' => array(
                        'disks' => array('HDD2','HDD3','HDD4'),
                        ),
                    'recover' => array(
                        'disks' => array(),
                        ),
                    ),
                ),
            array(
                'id' => 2,
                'name' => 'volume2',
                'description' => 'description about volume2',
                'size' => array(
                    'used' => '100 GB',
                    'total' => '100 TB',
                    ),
                'status' => 'Good',
                'type' => 'RAID1',
                'disks' => array('HDD1', 'HDD2'),
                'actions' => array(
                    'edit' => true,
                    'delete' => true,
                    'migrate' => array(
                        'to_raid1' => false,
                        'to_raid5' => false,
                        'to_raid10' => false,
                        ),
                    'extend' => array(
                        'disks' => array('HDD3','HDD4'),
                        ),
                    'recover' => array(
                        'disks' => array(),
                        ),
                    ),
                ),
            );
        
        if($volumes)
        {
            $this->response($volumes, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any volumes!'), 404);
        }
    }

    public function send_post()
    {
        var_dump($this->request->body);
    }


    public function send_put()
    {
        var_dump($this->put('foo'));
    }
}
