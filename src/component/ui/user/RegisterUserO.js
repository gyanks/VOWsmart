import React from "react";

import { MenuItem, Stack } from "@mui/material";
import { Form } from "react-bootstrap";
import { Typography, Box , TextField} from "@mui/material";

import './RegisterUser.css'
import { blue } from "@material-ui/core/colors";
import { textAlign } from "@mui/system";
const RegisterUser =() => {



    const RegistrationForm = () => {
          return(
        <Box>
              <Box color='blue' sx={ {textAlign:'center'}}> 
              <Typography varient ="h1" > User  Registation Form </Typography>
              </Box>
              


               <Form>
                   <Stack direction="column" alignItems={"center"}>
                   <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2"> User Id </Typography>
                   <TextField
                        label='User Id '
                        required
                        helperText='Enter User Id '/>

                    </Stack>    
                        

                    <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2"> First Name </Typography>
                   <TextField
                        label='First Name '
                        required
                        helperText='Enter First Name'/>

                    </Stack>    



                <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2">Last Name </Typography>
                   <TextField
                        label='Last Name '
                        required
                        helperText='Enter Last Name '/>

                    </Stack>    

                    <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2">Mobile Number  </Typography>
                   <TextField
                        label='Mobile No'
                        required type="text" pattern="[987][0-9]{9}"
                        helperText='Enter 10 digit mobile Number  '/>

                    </Stack>    



                    <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2">Email </Typography>
                   <TextField
                        label='Email '
                        required type="email"
                        helperText='' />

                    </Stack>    

                    <Stack direction="row" spacing ={5} alignItems="center">
                   <Typography variant="subtitle2">Company Name  </Typography>
                   <TextField
                        label='company '
                         type="text"
                        helperText='' />

                    </Stack>    


                    <Stack direction="row" spacing ={5} alignItems="center">
                     <Box  width='250px'>  
                   <Typography variant="subtitle2">Role </Typography>
                   <TextField select 
                        label='Role' fullWidth>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="guest">Guest</MenuItem>

                        </TextField>
                       
                        </Box>   

                    </Stack>    
                                       
                    
                    </Stack>  
                        
                   

                </Form>
                </Box>
          

         


          )};


    return(
          <div> 


              <RegistrationForm/> 


        </div> 
    );


}

export default RegisterUser;

