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
          "volumes": [
            {
              "name": "",
              "id": "",
              "size": "",
              "used": "",
              "status": "",
            }
          ],
          "temperature": "",
          "model": "",
          "serial": "",
          "smart" : {
            "status": "",
            "short_test": {
              "status": "",
              "progress": "",
              "time_to_complete": "",
              "date_of_completion": "",
              "last_tested": "",
              "attributes": [
                {
                  "name": "",
                  "flag": "",
                  "value": {
                      "normalized": "",
                      "raw": ""
                  },
                  "worst": "",
                  "threshold": "",
                  "type": "",
                  "updated": "",
                  "failing": "",
                }
              ]
            },
            "attributes": [
              {
                "name": "",
                "flag": "",
                "value": {
                    "normalized": "",
                    "raw": ""
                },
                "worst": "",
                "threshold": "",
                "type": "",
                "updated": "",
                "failing": "",
              }
            ]
          },
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
          "raid": "",
          "size": "",
          "used": "",
          "status": "",
          "additional_info": {
            "rate_of_progress": "",
            "estimated_time": "",
            "disk_speed": ""
          },
          "disks": [
            {
              "name": "",
              "id": "",
              "status": "",
              "size": ""
            }
          ],
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
        "volumes": [
          {
            "name": "",
            "id": "",
            "size": "",
            "used": "",
            "status": "",
          }
        ],
        "temperature": "",
        "model": "",
        "serial": "",
        "smart" : {
          "status": "",
          "attributes": [
            {
              "name": "",
              "flag": "",
              "value": {
                  "normalized": "",
                  "raw": ""
              },
              "worst": "",
              "threshold": "",
              "type": "",
              "updated": "",
              "failing": "",
            }
          ],
          "short_test": {
            "status": "",
            "progress": "",
            "time_to_complete": "",
            "date_of_completion": "",
            "last_tested": "",
            "attributes": [
              {
                "name": "",
                "flag": "",
                "value": {
                    "normalized": "",
                    "raw": ""
                },
                "worst": "",
                "threshold": "",
                "type": "",
                "updated": "",
                "failing": "",
              }
            ]
          }
        },
        "actions": {
          "eject": true,
          "claim": true
        }
      }
    ]

.. note::
      By default all values are strings. If the value is an array or boolean,
      it would be mentioned.

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the disk can be       |
|                | identified                                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the disk                                     |
|                |                                                          |
+----------------+----------------------------------------------------------+
| description    | Description of the disk                                  |
|                |                                                          |
+----------------+----------------------------------------------------------+
| path           | The physical path of the disk in the NAS device.         |
|                |                                                          |
+----------------+----------------------------------------------------------+
| size           | Total size of the disk in bytes.                         |
|                |                                                          |
+----------------+----------------------------------------------------------+
| uuid           | Unique hardware id of the disk.                          |
|                |                                                          |
+----------------+----------------------------------------------------------+
| status         | Status of the disk. Can be one of the four values        |
|                |                                                          |
|                | - good                                                   |
|                |                                                          |
|                | - bad                                                    |
|                |                                                          |
|                | - foreign                                                |
|                |                                                          |
|                | - uninstalled                                            |
|                |                                                          |
+----------------+----------------------------------------------------------+
| vendor         | Manufacturing vendor of the disk.                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
| volumes        | **Array** containing brief information of volumes        |
|                | created in this disk.                                    |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | The name of the volume.                      |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | The primary key unique id by which           |
|                |           | volume can be identified.                    |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | size      | Total size of the volume in bytes.           |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | used      | Size of the volume used in bytes.            |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | status    | Status of the volume. Can                    |
|                |           | be one of the four values                    |
|                |           |                                              |
|                |           | - good                                       |
|                |           |                                              |
|                |           | - degraded                                   |
|                |           |                                              |
|                |           | - failed                                     |
|                |           |                                              |
|                |           | - resizing                                   |
|                |           |                                              |
|                |           | - building                                   |
|                |           |                                              |
|                |           | - transferring                               |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| temperature    | Temperature of the disk.                                 |
|                |                                                          |
+----------------+-----------+----------------------------------------------+
| model          | Model of the disk.                                       |
|                |                                                          |
+----------------+----------------------------------------------------------+
| serial         | Disk manufacturer serial                                 |
|                | number.                                                  |
|                |                                                          |
+----------------+----------------------------------------------------------+
| smart          | Self-Monitoring, Analysis and Reporting Technology       |
|                | System details                                           |
|                +------------+---------------------------------------------+
|                | status     | Overall S. M. A. R. T health status of the  |
|                |            | disk                                        |
|                |            |                                             |
|                +------------+---------------------------------------------+
|                | attributes | Vendor specific attributes                  |
|                |            +-----------+---------------------------------+
|                |            | name      | Name of the attribute.          |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | flag      | Attribute flag.                 |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | value     | Value of the attribute          |
|                |            |           +------------+--------------------+
|                |            |           | normalized | Normalized value of|
|                |            |           |            | the attribute.     |
|                |            |           |            |                    |
|                |            |           +------------+--------------------+
|                |            |           | raw        | Raw value of the   |
|                |            |           |            | attribute.         |
|                |            |           |            |                    |
|                |            +-----------+------------+--------------------+
|                |            | worst     | Smallest (closest to failure)   |
|                |            |           | value that the disk has recorded|
|                |            |           | at any time during its lifetime |
|                |            |           | when SMART was enabled.         |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | threshold | If the Normalized value is less |
|                |            |           | than or equal to the Threshold  |
|                |            |           | value, then the Attribute is    |
|                |            |           | said to have failed.            |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | type      | Type of the Attribute. Can      |
|                |            |           | be one of the two values        |
|                |            |           |                                 |
|                |            |           | - prefail                       |
|                |            |           |                                 |
|                |            |           | - oldage                        |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | updated   | Shows if the SMART Attribute    |
|                |            |           | values are updated during both  |
|                |            |           | normal operation and off-line   |
|                |            |           | testing, or only during         |
|                |            |           | offline testing. Can be one of  |
|                |            |           | the two values                  |
|                |            |           |                                 |
|                |            |           | - always                        |
|                |            |           |                                 |
|                |            |           | - offline                       |
|                |            |           |                                 |
+----------------+------------+-----------+---------------------------------+
| .. _flabel:    |            | failing   | Shows whether attribute's       |
|                |            |           | current Normalized value is     |
|                |            |           | less than or equal to the       |
|                |            |           | threshold value. Can be one of  |
|                |            |           | the three values                |
|                |            |           |                                 |
|                |            |           | - now                           |
|                |            |           |                                 |
|                |            |           | - past                          |
|                |            |           |                                 |
|                |            |           | - no                            |
|                |            |           |                                 |
+----------------+------------+-----------+---------------------------------+
| actions        | Actions which can be done on the disk.                   |
|                |                                                          |
+----------------+----------------------------------------------------------+

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
        "raid": "",
        "size": "",
        "used": "",
        "status": "",
        "additional_info": {
          "rate_of_progress": "",
          "estimated_time": "",
          "disk_speed": ""
        },
        "disks": [
          {
            "name": "",
            "id": "",
            "status": "",
            "size": ""
          }
        ],
        "actions": {
          "edit": true,
          "delete" : true,
          "migrate": {
          },
          "extend": {
          }
        }
      }
    ]

.. note::
      By default all values are strings. If the value is an array or boolean,
      it would be mentioned.

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the volume can be     |
|                | identified                                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the volume                                   |
|                |                                                          |
+----------------+----------------------------------------------------------+
| description    | Description of the volume                                |
|                |                                                          |
+----------------+----------------------------------------------------------+
| raid           | Raid type of the volume                                  |
|                |                                                          |
+----------------+----------------------------------------------------------+
| size           | An entity which gives                                    |
|                | size details of the volume.                              |
|                | Will follow the semantics                                |
|                | mentioned in `Volume Size                                |
|                | <#volume-size-label>`_                                   |
|                |                                                          |
+----------------+----------------------------------------------------------+
| status         | Status of the volume. Can                                |
|                | be one of the four values                                |
|                |                                                          |
|                | - good                                                   |
|                |                                                          |
|                | - degraded                                               |
|                |                                                          |
|                | - failed                                                 |
|                |                                                          |
|                | - resizing                                               |
|                |                                                          |
|                | - building                                               |
|                |                                                          |
|                | - transferring                                           |
|                |                                                          |
+----------------+----------------------------------------------------------+
| disks          | **Array** containing ids (primary keys                   |
|                | of disks used for this volume.                           |
|                |                                                          |
+----------------+----------------------------------------------------------+
| encrypted      | **Boolean** value which says                             |
|                | whether the volume is                                    |
|                | encrypted or not.                                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
| actions        |                                                          |
|                |                                                          |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | edit      | **Boolean** value which says whether editing |
|                |           | this volume is possible.                     |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | delete    | **Boolean** value which says whether deleting|
|                |           | this volume is possible.                     |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | migrate   | Details of migrations possible in this       |
|                |           | volume.                                      |
|                |           |                                              |
|                |           +------------+---------------------------------+
|                |           | to_raid5   | Boolean - to                    |
|                |           |            | raid5                           |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | to_raid10  | Boolean - to                    |
|                |           |            | raid10                          |
|                |           |            |                                 |
|                +-----------+------------+---------------------------------+
|                | extend    | Details of whether the raid can be extended  |
|                |           | with additional disks.                       |
|                |           |                                              |
|                |           +------------+---------------------------------+
|                |           | disks      | **Array** of disks ids which    |
|                |           |            | can be used for extending.      |
|                |           |            | extending.                      |
|                |           |            |                                 |
|                +-----------+------------+---------------------------------+
|                | recover   |                                              |
|                |           |                                              |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
|                |                                                          |
|                |                                                          |
|                |                                                          |
|                |                                                          |
+----------------+----------------------------------------------------------+
|                |                                                          |
|                |                                                          |
|                |                                                          |
|                |                                                          |
+----------------+----------------------------------------------------------+
|                |                                                          |
|                |                                                          |
|                |                                                          |
|                |                                                          |
+----------------+----------------------------------------------------------+

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
