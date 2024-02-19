import { useContext } from "react";
import { Navigate } from "react-router-dom"

// import './Login.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { GlobalContext } from '../context/usercontext';

//Moved fetch request to inside the Login(). This sends the username and password as json to localhost:8000/login to get authenticated
export default function Login() {

  const globalcontext = useContext(GlobalContext);

  if (globalcontext.user.is_logged_in) {
    return <Navigate to="/home" />;
  }
  
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <form className="form" action="/auth/login" method="post">
            <Button variant="contained" type="submit">Log in</Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}