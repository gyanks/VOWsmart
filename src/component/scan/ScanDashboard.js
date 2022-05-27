import react from 'react'
import { useState, useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import DetailsIcon from '@mui/icons-material/Details';

const ScanDashboard = (props) => {

    const navigate= useNavigate();

    const [cveList, setCveList] = useState();

 //let listOfCve=[];
    const filterScanComponent = () => {
        const dbComponents = props.dbData.components.filter(comp => comp.scanComponent.componentName === props.reportComp.componentName && comp.scanComponent.version === props.reportComp.version)
        // listOfCve=dbComponents.scanCves;
        setCveList(dbComponents[0].scanCves)
        console.log("scan cve details in scan dashboard "+ JSON.stringify(dbComponents[0].scanCves))

    }


    useEffect(filterScanComponent, []);


   
    const tableColumns = [
        { title: ' NVD Vuln Id', field: 'vulnId', filtering: false },
        { title: 'Description ', field: 'description', filtering: true },
        
        { title: ' Vector String', field: 'vectorString', filtering: false },
        {
            title: ' Impact Score', field: 'impactScore', filtering: true, type: 'numeric', customFilterAndSearch: (term, rowData) => parseInt(term) <= parseInt(rowData.impactScore),
            custonSort: (impactScore) => parseInt(impactScore)
        },
        {
            title: ' CvvsScore', field: 'cvvsScore', type: 'numeric', filtering: true, customFilterAndSearch: (term, rowData) => parseInt(term) <= parseInt(rowData.cvvsScore),
            custonSort: (cvvsScore) => parseInt(cvvsScore)
        },
        { title: ' Severity', field: 'severity', filtering: true }

    ];



    return (


        <div>

            <MaterialTable
                columns={tableColumns}
                data={cveList}
                title='Detailed Report'
                options={{
                    headerStyle: {
                        borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana', backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    filtering: true,
                    sorting: true,
                    actionsColumnIndex: -1,
                    exportButton: true,
                    grouping: true,
                    groupRowSeparator: "="

                }}
                
               
            />



        </div>
    );


}

export default ScanDashboard;