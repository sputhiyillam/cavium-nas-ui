============
Storage
============

.. note::
      This is a work in progress

The storage api encompasses the following sub modules.

* `Disks <#disks-label>`_
* `Volumes <#volumes-label>`_
* `Shares <#shares-label>`_

The following is a generic storage api::

    {
      "disks": [
        {
          "id": "",
          "name": "",
          "description": "",
          "path": "",
          "size": "",
          "uuid": "",
          "status": "",
          "vendor": "",
          "volumes": [],
          "temperature": "",
          "serial": "",
          "actions": {
            "eject": true,
            "claim": true
          }
        }
      ],
      "volumes": [
        {
          "id": "",
          "name": "",
          "description": "",
          "size": {
            "used": "",
            "total": ""
          },
          "status": "",
          "disks": [],
          "actions": {
            "edit": true,
            "delete" : true,
            "migrate": {
            },
            "extend": {
            }
          }
        }
      ],
      "iscsi": [
      ]
    }

.. _disks-label:

Disks
=====
The disks api exposes interfaces related to disks present in the the NAS device.

.. _disk-object-label:

Disk Object
------------

The following represents a disk object::

    [
      {
        "id": "",
        "name": "",
        "description": "",
        "path": "",
        "size": "",
        "uuid": "",
        "status": "",
        "vendor": "",
        "volumes": [],
        "temperature": "",
        "serial": "",
        "actions": {
            "eject": true,
            "claim": true
        }
      }
    ]

+----------------+-----------------------------+
| Name           | Value                       |
|                |                             |
+================+=============================+
|                |                             |
| id             | The primary key unique id   |
|                | by which the disk can be    |
|                | identified                  |
|                |                             |
+----------------+-----------------------------+
| name           | The name of the disk        |
+----------------+-----------------------------+
| description    | Description of the disk     |
+----------------+-----------------------------+
| path           | The physical path of the    |
|                | disk in the NAS device.     |
|                |                             |
+----------------+-----------------------------+
| size           | Total size of the disk in   |
|                | bytes.                      |
|                |                             |
+----------------+-----------------------------+
| uuid           | Unique hardware id of the   |
|                | disk.                       |
|                |                             |
+----------------+-----------------------------+
| status         | Status of the disk. Can be  |
|                | one of the four values      |
|                |                             |
|                | - good                      |
|                |                             |
|                | - bad                       |
|                |                             |
|                | - foreign                   |
|                |                             |
|                | - uninstalled               |
|                |                             |
+----------------+-----------------------------+
| volumes        | An array containing ids (pr |
|                | imary keys) of volumes crea |
|                | ted in this disk.           |
|                |                             |
+----------------+-----------------------------+
| temperature    | Temperature of the disk.    |
+----------------+-----------------------------+
| serial         | Disk manufacturer serial    |
|                | number.                     |
+----------------+-----------------------------+
| actions        | Actions which can be done   |
|                | on the disk                 |
+----------------+-----------------------------+

.. _volumes-label:

Volumes
=======
The volumes api exposes interfaces related to volumes present in the the NAS device.

.. _volume-object-label:

Volume Object
-------------

The following represents a volume object::

    [
      {
        "id": "",
        "name": "",
        "description": "",
        "size": {
          "used": "",
          "total": ""
        },
        "status": "",
        "disks": [],
        "actions": {
          "edit": true,
          "delete" : true,
          "migrate": {
              "to_raid5": true,
              "to_raid10": false
          },
          "extend": {
              "disks": []
          },
          "recover": {
              "disks": []
          }
        }
      }
    ]

+----------------+-----------------------------+
| Name           | Value                       |
|                |                             |
+================+=============================+
|                |                             |
| id             | The primary key unique id   |
|                | by which the volume can be  |
|                | identified                  |
|                |                             |
+----------------+-----------------------------+
| name           | The name of the volume      |
|                |                             |
+----------------+-----------------------------+
| description    | Description of the volume   |
|                |                             |
+----------------+-----------------------------+
| size           | An entity which gives       |
|                | size details of the volume. |
|                | Will follow the semantics   |
|                | mentioned in `Volume Size   |
|                | <#volume-size-label>`_      |
|                |                             |
+----------------+-----------------------------+
| status         | Status of the volume. Can   |
|                | be one of the four values   |
|                |                             |
|                | - good                      |
|                |                             |
|                | - degraded                  |
|                |                             |
|                | - failed                    |
|                |                             |
+----------------+-----------------------------+
| disks          | An array containing ids (pr |
|                | imary keys) of disks        |
|                | used for this volume.       |
|                |                             |
+----------------+-----------------------------+

.. _volume-size-label:

Volume Size
-----------
Size of the volume.

.. _shares-label:

Get Volumes
------------
Returns `Volume object <#volume-object-label>`_ containing the volumes present
in the NAS device.

    **Resource URL** http://<nas_box_ip_address>/index.php/volumes/api

    **HTTP Method** GET

Shares
======
The shares api exposes interfaces related to shares present in the the NAS device.

.. _iscsi-label:

iSCSI
======
The iscsi api exposes interfaces related to iscsi present in the the NAS device.
