import { useContext } from "react";
import { Navigate } from "react-router-dom"
import AnnouncementList from "../components/Announcements/AnnouncementList"

const announcementsData = [
    {
      id: 1,
      title: 'Blood pressure station offline for maintenance',
      date: 'February 4, 2023',
      description: 'Lorem Ipsum is simply dummy text...'
    },
    {
      id: 1,
      title: 'Blood pressure station offline for maintenance',
      date: 'February 4, 2023',
      description: 'Lorem Ipsum is simply dummy text...'
    },
    {
      id: 1,
      title: 'Blood pressure station offline for maintenance',
      date: 'February 4, 2023',
      description: 'Lorem Ipsum is simply dummy text...'
    },
    {
      id: 1,
      title: 'Blood pressure station offline for maintenance',
      date: 'February 4, 2023',
      description: 'Lorem Ipsum is simply dummy text...'
    },
    // ...other announcements
  ];

export default function Announcements() {

  return (
    <>
        TODO: announcements containers 
        <br></br>
        See: /src/components/Announcements/
        <br></br>
        edit the following files:
        <br></br>
        AnnouncementFilter.jsx and AnnouncementList.jsx
        <AnnouncementList announcements={announcementsData} />
    </>
  );
}