import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import "./AddProject.css"
const AddProject = () => {

    const navigate = useNavigate();

    const [projectName, setProjectName] = useState();
    const [projectId, setProjectId] = useState();
    const [clientName, setClientName] = useState();
    const [version, setVersion] = useState();
    const [ownerId, setOwnerId] = useState();
    const [ownerName, setOwnerName] = useState();
    const [adminId, setAdminId] = useState();
    const [adminName, setAdminName] = useState();
    const [projectData, setProjectData] = useState();


    const projectNameHandler = (e) => {
        setProjectName(e.target.value);
    }

    const projectIdHandler = (e) => setProjectId(e.target.value);

    const clientNameHandler = (e) => setClientName(e.target.value);
    const versionHandler = (e) => setVersion(e.target.value);
    const ownerIdHandler = (e) => setOwnerId(e.target.value);
    const ownerNameHandler = (e) => setOwnerName(e.target.value);
    const adminIdHandler = (e) => setAdminId(e.target.value);
    const adminNameHandler = (e) => setAdminName(e.target.value);

    const generateProjectId = () => {

        const rand = Math.random() * 1000;
        return "VOW" + rand;
    }

   

    const createProjectData = () => {
        console.log("creating project Object .. ")
       // const pid= generateProjectId();
        const project = {
            "_id": projectId,
            projectName,
            version,
            clientName,
            creationDate: new Date(),
            owner: {
                "_id": ownerId,
                "name": ownerName
            },
            admin: {
                "_id": adminId,
                "name": adminName
            }



        }

        console.log("Project Object is " + JSON.stringify(project));
        setProjectData(project);

    }

    const saveProject2DB = () => {


        fetch("http://localhost:4002/projects", {

            method: "POST",
            body: JSON.stringify(projectData),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {


            return response.json()

        }).then(data => {
            console.log("Project " + projectId + "created successfully in DB ");
            navigate("/home/admin");

        })
            .catch(error => console.log("there was error in user registration " + error));

        // saveProject2DB
    };

    const submitHandler = (event) => {
        event.preventDefault();
    const data = new FormData(event.currentTarget);
        alert("inside submit")
        console.log("creating project Object .. ")
        const project = {
            "_id": projectId,
            projectName,
            version,
            clientName,
            creationDate: new Date(),
            owner: {
                "_id": ownerId,
                "name": ownerName
            },
            admin: {
                "_id": adminId,
                "name": adminName
            }



        }

        console.log("Project Object is " + JSON.stringify(project));

        // save to db 

        fetch("http://localhost:4002/projects", {

            method: "POST",
            body: JSON.stringify(project),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {


            return response.json()

        }).then(data => {
            console.log("Project " + projectId + "created successfully in DB ");
            navigate("/home/admin");

        })
            .catch(error => console.log("there was error in user registration " + error));


    }





const  AddProjectForm= () =>{


    return (



        <div className="container">

            <form onSubmit={submitHandler}>

                <div className="row">
                    <label className="col-10">Project ID</label>
                    <input className="col-90" type="text" value={projectId} onChange={projectIdHandler}></input>
                </div>
                <div className="row">
                    <label className="col-10">Project Name</label>
                    <input className="col-90" type="text" value={projectName} onChange={projectNameHandler}></input>
                </div>

                <div className='row'>
                    <label className='col-10'>Version</label>
                    <input className="col-90" type="text" value={version} onChange={versionHandler}></input>
                </div>
                <div className="row">
                    <label className="col-10">Client Name</label>
                    <input className="col-90" type="text" value={clientName} onChange={clientNameHandler}></input>
                </div>
                <div className='row'>
                    <label className="col-10">Owner Id </label>
                    <input className="col-90" type="text" value={ownerId} onChange={ownerIdHandler}></input>
                </div>
                <div className="row">
                    <label className='col-10'>Owner Name </label>
                    <input className="col-90" type="text" value={ownerName} onChange={ownerNameHandler}></input>
                </div>

                <div className="row">
                    <label className='col-10'>Admin Id  </label>
                    <input className="col-90" type="text" value={adminId} onChange={adminIdHandler}></input>
                </div>


                <div className="row">
                    <label className="col-10">Admin Name</label>
                    <input className="col-90" type="text" value={adminName} onChange={adminNameHandler}></input>
                </div>



                <button type="submit"> Submit</button>
            </form>


        </div>


    );

};


return (
<div>
<h2> Create New Project</h2>
<AddProjectForm/>

</div>


)

}

export default AddProject;
