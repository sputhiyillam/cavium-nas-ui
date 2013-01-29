<?php
class CAV_process_socket extends CI_Model
{
	public function test($args)
    {
    	//print json_encode($args); exit;
        /* Get the port for the WWW service. */
	    $socketname = '/tmp/AppManagerService';

	    /* Create a Unix socket. */
	    $socket = socket_create(AF_UNIX, SOCK_STREAM, 0);
	    $timeout = array('sec'=>10,'usec'=>0);
	    socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO,$timeout);
	    
        if ($socket === false) {
	    	echo "socket failed" . socket_strerror(socket_last_error());
	    }
	    $result = socket_connect($socket, $socketname);
	    if ($result === false) {
	    	echo socket_strerror(socket_last_error($socket));
	    }
        $in = json_encode($args);
        //$in = '{"request": "{\"api\": \"get_volume_object\", \"args\": null}", "sync": true}';
		//echo $in; 
	    $length = strlen($in);
	    $strlength = sprintf("%04d", $length);
	    socket_write($socket, $strlength, strlen($strlength));
	    socket_write($socket, $in, strlen($in));
            $out = '';
	    while ($chunk = socket_read($socket, 2048)) {
           $out .= $chunk;
           // echo  ltrim($chunk, "1234567890");
        }
               //exit;
     	socket_close($socket);
        return json_decode($out);
    }
}
