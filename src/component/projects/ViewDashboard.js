import react from 'react'
import { Routes, Route } from 'react-router-dom'
import Display from '../scan/Display';
import dummyProjects from './data/DummyProject.json'
import MaterialTable from 'material-table';
import { MTableAction } from 'material-table';
import { Button } from '@mui/material';
import { useState } from 'react';

import AddIcon from "@material-ui/icons/AddAlarm";
import IconButton from "@material-ui/core/IconButton";

import ProjectDetails from './ProjectDetails';

const ViewDashboard = () => {

    const username=localStorage.getItem("username").toUpperCase()
   
    const projectsByUser=dummyProjects.data.filter(project => project.owner.toLowerCase()==username.toLowerCase());
    
    const tableRef = react.createRef();
    const addActionRef = react.useRef();
    const [projects, setProjects] = useState(projectsByUser);
   
   //setProjects(dummyProjects.data);



    /*
    fetch("http://localhost:4002/projects").then(response => response.json)
        .then(projects => setProjects(projects)).catch(error => console.log(' There is error while accessing data '+ error));

        
            
          console.log("project fetched from db "+ JSON.stringify(Projects))  ;
            /*
            projects.map((project) => {

            const projectDetails= {
                       projectId:project[_id],
                       projectName:project.projectName,
                       version:project.version,
                       owner:project.owner,
                       componentsC

            }

        }

        ))
        */



        const updateProjectComponents= (projId,componentList) => {
            /*
            const project= Projects.filter(proj => proj.projectId==projId);
            project.components=componentList;
            */
            const index=projects.indexOf(projId);
            const updatedProjects= projects.map((project) => {
                 if(project.projectId==projId)
                     project.components=componentList;
            })
            projects[index].components=componentList;

            
        }

    const tableColumns=[

        { title: 'Project Id', field: 'projectId' , color:'#FFF',
            filtering:false
         },
        { title: 'Project Name', field: 'projectName',headerStyle: {
            backgroundColor: "green"
         } },
        { title: 'Version', field: 'version' },
        { title: 'Owner', field: 'owner' },
        
        { title: '# of Components', field: 'componentsCount', type: 'numeric',
        render: rowData => rowData.components.length,
    
        customFilterAndSearch: (term, rowData) => parseInt(term )<= parseInt(rowData.componentsCount),
        custonSort:(count ) => parseInt(count)
        },
        /*
        {
            title: "View Details ",
            field: "internal_action",
            editable: false,
            render: (rowData) =>
                rowData && (
                <IconButton
                    color="secondary"
                    onClick={() => alert('Clicked ')}
                >
                    <AddIcon />
                </IconButton>
                )
            }
       */
       ];


    return (
        <div>
            <h2> Welcome {username} </h2>
            <MaterialTable
                columns={tableColumns}
            
                data={projects}
                title="Project Dashboard "
                options={{
                    headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' ,  backgroundColor: '#01579b',
                    color: '#FFF'},
                    filtering: true,
                    sorting: true,
                    actionsColumnIndex:-1,
                    exportButton:true,
                    grouping:true,
                    groupRowSeparator: "==="
                    
                }}
               detailPanel= { rowData => {
                      return (
                        <div>
                         
                        <ProjectDetails project={rowData}></ProjectDetails>
                         
                        </div>
                      )
                    }
                  }
                components={{
                    Action: (props) => {
                        //If isn't the add action
                        if (
                        typeof props.action === typeof Function ||
                        props.action.tooltip !== "Add"
                        ) {
                        return <MTableAction {...props} />;
                        } else {
                        return <div ref={addActionRef} onClick={props.action.onClick} />;
                        }
                    }
                    }}
                    actions={[
                    {
                        icon: "save",
                        tooltip: "View Details ",
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                    ]}

                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setProjects(...projects, newData)

                              
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...projects];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setProjects([...dataUpdate]);

                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...projects];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setProjects([...dataDelete]);

                                resolve();
                            }, 1000);
                        })

                }}
            />


        </div>
    )


};

export default ViewDashboard;
