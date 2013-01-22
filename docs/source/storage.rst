============
Storage
============

.. note::
      This is a work in progress

The storage api encompasses the following sub modules.

* `Disks <#disks-label>`_
* `Volumes <#volumes-label>`_
* `Shares <#shares-label>`_

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
            "encrypted": false
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
            "duration_to_complete": "",
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

**Disk Object Details**

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
|                |                                                          |
|                | .. _disk-status:                                         |
|                |                                                          |
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
|                | status    | Status of the volume as described in         |
|                |           | `Volume Status <#vol-status>`_               |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | encrypted | **Boolean** value which says whether a       |
|                |           | volume is encrypted or not.                  |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| temperature    | Temperature of the disk.                                 |
|                |                                                          |
+----------------+----------------------------------------------------------+
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
|                | .. _attr:  |                                             |
|                |            |                                             |
|                | attributes | Vendor specific attributes                  |
|                |            |                                             |
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
|                |            +-----------+---------------------------------+
|                |            | failing   | Shows whether attribute's       |
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
|                | short_test | SMART short test output                     |
|                |            |                                             |
|                |            +-----------+---------------------------------+
|                |            | status    | SMART short test running status |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | progress  | SMART short test running status |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | duration  |                                 |
|                |            | _to       | Duration to complete short test |
|                |            | _complete |                                 |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | date_of   | Advanced date and time when the |
|                |            | _complet  | short test would complete       |
|                |            | ion       |                                 |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | last      | Date and time when the last     |
|                |            | _tested   | short test was performed        |
|                |            |           |                                 |
|                |            +-----------+---------------------------------+
|                |            | attributes| SMART test attributes. Refer    |
|                |            |           | `Attributes <#attr>`_           |
+----------------+------------+-----------+---------------------------------+
| actions        | Actions which can be done on the disk.                   |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | eject     | **Boolean** value which says whether         |
|                |           | ejecting this disk is possible.              |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | claim     | **Boolean** value which says whether         |
|                |           | claiming this disk is possible.              |
|                |           |                                              |
+----------------+----------------------------------------------------------+

**Error messages**

Error messages will be of the format described in :ref:`error-message`.

=============== =================================================
    Code                            Description                         
=============== =================================================
    100             Operation not allowed. Used for validation,
                    or blocking an action because another action
                    is going on.
    101             Unable to complete the action. Used for
                    internal errors.
=============== =================================================

GET - Disks
------------
Returns `Disk object <#disk-object-label>`_ containing the disks present
in the NAS device.

    **Resource URL** --> <nas-box-ip-address>/index.php/disks/api

    **Input** --> None

    **Response** --> Array of `Disk objects <#disk-object-label>`_

PUT - Claim Disk
-----------------
Takes `Disk object <#disk-object-label>`_ containing the disk to claim. The
API claims the foreign disk. 

.. note::
    Operation can be performed only on foreign disks.

..

    **Resource URL** --> <nas_box_ip_address>/index.php/disks/api

    **Input** --> `Disk object <#disk-object-label>`_

    **Response** --> `Disk object <#disk-object-label>`_ which got claimed.

POST - Eject Disk
-----------------
Takes `Disk object <#disk-object-label>`_ containing the disk to eject.
The API ejects the disk safely.

    **Resource URL** --> <nas_box_ip_address>/index.php/disks/api

    **Input** --> `Disk object <#disk-object-label>`_

    **Response** --> `Disk object <#disk-object-label>`_ which got ejected.

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
        "encrypted": false,
        "raw": false,
        "additional_info": {
          "rate_of_progress": "",
          "estimated_time": "",
          "disk_speed": ""
        },
        "disks": [
          {
            "name": "",
            "id": "",
            "size": "",
            "used": "",
            "status": ""
          }
        ],
        "shares": [
          {
            "name": "",
            "id": "",
          }
        ],
        "actions": {
          "edit": true,
          "delete" : true,
          "migrate": {
            "to_raid1": false,
            "to_raid5": false,
            "to_raid10": false,
            "disks": [],
            "mode": ""
          },
          "extend": {
            "disks": [],
            "mode": ""
          },
          "recover": false
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
| size           | Total size of the volume in bytes.                       |
|                |                                                          |
+----------------+----------------------------------------------------------+
| used           | Size of the volume used in bytes.                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
|                |                                                          |
| .. _vol-status:|                                                          |
|                |                                                          |
| status         | Status of the volume. Can                                |
|                | be one of the seven values                               |
|                |                                                          |
|                | - good                                                   |
|                |                                                          |
|                | - degraded                                               |
|                |                                                          |
|                | - failed                                                 |
|                |                                                          |
|                | - recovering                                             |
|                |                                                          |
|                | - resizing                                               |
|                |                                                          |
|                | - building                                               |
|                |                                                          |
|                | - transferring                                           |
|                |                                                          |
+----------------+----------------------------------------------------------+
| additional_in  | Additional information which is got only volume status   |
| fo             | recovering, transferring, resizing and building.         |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | rate_of   | Progress rate at which the action is         |
|                | _progress | happening.                                   |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | estimated | Estimated time of completion of the action.  |
|                | _time     |                                              |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | disk_spe  | Speed at which the disk spins.               |
|                | ed        |                                              |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| disks          | **Array** containing brief information                   |
|                | of disks used for this volume.                           |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | The name of the disk.                        |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | The primary key unique id by which           |
|                |           | disk can be identified.                      |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | size      | Total size of the disk in bytes.             |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | used      | Size of the disk used in bytes.              |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | status    | Status of the disk as described in           |
|                |           | `Disk Status <#disk-status>`_                |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| shares         | **Array** containing brief information                   |
|                | of shares present in this volume.                        |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | The name of the share.                       |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | The primary key unique id by which           |
|                |           | share can be identified.                     |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| encrypted      | **Boolean** value which says                             |
|                | whether the volume is                                    |
|                | encrypted or not.                                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
| raw            | **Boolean** value which says                             |
|                | whether the volume is                                    |
|                | raw (without filesystem) or not.                         |
|                |                                                          |
+----------------+----------------------------------------------------------+
| actions        | Actions which can be done on the volume.                 |
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
|                |           | to_raid1   | Boolean - to                    |
|                |           |            | raid1                           |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | to_raid5   | Boolean - to                    |
|                |           |            | raid5                           |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | to_raid10  | Boolean - to                    |
|                |           |            | raid10                          |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | disks      | **Array** of disks ids which    |
|                |           |            | can be used for migrating.      |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | mode       | Mode of migrating. Can be       |
|                |           |            |                                 |
|                |           |            | * online                        |
|                |           |            |                                 |
|                |           |            | * offline                       |
|                +-----------+------------+---------------------------------+
|                | extend    | Details of whether the raid can be extended  |
|                |           | with additional disks.                       |
|                |           |                                              |
|                |           +------------+---------------------------------+
|                |           | disks      | **Array** of disks ids which    |
|                |           |            | can be used for extending.      |
|                |           |            |                                 |
|                |           +------------+---------------------------------+
|                |           | mode       | Mode of extending. Can be       |
|                |           |            |                                 |
|                |           |            | * online                        |
|                |           |            |                                 |
|                |           |            | * offline                       |
|                |           |            |                                 |
|                +-----------+------------+---------------------------------+
|                | recover   | **Boolean** value which says whether the     | 
|                |           | raid can be recovered.                       |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+

GET Volumes
------------
Returns `Volume object <#volume-object-label>`_ containing the volumes present
in the NAS device.

    **Resource URL** http://<nas_box_ip_address>/index.php/volumes/api

    **Input** --> None

    **Response** --> Array of `Volume objects <#volume-object-label>`_

POST - Create Volume
---------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to create.

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got created.

DELETE - Delete Volume
-----------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to delete.

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got deleted.

PUT - Edit Volume
---------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to edit.

.. note::
      The "edit" boolean attribute in "actions" should be true.

..

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got edited.


PUT - Migrate Volume
---------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to migrate.

.. note::
      The "migrate" boolean attribute in "actions" should be true.

..

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got migrated.


PUT - Extend Volume
--------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to extend.

.. note::
      The "extend" boolean attribute in "actions" should be true.

..

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got extendd.

PUT - Recover Volume
---------------------
Takes `Volume object <#volume-object-label>`_ containing the volume to recover.

.. note::
      The "recover" boolean attribute in "actions" should be true.

..

    **Resource URL** --> <nas_box_ip_address>/index.php/volumes/api

    **Input** --> `Volume object <#volume-object-label>`_

    **Response** --> `Volume object <#volume-object-label>`_ which got recovered.

.. _shares-label:

Shares
======
The shares api exposes interfaces related to shares present in the the NAS device.::

    [
      {
        "id": "",
        "name": "",
        "description": "",
        "volume": {
          "name": "",
          "id": "",
          "size": "",
          "used": "",
          "status": "",
          "encrypted": false
        },
        "public": false,
        "cifs": {
          "enabled": true,
          "readonly": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "fullaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "noaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          }
        },
        "afp": {
          "enabled": true,
          "readonly": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "fullaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "noaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          }
        },
        "nfs": {
          "enabled": true,
          "ips": [
          ""
          ]
        },
        "ftp": {
          "enabled": true,
          "users":[
            {
              "name": "",
              "id": ""
            }
          ],
          "groups": [
            {
              "name": "",
              "id": ""
            },
          ]
        },
        "webdav": {
          "enabled": true,
          "readonly": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "fullaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          },
          "noaccess": {
            "users":[
              {
                "name": "",
                "id": ""
              }
            ],
            "groups": [
              {
                "name": "",
                "id": ""
              },
            ]
          }
        },
        "recycle_bin": {
          "enabled": false
        },
        "media_service": {
          "enabled": false
        }
      }
    ]

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the share can be      |
|                | identified                                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the share                                    |
|                |                                                          |
+----------------+----------------------------------------------------------+
| description    | Description of the share                                 |
|                |                                                          |
+----------------+----------------------------------------------------------+
| volume         | Brief info of the volume on which the share is created.  |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | Name of the volume.                          |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | Unique primary key id of the volume.         |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | size      | Size of the volume in bytes.                 |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | used      | Size of the volume used in bytes.            |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | status    | Status of the volume as specified in         |
|                |           | `Volume Status <#vol-status>`_               |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | encrypted |  **Boolean** value which says whether a      |
|                |           |  volume is encrypted or not.                 |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| public         | **Boolean** value which tells whether the share is       |
|                | public or private.                                       |
+----------------+----------------------------------------------------------+
| cifs/afp/      | Details of CIFS/AFP/Webdav services in the share.        |
| webdav         |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether the     |
|                |           | service is enabled for this share.           |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | readonly  | Details of users and groups with readonly    |
|                |           | access.                                      |
|                |           |                                              |
|                |           +----------+--------+--------------------------+
|                |           | users    | **Array** of users.               |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the user         |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the user    |
|                |           |          +--------+--------------------------+
|                |           | groups   | **Array** of groups.              |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the group        |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the group   |
|                +-----------+----------+--------+--------------------------+
|                | fullaccess| Details of users and groups with full access.|
|                |           |                                              |
|                |           +----------+--------+--------------------------+
|                |           | users    | **Array** of users.               |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the user         |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the user    |
|                |           |          +--------+--------------------------+
|                |           | groups   | **Array** of groups.              |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the group        |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the group   |
|                +-----------+----------+--------+--------------------------+
|                | noaccess  | Details of users and groups with no access.  |
|                |           |                                              |
|                |           +----------+--------+--------------------------+
|                |           | users    | **Array** of users.               |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the user         |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the user    |
|                |           |          +--------+--------------------------+
|                |           | groups   | **Array** of groups.              |
|                |           |          +--------+--------------------------+
|                |           |          | name   | Name of the group        |
|                |           |          +--------+--------------------------+
|                |           |          | id     | Unique id of the group   |
+----------------+-----------+----------+--------+--------------------------+
| ftp            | Details of FTP services in the share.                    |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether FTP     |
|                |           | service is enabled for this share.           |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | users     | **Array** of users.                          |
|                |           +--------+-------------------------------------+
|                |           | name   | Name of the user                    |
|                |           +--------+-------------------------------------+
|                |           | id     | Unique id of the user               |
|                |           +--------+-------------------------------------+
|                | groups    | **Array** of groups.                         |
|                |           +--------+-------------------------------------+
|                |           | name   | Name of the group                   |
|                |           +--------+-------------------------------------+
|                |           | id     | Unique id of the group              |
+----------------+-----------+--------+-------------------------------------+
| nfs            | Details of NFS services in the share.                    |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether NFS     |
|                |           | service is enabled for this share.           |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | readonly  | **Array** of IP addresses with readonly      |
|                |           | permissions.                                 |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | readwrite | **Array** of IP addresses with readwrite     |
|                |           | permissions.                                 |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| recycle_bin    | Details of Recycle Bin in the share.                     |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether         |
|                |           | service is enabled for this share.           |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+
| media_service  | Details of Media Services in the share.                  |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | enabled   | **Boolean** value which says whether         |
|                |           | service is enabled for this share.           |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+

GET Shares
------------
Returns `Share object <#share-object-label>`_ containing the shares present
in the NAS device.

    **Resource URL** http://<nas_box_ip_address>/index.php/shares/api

    **Input** --> None

    **Response** --> Array of `Share objects <#share-object-label>`_

POST - Create Share 
---------------------
Takes `Share object <#share-object-label>`_ containing the share to create.

    **Resource URL** --> <nas_box_ip_address>/index.php/shares/api

    **Input** --> `Share object <#share-object-label>`_

    **Response** --> `Share object <#share-object-label>`_ which got created.

DELETE - Delete Share
-----------------------
Takes `Share object <#share-object-label>`_ containing the share to delete.

    **Resource URL** --> <nas_box_ip_address>/index.php/shares/api

    **Input** --> `Share object <#share-object-label>`_

    **Response** --> `Share object <#share-object-label>`_ which got deleted.

PUT - Edit Share
---------------------
Takes `Share object <#share-object-label>`_ containing the share to edit.

    **Resource URL** --> <nas_box_ip_address>/index.php/shares/api

    **Input** --> `Share object <#share-object-label>`_

    **Response** --> `Share object <#share-object-label>`_ which got edited.

.. _iscsi-label:

iSCSI
======
The iscsi api exposes interfaces related to iscsi present in the the NAS device.
