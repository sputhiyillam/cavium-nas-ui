.. _shares-label:

======
Shares
======
The shares api exposes interfaces related to shares present in the the NAS device.

.. _share-object-label:

Share Object
-------------

The following represents a share object::

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

**Share Object Details**

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
|                |           | :ref:`Volume Status <vol-status>`.           |
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

    **Response** --> `Share object <#share-object-label>`_ which got created with a new `id`.

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

