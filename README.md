<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

# OpenLab Scheduler Web

> This is the WEB and it connects to the OpenLabs Scheduler API backend

OpenLab Scheduler is a web application designed to help BCIT's Nursing instructors communicate the calendar of the OpenLab to students. Students are also able to view announcements about the lab and take surveys that help instructors gain insights into students' learning.

## Required Technologies

- React
- Node/Express
- Docker

## Running the Application

With Docker:

1. Ensure Docker is running on your local machine
1. In the root of the project, run `docker compose up` (include --build if it's the first time)
1. This may take a long time, be patient
1. Open `http://localhost:9000` to see the webpage
1. Changes to the code will hot reload and be reflected in the webpage or express server 


### Credentials for SAML-based login

> Role = Admin

- Username: `admin@bcit.ca`
- Password: `admin`

> Role = Instructor

- Username: `instructor@bcit.ca`
- Password: `instructor`

> Role = Student

- Username: `student@bcit.ca`
- Password: `student`

To add/edit accounts for local users see ```/simplesaml/authsources.php```

### Documentation

The code comments are collected and can be found in the `js_documentation` folder after running `docker compose up`

code comments are served as jsdocs format locally at localhost:9000/documentation
