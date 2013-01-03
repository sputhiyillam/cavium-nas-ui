<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Shares Controller
 *
*/

// This can be removed if you use __autoload() in config.php
require(APPPATH.'/libraries/REST_Controller.php');

class Shares extends REST_Controller
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
        $users = array(
			array(
            'id' => 1,
            'name' => 'share1',
            'volume' => 'volume1',
            'services' => array(
                          'cifs' => true,
                          'afp' => true,
                          'nfs' => true,
                          'webdav' => true,
                          'ftp' => true,
                          'encrypted' => false,
                          'media' => true,
                          'recyclebin' => true
                          ),
            'privileges' => array(
                            'cifs_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'cifs_full_groups' => array('pankaj'),
                            'cifs_ro_users' => array(),
                            'cifs_ro_groups' => array(),
                            'cifs_na_users' => array(),
                            'cifs_na_groups' => array(),
                            'afp_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'afp_full_groups' => array('pankaj'),
                            'afp_ro_users' => array(),
                            'afp_ro_groups' => array(),
                            'afp_na_users' => array(),
                            'afp_na_groups' => array(),
                            'nfs_ips' => array('10.82.0.100', '10.82.0.101'),
                            'ftp_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'ftp_full_groups' => array('pankaj'),
                            'ftp_na_users' => array(),
                            'ftp_na_groups' => array(),
                            'webdav_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'webdav_full_groups' => array('pankaj'),
                            'webdav_na_users' => array(),
                            'webdav_na_groups' => array(),
                            )
            ),
			array(
            'id' => 2,
            'name' => 'share2',
            'volume' => 'volume2',
            'services' => array(
                          'cifs' => true,
                          'afp' => true,
                          'nfs' => true,
                          'webdav' => true,
                          'ftp' => true,
                          'encrypted' => false,
                          'media' => true,
                          'recyclebin' => true
                          ),
            'privileges' => array(
                            'cifs_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'cifs_full_groups' => array('pankaj'),
                            'cifs_ro_users' => array(),
                            'cifs_ro_groups' => array(),
                            'cifs_na_users' => array(),
                            'cifs_na_groups' => array(),
                            'afp_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'afp_full_groups' => array('pankaj'),
                            'afp_ro_users' => array(),
                            'afp_ro_groups' => array(),
                            'afp_na_users' => array(),
                            'afp_na_groups' => array(),
                            'nfs_ips' => array('10.82.0.100', '10.82.0.101'),
                            'ftp_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'ftp_full_groups' => array('pankaj'),
                            'ftp_na_users' => array(),
                            'ftp_na_groups' => array(),
                            'webdav_full_users' => array('bharath', 'deepu', 'murtuza', 'sreeni'),
                            'webdav_full_groups' => array('pankaj'),
                            'webdav_na_users' => array(),
                            'webdav_na_groups' => array(),
                            )
            )
		);
        
        if($users)
        {
            $this->response($users, 200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(array('error' => 'Couldn\'t find any users!'), 404);
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

