.. _volumes-label:

=======
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

**Volume Object Details**

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
|                | .. _vol-status:                                          |
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
|                |           | :ref:`Disk Status <disk-status>`.            |
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

    **Response** --> `Volume object <#volume-object-label>`_ which got created with a new `id`.

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

