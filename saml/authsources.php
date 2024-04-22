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
            'first_name' => 'admin_firstname',
            'last_name' => 'admin_lastname',
            'role' => 'employee', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        ),
        'instructor@bcit.ca:instructor' => array(
            'email' => 'instructor@bcit.ca',
            'first_name' => 'instructor_firstname',
            'last_name' => 'instructor_lastname',
            'role' => 'instructor', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        ),
        'student@bcit.ca:student' => array(
            'email' => 'student@bcit.ca',
            'first_name' => 'student_firstname',
            'last_name' => 'student_lastname',
            'role' => 'student', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        )
    ),
);