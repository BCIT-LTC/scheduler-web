<?php

$config = array(
    'admin' => array(
        'core:AdminPassword',
    ),
    //admin creds for the idp server itself => usn:admin /	pw:secret

    'example-userpass' => array(
        'exampleauth:UserPass',
        'courseproduction@bcit.ca:admin' => array(
            'email' => 'courseproduction@bcit.ca',
            'first_name' => 'admin_firstname',
            'last_name' => 'admin_lastname',
            'role' => 'employee', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        ),
        'employee_one@bcit.ca:instructor' => array(
            'email' => 'employee_one@bcit.ca',
            'first_name' => 'instructor_firstname',
            'last_name' => 'instructor_lastname',
            'role' => 'instructor', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        ),
        'nursing_student@bcit.ca:student' => array(
            'email' => 'nursing_student@bcit.ca',
            'first_name' => 'student_firstname',
            'last_name' => 'student_lastname',
            'role' => 'student', 
            'department' => 'School of Health Sciences',
            'display_name' => 'admin_displayname'
        )
    ),
);