import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"

// import './Login.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Stack from '@mui/material/Stack';

import { GlobalContext } from '../context/usercontext';

//Moved fetch request to inside the Login(). This sends the username and password as json to localhost:8000/login to get authenticated
export default function RootUserlogin() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [credentialError, setCredentialError] = useState('');

    const globalcontext = useContext(GlobalContext);

    if (globalcontext.isLoggedIn) {
        return <Navigate to="/home" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username == null || password == null) {
            setCredentialError('Username or password cannot be empty');
            return;
        }
        // Submit the login form
        await fetch(`${process.env.PUBLIC_URL}/auth/loginlocal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({email: username, password: password}),
        }).then((response) => {
          if (response.status === 200) {
            // Redirect to homepage if login is successful
            window.location.href = '/';
          } else if (response.status === 429) {
            // Handle too many requests error
            setCredentialError('Too many requests');
          } else {
            // Handle incorrect username or password error
            console.log(response);
            setCredentialError('Incorrect username or password');
          }
        });
    };

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
                <Grid item >
                    <Container maxWidth="lg">
                        <Card>
                            <CardHeader title="Openlab Scheduler" />
                            <CardHeader title="Login" />
                            <CardContent>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        {credentialError !== '' &&
                                            <Alert severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                {credentialError}
                                            </Alert>
                                        }
                                        <FormControl component="fieldset" variant="standard">
                                            <Stack sx={{ width: '100%' }} spacing={1}>

                                                <OutlinedInput
                                                    id="username"
                                                    placeholder="Username"
                                                    error={credentialError !== ''}
                                                    onChange={(e) => { setUserName(e.target.value); setCredentialError(''); }}
                                                />
                                                <OutlinedInput
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    error={credentialError !== ''}
                                                    onChange={(e) => { setPassword(e.target.value); setCredentialError(''); }}
                                                />
                                                <Button variant="contained" type="submit">Log In</Button>
                                            </Stack>
                                        </FormControl>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>
            </Grid >
        </>
    );
}