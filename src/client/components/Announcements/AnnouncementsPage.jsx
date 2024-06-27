import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import useGetAnnouncements from '../../hooks/announcements/useGetAnnouncements';
import useCheckIfPermitted from '../../hooks/users/useCheckIfPermitted';
import AnnouncementFilters from './AnnouncementFilters';
import AnnouncementDetails from './AnnouncementDetails';

const AnnouncementsPage = () => {
    const navigate = useNavigate();
    const isAdmin = useCheckIfPermitted({ roles_to_check: ['admin'] });

    const { getAnnouncementsData, getAnnouncementsIsSuccessful, getAnnouncementsIsLoading, getAnnouncementsResponseError, getAnnouncements: getAnnouncementsFromHook } = useGetAnnouncements();
    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('newest');

    const getAnnouncements = useCallback(getAnnouncementsFromHook, []);

    useEffect(() => {
        getAnnouncements();
    }, [getAnnouncements]);

    const filteredAnnouncements = getAnnouncementsData?.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchText.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchText.toLowerCase())
    ).sort((a, b) => {
        let dateA = a.modified_at ? a.modified_at : a.created_at;
        let dateB = b.modified_at ? b.modified_at : b.created_at;

        switch (sortOption) {
            case 'oldest':
                return new Date(dateA) - new Date(dateB);
            case 'newest':
                return new Date(dateB) - new Date(dateA);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    return (
        <Box component="div"
            sx={{
                display: 'flex', flexDirection: 'column',
                gap: 2,
                padding: '1em',
                justifyContent: 'center'
            }}>

            <Typography variant="h5" component="h1" align="center" color="textPrimary" gutterBottom>
                Announcements
            </Typography>

            {isAdmin && (
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                    <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => { navigate('/createannouncement') }}>
                        Create New Announcement
                    </Button>
                </Box>
            )}

            <AnnouncementFilters
                searchText={searchText}
                setSearchText={setSearchText}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            {getAnnouncementsIsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircularProgress size={80} />
                </Box>
            ) : getAnnouncementsIsSuccessful ? (
                filteredAnnouncements.map((announcement, index) => (
                    <AnnouncementDetails key={index} announcement={announcement} isAdmin={isAdmin} />
                ))
            ) : null}
        </Box>
    );
};

export default AnnouncementsPage;