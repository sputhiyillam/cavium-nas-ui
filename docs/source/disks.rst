
.. _disks-label:

=====
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
|                |           | :ref:`Volume Status <vol-status>`.           |
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


