import { Card, CardContent, Typography, Button, Pagination, Box, Skeleton } from '@mui/material';
import { useState } from 'react';
import React from 'react';

function AnnouncementCard({ title, date, description }) {
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
          <Button variant="outlined" color="secondary" style={{ marginLeft: '8px' }}>DELETE</Button>
        </div>
      </CardContent>
    </Card>
  );
}


function SkeletonAnnouncementCard() {
  return (
    <Card style={{ marginBottom: '24px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Skeleton variant="text" width="70%" height={32} />
          <Typography color="secondary">
            Date (mmmm d, yyyy)
          </Typography>
        </Box>
        <Skeleton variant="text" width="70%" height={20} style={{ marginBottom: '24px' }} />

        <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: '4px' }} />
        <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: '4px' }} />
        <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: '4px' }} />

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
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '24px' }}>
      {page === 1 && <SkeletonAnnouncementCard />}
      {announcements.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((announcement, index) => (
        <AnnouncementCard
          key={announcement.announcement_id || index}
          title={announcement.title}
          date={announcement.date}
          description={announcement.description}
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