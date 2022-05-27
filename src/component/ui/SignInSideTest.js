import * as React from 'react';
import { useNavigate } from 'react-router-dom';



import './SignInSide.css'



export default function SignInSide(props) {

  const navigate= useNavigate();


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
        localStorage.setItem("logged_in_status", true);
      localStorage.setItem("user", data.username)
      alert(localStorage.getItem("logged_in_status"))
      navigate("/home/project/dashboard");


    })
      .catch(error => console.log("there was error in fetching authntication "))
  }

  return (

       < div className='card-sign-in'>
          
          <div className='login-header'> 
              <h1> Sign in to your account </h1>

             </div>

             
            
            <form noValidate onSubmit={handleSubmit} >
             
         
              <div className='form-group'>
              <label sx={{align:'left'}}> Username or email </label>
              <input type="text" className='form-control' required id="username" name="username"></input>
               
              
              </div>

              <div className='form-group'>  
              <label > Password </label>   
              <input type="text" className='form-control'  required  name="password"  type="password"  id="password"></input>
                                    

               </div >
            

              <div   id="forget-pass">

                     <a href=''> Forget Password </a>
              </div>
              
              <div  className='form-group'>
                     
                     <input type="submit" value="log In" name="LogIn" className='login-button'></input>



              </div>
              
          </form>
            

          </div>

      


  );
}