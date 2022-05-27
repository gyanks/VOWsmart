import './RegisterUser.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const RegisterUser = () => {

  const RegistrationForm = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [company, setCompany] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const userIdHandler = (e) => {
      setUserId(e.target.value);
      setSubmitted(false);
    };


    const passwordHandler = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };


    const emailHandler = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };

    const mobileHandler = (e) => {
      setMobile(e.target.value);
      setSubmitted(false);
    };

    const roleHandler = (e) => {
      setRole(e.target.value);
      setSubmitted(false);
    };
    const companyHandler = (e) => {
      setCompany(e.target.value);
      setSubmitted(false);
    };

    const firstNameHandler = (e) => {
      setFirstName(e.target.value);
      setSubmitted(false);
    };

    const lastNameHandler = (e) => {
      setLastName(e.target.value);
      setSubmitted(false);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      console.log("submit handler .. ")
      const userRegistration = {
        "username": userId,
        firstName,
        lastName,
        email,
        mobile,
        "password": "password",
        role,
        company


      }

      console.log(" for registrtion" + JSON.stringify(userRegistration));

      fetch("http://localhost:4000/users/register", {

        method: "POST",
        body: JSON.stringify(userRegistration),

        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {
        console.log(response, response.json())
        if (!response.ok) {

          console.log('User Registration failed  ' + error)
          return Promise.reject(error);
        }
        return response.json()

      }).then(data => {
        console.log("user registerd successful " + data);
        navigate("/home/admin");

      })
        .catch(error => console.log("there was error in user registration " + error));

      // saveToDb(userRegistration);
    };




    const saveToDb = (user) => {

      fetch("http://localhost:4000/users/register", {

        method: "POST",


        body: JSON.stringify(user),


        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {

        if (!response.ok) {

          console.log('User Registration failed  ' + error)
          return Promise.reject(error);
        }
        return response.json()

      }).then(data => {
        console.log("user registerd successful " + data)


      })
        .catch(error => console.log("there was error in user registration " + error))
    }







    return (
      <div className="container">

        <form onSubmit={submitHandler}>
          <div className="row">
            <label className="col-10">FirstName</label>
            <input className="col-90" type="text" value={firstName} onChange={firstNameHandler}></input>
          </div>

          <div className='row'>
            <label className='col-10'>LastName</label>
            <input className="col-90" type="text" value={lastName} onChange={lastNameHandler}></input>
          </div>
          <div className="row">
            <label className="col-10">Email</label>
            <input className="col-90" type="email" value={email} onChange={emailHandler}></input>
          </div>
          <div className='row'>
            <label className="col-10">Mobile Number</label>
            <input className="col-90" type="text" value={mobile} onChange={mobileHandler}></input>
          </div>
          <div className="row">
            <label className='col-10'>Role </label>
            <input className="col-90" type="text" value={role} onChange={roleHandler}></input>
          </div>

          <div className="row">
            <label className='col-10'>Company Name </label>
            <input className="col-90" type="text" value={company} onChange={companyHandler}></input>
          </div>


          <div className="row">
            <label className="col-10">UserName</label>
            <input className="col-90" type="text" value={userId} onChange={userIdHandler}></input>
          </div>



          <button type="submit"> Submit</button>
        </form>


      </div>
    );
  }

  return (

    <div>

      <h1> Registration Form</h1>
      <RegistrationForm />
    </div>
  )

};

export default RegisterUser;