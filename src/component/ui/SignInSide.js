import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import ResponsiveAppBar from './ResponsiveAppBar';
import ComImage from './image/mascot-lady.svg'
import SecurityImage from './image/AdobeStock.jpeg'
import LogoImage from './image/bottom.jpg'
import { Label } from '@mui/icons-material';

import './SignInSide.css'

function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.bosch-softwaretechnologies.com/">
        BGSW
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide(props) {

  const navigate = useNavigate();

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginUser = {
      "username": data.get('username'),
      "password": data.get("password")
    }
    console.log({
      email: data.get('username'),
      password: data.get('password'),
    });

    fetch("http://localhost:4000/users/authenticate", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        "username": data.get('username'),
        "password": data.get('password')
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        console.log('User not authenticated ' + error)
        return Promise.reject(error);
      }
      return response.json()

    }).then(data => {
      console.log("user login successful  token is " + data.token)
      if (data.token !== null)
        localStorage.setItem("logged_in_status", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(data));
      //alert(localStorage.getItem("logged_in_status"))
      if(data.role ==='user')
      navigate("/home/project/dashboard");
      if(data.role === 'admin')
  navigate("/home/admin");

    })
      .catch(error => console.log("there was error in fetching authntication "))
  }

  return (



    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={true}
          md={9}
          sx={{
            backgroundImage: `url(${SecurityImage})`,
            backgroundRepeat: 'no-repeat',

            backgroundSize: 'cover',
            backgroundPosition: 'right bottom',



          }}
        />
        <Grid item sm={true} md={true} component={Paper} elevation={7} square>

          < div className='card-sign-in'>


            <header className='login-header'>
              <h1> Sign in to your account </h1>

            </header>



            <form noValidate onSubmit={handleSubmit} >


              <div className='form-group'>
                <label > Username or email </label>
                <TextField className='form-control'
                  margin="normal"
                  required
                  fullWidth
                  id="username"

                  name="username"
                  autoComplete="username"
                  autoFocus

                />
              </div>

              <div className='form-group'>
                <label > Password </label>
                <TextField className='form-control'
                  margin="normal"
                  required
                  fullWidth
                  name="password"

                  type="password"
                  id="password"
                  autoComplete="current-password"

                />

              </div >


              <div className='forget-pass'>

                <a href=''> Forget Password </a>
              </div>

              <div className=' login-button form-group'>

                <input type="submit" value="log In" name="LogIn" className='btn btn-primary btn-block '></input>



              </div>

            </form>


          </div>

          <div>
            <img src="/home/rak/project/cve-scan-demo/src/component/ui/image/bottom.jpg" height={300} width={300}></img>

          </div>



        </Grid>
        <Grid className='flex-container banner-text'>

          <div className='flex-item1'></div>
          <div className='flex-item2 main-text'> Say No to  <span className='flex-item2 main-text font-red' > Vulnerability </span>   </div>
          <div className='main-text2'> Vulnerability free Mobility </div>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5, backgroundColor: 'white', align: 'left' }} />
    </ThemeProvider>


  );
}