
import MaterialTable from "material-table";
import { useState } from "react";

import ComponentVulnChart from './ComponentVulnChart'
import DetailsIcon from '@mui/icons-material/Details';

import UserReview from "./UserReview";

const ProjectDetails = (props) => {

    const components =props.project.components;
    const scanReport= props.scanResult;
    //const scanResult = props.scanResult.scanSummary;

    let componentReport=[];

    console.log( " in Project details  Scan Result "+ JSON.stringify(scanReport));

      

    const tableColumns = [
        { title: 'Component Name', field: 'componentName', color: '#FFF', filtering: true },

        { title: 'Version', field: 'version' },
        { title: 'Total CVES ', field: 'cves.cveCount' },
        { title: ' Critical ', field: 'cves.critical' },
        { title: ' High ', field: 'cves.high' },
        { title: ' Medium  ', field: 'cves.medium' },
        { title: ' Low ', field: 'cves.low' },


    ]
   // const reportData = 
    return (
        <div>
            <ComponentVulnChart scanReport={scanReport}></ComponentVulnChart>
            
            <MaterialTable columns={tableColumns} data={scanReport}
                  title ={props.project.projectName}
                options={{
                    headerStyle: {
                        borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana', backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    filtering: true,
                    sorting: true,
                    actionsColumnIndex: -1,
                    exportButton: true,
                }}
                /*
                actions={[
                    {
                        icon: DetailsIcon,
                        tooltip: "Review",
                      
                        onClick: (event, rowData) => {
                            return (<UserReview></UserReview>)
                        }
                    }
                ]}
*/
                 > </MaterialTable>
        </div>


    );

/*
    editable={{
        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setComponents(...components, newData)

                  
                    resolve();
                }, 1000);
            }),
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...components];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setComponents([...dataUpdate]);

                    resolve();
                }, 1000);
            }),
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...components];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setComponents([...dataDelete]);

                    resolve();
                }, 1000);
            })

    }} */

}

export default ProjectDetails;

