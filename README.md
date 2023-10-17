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
1. In the root of the project, run `docker compose up`
1. This may take a long time, be patient
1. Open `http://localhost:9000` to see the webpage

### Live Preview

If you want to view changes without taking down the Docker containers:

1. Run `npm run dev` in `/client`
1. You may need to `npm install`

If you run into an error that says `"can't find file \r\n"`, go to the `docker-entrypoint.sh` file and change the End of Line sequence from `CRLF` to `LF` (in the bottom right)

### Credentials for LOCAL login

> Role = Admin

- Username: `admin`
- Password: `password123`

### Credentials for SAML-based login

> Role = Admin

- Username: `admin@bcit.ca`
- Password: `admin`

> Role = Student

- Username: `student1@bcit.ca`
- Password: `student`

To add/edit accounts for local users see ```/simplesaml/authsources.php```
