<?php

$config = array(
    'admin' => array(
        'core:AdminPassword',
    ),
    //admin creds for the idp server itself => usn:admin /	pw:secret

    'example-userpass' => array(
        'exampleauth:UserPass',
        'admin@bcit.ca:admin' => array(
            'email' => 'admin@bcit.ca',
            'firstname' => 'admin_firstname',
            'lastname' => 'admin_lastname',
            'type' => 'non-student', # in reality it could be "employee" or "instructor" or any other non student fields
            'program' => 'BSN' # the exact name in the field is not know so use BSN for now
        ),
        'instructor@bcit.ca:instructor' => array(
            'email' => 'instructor@bcit.ca',
            'firstname' => 'instructor_firstname',
            'lastname' => 'instructor_lastname',
            'type' => 'non-student', # in reality it could be "employee" or "instructor" or any other non student fields
            'program' => 'BSN' # the exact name in the field is not know so use BSN for now
        ),
        'student@bcit.ca:student' => array(
            'email' => 'student@bcit.ca',
            'firstname' => 'student_firstname',
            'lastname' => 'student_lastname',
            'type' => 'student',
            'program' => 'BSN'
        )
    ),

);