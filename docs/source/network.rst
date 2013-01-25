.. _network-label:

========
Network
========
The network api exposes interfaces related to network present in the the NAS device.

.. _network-object-label:

Network Object
---------------

The following represents a network object::

    [
      {
        "id": "eth0",
        "name": "LAN 1",
        "active" : true,
        "dhcp": true,
        "ip" : "192.168.0.10",
        "netmask" : "255.255.255.0",
        "default_gw": "192.168.0.1",
        "dns" : {
            "auto": true,
            "servers": [""]
        },
        "aggregation": {
            "enabled": true,
            "mode": ""
        },
        "mtu" : 1500,
      }
    ]

**Network Object Details**

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the network can be    |
|                | identified. Can be one of the two values:                |
|                |                                                          |
|                | * eth0                                                   |
|                |                                                          |
|                | * eth1                                                   |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the network.                                 |
|                |                                                          |
+----------------+----------------------------------------------------------+
| active         | **Boolean** value which says whether the current         |
|                | interface is enabled or not.                             |
|                |                                                          |
+----------------+----------------------------------------------------------+
| dhcp           | **Boolean** value which says whether IP address is dhcp  |
|                | or static.                                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| ip             | IP address of the interface.                             |
|                |                                                          |
+----------------+----------------------------------------------------------+
| netmask        | Netmask of the interface.                                |
|                |                                                          |
+----------------+----------------------------------------------------------+
| default_gw     | Default gateway of the interface.                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
| dns            | DNS server details of the interface.                     |
|                |                                                          |
+----------------+----------------------------------------------------------+
|                | auto      | **Boolean** value which says whether dns     |
|                |           | servers should be applied automatically.     |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | servers   | **Array** containing IP addresses of DNS     |
|                |           | servers.                                     |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| aggregation    | Details of aggregation/bonding of the interfaces.        |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether the     |
|                |           | service is enabled for this interface.       |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | mode      | Details of aggregation bonding mode. Can be  |
|                |           | one of the two values.                       |
|                |           |                                              |
|                |           | * roundrobin                                 |
|                |           |                                              |
|                |           | * failover                                   |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| mtu            | Maximum transmission unit value.                         |
|                |                                                          |
+----------------+----------------------------------------------------------+

GET Network
------------
Returns `Network object <#network-object-label>`_ containing the interfaces present
in the NAS device.

    **Resource URL** http://<nas_box_ip_address>/index.php/network/api

    **Input** --> None

    **Response** --> Array of `Network objects <#network-object-label>`_

PUT - Edit Network
---------------------
Takes `Network object <#network-object-label>`_ containing the interface to edit.

    **Resource URL** --> <nas_box_ip_address>/index.php/network/api

    **Input** --> `Network object <#network-object-label>`_

    **Response** --> `Network object <#network-object-label>`_ which got edited.

