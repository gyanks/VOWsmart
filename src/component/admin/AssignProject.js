import { useState, useEffect } from "react";

import './AssignProject.css'
const AssignProject = () => {
   // const { projects, setProjects } = useState(["ECE2","BGSW","ECE","Tesla"]);

    //const { users, setUsers } = useState(["munni","rakesh","raveesh","santosh"]);

    const users = [
  {"value":"munni"},
  {"value":"Rakesh"},
  {"value":"Raveesh"},
  {"value":"Santosh"},
    ];

    const projects= [

        {"value":"ECE"},
        {"value":"ECE2"},
        {"value":"BGSW"},
        {"value":"ECE4"},

    ];

  /*  
   useEffect( () => {
       getAllProjects();
       getAllUsers();
    }, []);
*/

    const AssignHandler= () => {
       alert("Project assigned successfully");
        getAllProjects();
        getAllUsers();
    }

    const getAllProjects = () => {
        console.log("project")
        fetch("http://localhost:4002/projects").
            then(response => response.json())
            .then(projects => { return projects })
            .then(projects => {
                console.log("projects " + JSON.stringify(projects));
                let projectFromDb = projects.map(project => {

                    return { "value": project, "display": project }
                })
               // setProjects([{ "value": " ", "display": "select one project" }].concat(projectFromDb));
                console.log("projects from db " + JSON.stringify(projects))
            })
            .catch(error => console.log(' There is error while accessing data ' + error))


    };

    const getAllUsers = () => {
        console.log('users   ')
        fetch("http://localhost:4000/users")
            .then(response => response.json())
            .then(users => {
                console.log("users  " + JSON.stringify(users));
                let usersFromDb = users.map((user) => {
                    return { "value": user, "display": user }
                });

                console.log(" users from db " + JSON.stringify(usersFromDb));

               // setUsers([{ "value": " ", "display": "Select User" }].concat(usersFromDb))
            })
            .catch(error => console.log("there was error is retriving user " + error))
    };


    

    return (
        <div className="center">  
               
            <h3 style={{"textAlign":"center"}}>  Select    User : <select> {users.map((user) => <option key={user.value} value={user.value}>  {user.value}</option>
            )}

            </select> </h3>

            <h3 style={{"textAlign":"center"}}> Select  projects : <select> {projects.map((project) => <option key={project.value} value={project.value}>{project.value}</option>)}  </select>  </h3>

            <button onClick={AssignHandler}> Assign Projects </button>
        </div>


    )



};

export default AssignProject;