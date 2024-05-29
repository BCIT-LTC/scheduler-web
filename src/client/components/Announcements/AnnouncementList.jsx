import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import React from "react";
import Dialog from "@mui/material/Dialog";
import EditAnnouncementComponent from "./EditAnnouncement";
import dayjs from "dayjs";
import useCheckIfPermitted from "../../hooks/users/useCheckIfPermitted";

/**
 * Announcement card component
 *
 * @param id
 * @param title
 * @param created_at
 * @param last_modified
 * @param description
 * @param onDelete passed from AnnouncementList
 * @param onEdit passed from AnnouncementList
 * @returns {Element}
 * @constructor
 */
function AnnouncementCard({
  id,
  title,
  created_at,
  last_modified,
  description,
  onDelete,
  onEdit,
}) {
  const formattedDate = dayjs(created_at).format("YYYY/MM/DD");
  const formattedLastModified = last_modified
    ? dayjs(last_modified).format("YYYY/MM/DD")
    : formattedDate;
  const isAdminOrInstructor = useCheckIfPermitted({
    roles_to_check: ["admin", "instructor"],
  });
  return (
    <Card
      style={{
        marginBottom: "24px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <CardContent
        style={{ padding: "24px", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography color="secondary">{formattedDate}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {formattedLastModified && (
          <Typography
            variant="caption"
            style={{ alignSelf: "flex-end", marginBottom: "8px" }}
          >
            <span style={{ color: "gray" }}><b>Last Updated: </b>{formattedLastModified}</span>
          </Typography>
        )}
        </div>
        <Typography variant="body2" style={{ marginTop: "24px", marginBottom: "16px" }}>
          {description}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          {isAdminOrInstructor && (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onEdit(id)}
              >
                EDIT
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "8px" }}
                onClick={() => onDelete(id)}
              >
                DELETE
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Announcement list component
 *
 * @param announcements
 * @param onDelete passed from Announcements container
 * @param refetchAnnouncements
 * @param onSnackbarOpen
 * @returns {Element}
 * @constructor
 */
function AnnouncementList({
  announcements,
  onDelete,
  refetchAnnouncements,
  onSnackbarOpen,
}) {
  const [page, setPage] = useState(1);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const itemsPerPage = 10;
  const handleChange = (event, value) => {
    setPage(value);
  };
  // Delete announcement
  const handleDelete = (id) => {
    onDelete(
      id,
      () => {
        onSnackbarOpen("Announcement deleted successfully!", "success");
        refetchAnnouncements();
      },
      (error) => {
        console.log("Announcement not deleted" + error);
        onSnackbarOpen("Announcement not deleted", "error");
      }
    );
  };
  // Edit announcement
  const handleEdit = (id) => {
    const announcementToEdit = announcements.find(
      (announcement) => announcement.announcement_id === id
    );
    setEditAnnouncement(announcementToEdit);
    setIsEditDialogOpen(true);
  };
  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setEditAnnouncement(null);
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        maxHeight: "100%",
        margin: "auto",
        padding: "24px",
      }}
    >
      {itemsPerPage > 0 && announcements.length > 0 ? (
        <>
          {announcements
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((announcement, index) => (
              <AnnouncementCard
                key={announcement.announcement_id || index}
                id={announcement.announcement_id}
                title={announcement.title}
                description={announcement.description}
                created_at={announcement.created_at}
                last_modified={
                  announcement?.last_modified ?? announcement.created_at
                }
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          {isEditDialogOpen && editAnnouncement && (
            <Dialog open={isEditDialogOpen} onClose={handleEditClose}>
              <EditAnnouncementComponent
                onSnackbarOpen={onSnackbarOpen}
                id={editAnnouncement.announcement_id}
                existingTitle={editAnnouncement.title}
                existingDescription={editAnnouncement.description}
                existingDate={editAnnouncement.created_at}
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
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              padding: "24px",
            }}
          />                  
          <Typography variant="caption" sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              padding: "24px",
          }}>
            {`Displaying ${announcements.length - 1} of ${announcements.length - 1} announcements`}
          </Typography>
        </>
      ) : (
        <Typography variant="h6" align="center">
          No announcements available.
        </Typography>
      )}
    </Box>
  );
}

export default AnnouncementList;
