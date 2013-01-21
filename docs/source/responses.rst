
=====================
Status and Responses
=====================

Statuses and responses are known via the following:

* `Status Codes <#status-code>`_
* `Error Messages <#error-message>`_

.. _status-code:

Status Codes
=============

All APIs should return appropriate `HTTP Status codes <http://en.wikipedia.org/wiki/List_of_HTTP_status_codes>`_.

=============== ===================== ===========================
    Code               Text                Description                         
=============== ===================== ===========================
    200             OK                  Success                      
    304             Not Modified        No new data. (Cached)
    400             Bad Request         The request was invalid.
                                        The response will contain
                                        an error message 
                                        explaining the same.
    401             Unauthorized        Authentication
                                        credentials missing or
                                        invalid.
    403             Forbidden           The user does not have
                                        access to that particular
                                        resource. The response
                                        will contain an error
                                        message explaining the
                                        same.
    404             Not Found           Invalid URI or resources
                                        does not exist.
    408             Request Timeout     Server was busy in
                                        processing and timed out.
    500             Internal Server     Server is broken.
                    Error
=============== ===================== ===========================


.. _error-message:

Error Messages
===============
Error messages give more detail on the error occurred. They are of the following format::

    {
      "errors": [
        {
          "message":"Sorry, that folder does not exist",
          "code":234
        }
      ]
    }

