import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { styled } from '@mui/system';
import { Button } from '@mui/material';


// GridBox for displaying the location details
const GridBox = styled(Box)({
    maxheight: "1.5em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0",
    color: "#666666",
});

// Display the cards of the selected location
function LocationDetails({row, handleClose}) {
    console.log(`Selected location ${row.location}`)
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ position: "absolute", top: "0", left: "0", height: "100vh", width: "100%" }}
        >
            <Card sx={{ zIndex: "100", width: "70%", maxWidth: "600px", p: 2, boxShadow: 1, borderRadius: 2, position: "absolute", border: "3px solid rgb(25, 118, 210)" }}>
                <DisabledByDefaultIcon onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "grey", height: "30px", width: "30px" }} />
                <Box display="flex" justifyContent="center">
                    <h2>{row.location}</h2>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" columnGap={1} sx={{ border: "black dashed 1px", padding: "20px" }}>
                    <GridBox gridColumn="span 4">
                        <p>Date</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{row.id}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Created At</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{row.created_at}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Created By</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{row.created_by}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Last Modified</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{row.last_modified}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Modified By</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{row.modified_by}</p>
                    </GridBox>
                </Box>  
                <Box>
                    <Button
                    variant="outlined"
                    style={{ color: 'rgb(254, 197, 1)' }}
                    size="normal"
                    >
                        Edit
                    </Button>     
                    <Button
                    variant="outlined"
                    style={{ color: 'rgb(213, 38, 38)' }}
                    size="normal"
                    >
                        Delete
                    </Button>              
                </Box>  
            </Card>
        </Box>

    );
};

export default LocationDetails;
