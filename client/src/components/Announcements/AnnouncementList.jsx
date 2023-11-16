import { Card, CardContent, Typography, Button, Pagination, Box } from '@mui/material';
import {useContext, useState} from 'react';
import React from 'react';
import Dialog from "@mui/material/Dialog";
import EditAnnouncementComponent from "./EditAnnouncement";
import dayjs from "dayjs";
import {GlobalContext} from "../../context/usercontext";
/**
 * Announcement card component
 * @param id
 * @param title
 * @param date
 * @param description
 * @param onDelete
 * @param onEdit
 * @returns {Element}
 * @constructor
 */
function AnnouncementCard({ id, title, date, description, onDelete, onEdit }) {
    const { user } = useContext(GlobalContext);
    const role = user.role;
    const formattedDate = dayjs(date).format('YYYY/MM/DD');
    return (
    <Card style={{ marginBottom: '24px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <Typography color="secondary">
            {formattedDate}
          </Typography>
        </div>
        <Typography variant="body2" style={{ marginBottom: '16px' }}>
          {description}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {role && (role === "admin" || role === "instructor") && (
            <Button variant="outlined" color="primary" onClick={() => onEdit(id)}>EDIT</Button>
            )}
            {role && (role === "admin" || role === "instructor") && (
                <Button variant="outlined" color="secondary" style={{ marginLeft: '8px' }} onClick={() => onDelete(id)}>DELETE</Button>
                )}
        </div>
      </CardContent>
    </Card>
  );
}


function AnnouncementList({ announcements, onDelete, refetchAnnouncements, onSnackbarOpen }) {
  const [page, setPage] = useState(1);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
  const handleEdit = (id) => {
      const announcementToEdit = announcements.find(announcement => announcement.announcements_id === id);
      setEditAnnouncement(announcementToEdit);
      setIsEditDialogOpen(true);
  }
    const handleEditClose = () => {
        setIsEditDialogOpen(false);
        setEditAnnouncement(null);
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
            onEdit={handleEdit}
        />
      ))}
        {/*maybe good maybe shit*/}
        {isEditDialogOpen && editAnnouncement && (
            <Dialog open={isEditDialogOpen} onClose={handleEditClose}>
                <EditAnnouncementComponent
                    onSnackbarOpen={onSnackbarOpen}
                    id={editAnnouncement.announcements_id}
                    existingTitle={editAnnouncement.title}
                    existingDescription={editAnnouncement.description}
                    existingDate={editAnnouncement.date}
                    handleClose={handleEditClose}
                    onAnnouncementEdited={() => {
                        handleEditClose();
                        refetchAnnouncements();
                    }}
                />
            </Dialog>
        )}
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