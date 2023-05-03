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
            'firstname' => 'Testadmin firstname',
            'lastname' => 'Testadmin lastname',
            'role' => 'admin',
        ),
        'student@bcit.ca:student' => array(
            'email' => 'student@bcit.ca',
            'firstname' => 'Teststudent firstname',
            'lastname' => 'Teststudent lastname',
            'role' => 'student',
        )
    ),

);