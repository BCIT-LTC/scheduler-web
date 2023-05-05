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
            'firstname' => 'firstadmin firstname',
            'lastname' => 'firstadmin lastname',
            'type' => 'non-student', # in reality it could be "employee" or "instructor" or any other non student fields
            'program' => 'BSN' # the exact name in the field is not know so use BSN for now
        ),
        'nextadmin@bcit.ca:admin' => array(
            'email' => 'nextadmin@bcit.ca',
            'firstname' => 'nextadmin firstname',
            'lastname' => 'nextadmin lastname',
            'type' => 'non-student', # in reality it could be "employee" or "instructor" or any other non student fields
            'program' => 'BSN' # the exact name in the field is not know so use BSN for now
        ),
        'student1@bcit.ca:student' => array(
            'email' => 'student1@bcit.ca',
            'firstname' => 'student1 firstname',
            'lastname' => 'student1 lastname',
            'type' => 'student',
            'program' => 'BSN'
        ),
        'student2@bcit.ca:student' => array(
            'email' => 'student2@bcit.ca',
            'firstname' => 'student2 firstname',
            'lastname' => 'student2 lastname',
            'type' => 'student',
            'program' => 'BSN'
        ),
        'student3@bcit.ca:student' => array(
            'email' => 'student3@bcit.ca',
            'firstname' => 'student3 firstname',
            'lastname' => 'student3 lastname',
            'type' => 'student',
            'program' => 'BSN'
        )
    ),

);