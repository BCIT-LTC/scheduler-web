import { Card, CardContent, Typography, Button, Pagination, Box } from '@mui/material';
import { useState } from 'react';
import React from 'react';

function AnnouncementCard({ title, date, description }) {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography color="secondary" gutterBottom style={{ alignSelf: 'flex-start' }}>
            {date}
          </Typography>
        </div>
        <Typography variant="body2">
          {description}
        </Typography>

        <div style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary">EDIT</Button>
          <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>DELETE</Button>
        </div>
      </CardContent>
    </Card>
  );
}


function AnnouncementList({ announcements }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {announcements.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(announcement => (
        <AnnouncementCard
          key={announcement.id}
          title={announcement.title}
          date={announcement.date}
          description={announcement.description}
        />
      ))}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(announcements.length / itemsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export default AnnouncementList;
