import { Card, CardContent, Typography, Button, Pagination, Box } from '@mui/material';
import { useState } from 'react';
import React from 'react';

/**
 * Announcement card component
 * @param id
 * @param title
 * @param date
 * @param description
 * @param onDelete
 * @returns {Element}
 * @constructor
 */
function AnnouncementCard({ id, title, date, description, onDelete }) {
  return (
    <Card style={{ marginBottom: '24px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <Typography color="secondary">
            {date}
          </Typography>
        </div>
        <Typography variant="body2" style={{ marginBottom: '16px' }}>
          {description}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary">EDIT</Button>
          <Button variant="outlined" color="secondary" style={{ marginLeft: '8px' }} onClick={() => onDelete(id)}>DELETE</Button>
        </div>
      </CardContent>
    </Card>
  );
}


function AnnouncementList({ announcements, onDelete, refetchAnnouncements }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleDelete = (id) => {
    onDelete(id, () => {
        alert("Announcement deleted successfully!")
        refetchAnnouncements();
    }, (error) => {
        console.log("Announcement not deleted" + error)
    });

  }
  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '24px' }}>
      {announcements.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((announcement, index) => (
        <AnnouncementCard
          key={announcement.announcements_id || index}
          id={announcement.announcements_id}
          title={announcement.title}
          date={announcement.date}
          description={announcement.description}
          onDelete={handleDelete}
        />
      ))}
      <Pagination
        count={Math.ceil(announcements.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        sx={{ display: 'flex', justifyContent: 'center', mt: 4, padding: '24px' }}
      />
    </Box>
  );
}

export default AnnouncementList;