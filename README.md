# OpenLabs Scheduler WEB
_This is the WEB and it connects to the OpenLabs Scheduler API backend_

## General description of the project
OpenLabs Scheduler is a web application designed for BCIT's Nursing students and instructors. Students will be able to view the current schedule for the OpenLab as well as access surveys that will help the instructors gain insights on their student's learning.

## Required Technologies
- React
- Node/Express
- Docker

## Running the Application

With Docker:

- Ensure Docker is running on your local machine
- In the root of the project, run `docker compose up`
- This may take a long time, be patient
- Open `http://localhost:9000` to see the webpage
- If you want to view changes without taking down the Docker containers:    
  - Run npm run dev in /client
  - You may need to npm install
- If you run into an error that says `"can't find file \r\n"`, go to the `docker-entrypoint.sh` file and change the End of Line sequence from `CRLF` to `LF` (in the bottom right)
