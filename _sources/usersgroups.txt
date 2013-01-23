.. _users-groups-label:

=================
Users and Groups
=================
The users and groups api exposes interfaces related to users and groups present in the the NAS device.

.. _user-object-label:

User Object
------------

The following represents a user object::

    [
      {
        "id": "",
        "name": "",
        "fullname": "",
        "email": "",
        "password": "",
        "admin": true,
        "groups": [
          {
            "id": "",
            "name": ""
          }
        ]
      }
    ]

**User Object Details**

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the user can be       |
|                | identified                                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the user                                     |
|                |                                                          |
+----------------+----------------------------------------------------------+
| fullname       | Full name of the user                                    |
|                |                                                          |
+----------------+----------------------------------------------------------+
| email          | Email of the user                                        |
|                |                                                          |
+----------------+----------------------------------------------------------+
| password       | Password of the user                                     |
|                |                                                          |
+----------------+----------------------------------------------------------+
| admin          | **Boolean** value which says whether the user has        |
|                | administrative privileges.                               |
|                |                                                          |
+----------------+----------------------------------------------------------+
| groups         | Brief info of the groups on which the user belongs to.   |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | Name of the group.                           |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | Unique primary key id of the group.          |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+

GET Users 
----------
Returns `User object <#user-object-label>`_ containing the users present
in the NAS device.

.. warning::
    Password of the users should **NOT** be returned.

..

    **Resource URL** http://<nas_box_ip_address>/index.php/users/api

    **Input** --> None

    **Response** --> Array of `User objects <#user-object-label>`_

POST - Create User
---------------------
Takes `User object <#user-object-label>`_ containing the user to create.

    **Resource URL** --> <nas_box_ip_address>/index.php/users/api

    **Input** --> `User object <#user-object-label>`_

    **Response** --> `User object <#user-object-label>`_ which got created with a new `id`.

DELETE - Delete User
---------------------
Takes `User object <#user-object-label>`_ containing the user to delete.

    **Resource URL** --> <nas_box_ip_address>/index.php/users/api

    **Input** --> `User object <#user-object-label>`_

    **Response** --> `User object <#user-object-label>`_ which got deleted.

PUT - Edit User
------------------
Takes `User object <#user-object-label>`_ containing the user to edit.

    **Resource URL** --> <nas_box_ip_address>/index.php/users/api

    **Input** --> `User object <#user-object-label>`_

    **Response** --> `User object <#user-object-label>`_ which got edited.


.. _group-object-label:

Group Object
------------

The following represents a group object::

    [
      {
        "id": "",
        "name": "",
        "description": "",
        "users": [
          {
            "id": "",
            "name": ""
          }
        ]
      }
    ]

**Group Object Details**

+----------------+----------------------------------------------------------+
| Name           | Value                                                    |
|                |                                                          |
+================+==========================================================+
| id             | The primary key unique id by which the group can be      |
|                | identified.                                              |
|                |                                                          |
+----------------+----------------------------------------------------------+
| name           | The name of the group.                                   |
|                |                                                          |
+----------------+----------------------------------------------------------+
| description    | Description of the group.                                |
|                |                                                          |
+----------------+----------------------------------------------------------+
| users          | Brief info of the users which the group contains.        |
|                |                                                          |
|                +-----------+----------------------------------------------+
|                | name      | Name of the user.                            |
|                |           |                                              |
|                +-----------+----------------------------------------------+
|                | id        | Unique primary key id of the user.           |
|                |           |                                              |
+----------------+-----------+----------------------------------------------+

GET Groups 
-----------
Returns `Group object <#group-object-label>`_ containing the groups present
in the NAS device.

    **Resource URL** http://<nas_box_ip_address>/index.php/groups/api

    **Input** --> None

    **Response** --> Array of `Group objects <#group-object-label>`_

POST - Create Group
--------------------
Takes `Group object <#group-object-label>`_ containing the group to create.

    **Resource URL** --> <nas_box_ip_address>/index.php/groups/api

    **Input** --> `Group object <#group-object-label>`_

    **Response** --> `Group object <#group-object-label>`_ which got created with a new `id`.

DELETE - Delete Group
----------------------
Takes `Group object <#group-object-label>`_ containing the group to delete.

    **Resource URL** --> <nas_box_ip_address>/index.php/groups/api

    **Input** --> `Group object <#group-object-label>`_

    **Response** --> `Group object <#group-object-label>`_ which got deleted.

PUT - Edit Group
-----------------
Takes `Group object <#group-object-label>`_ containing the group to edit.

    **Resource URL** --> <nas_box_ip_address>/index.php/groups/api

    **Input** --> `Group object <#group-object-label>`_

    **Response** --> `Group object <#group-object-label>`_ which got edited.

