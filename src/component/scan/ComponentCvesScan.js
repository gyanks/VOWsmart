import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import MaterialTable from 'material-table';
import DetailsIcon from '@mui/icons-material/Details';

import CvesScanService from './CvesScanService';
import DisplayScanResults from './DisplayScanResults';
import DisplayReportXls from './DisplayReportXls';
import ScanService from './service/ScanService'
import ScanDbService from './service/ScanDbService'
import ScanDashboard from './ScanDashboard'
import { padding } from '@mui/system';


const ComponentCvesScan = (props) => {

    // const scan= props.scan;
    const [dbScanData, setDbScanData] = useState([]);
     const [scanResult,setScanResult] = useState([])
     const [scanReport,setScanReport] = useState([])

     const navigate= useNavigate();


    const loadFromApi = () => {
        fetch("http://localhost:4004/scan").
            then(response => response.json()).
            then(result => setDbScanData(result))
            .catch(error => " There was error while featching Scan data from server" + error)

    }

    useEffect(loadFromApi, []);

    const testDelta = () => {

        const scanId = ScanService.generateScanId()
        const username = localStorage.getItem("username");
        const projectName = localStorage.getItem("scanProject");

        const components = props.components;

        console.log(" components in current scan "+ JSON.stringify(components))

        console.log(" Scan data from db " + JSON.stringify(dbScanData));



        const scan4Proj = ScanDbService.isProjectScaned(dbScanData, projectName);

        if (!scan4Proj)
            console.log(" No scan record found for project " + projectName);
        else {
              const allScanedComponents  =ScanDbService.fetchScanComponents4Project(dbScanData,projectName)
            const deltaComponents = ScanDbService.findDeltaComponents(allScanedComponents, components);
            console.log(" Deta components " + JSON.stringify(deltaComponents))


        }


    }// close of function testDelta


 const scanId=ScanService.generateScanId();
 const userName=localStorage.getItem("username")
 const projectName=localStorage.getItem("scanProject")
  
const title = "Scan Id :"+scanId + "  Project Name :" + projectName ; 
/* function for Scannning component and saving to DB */


    const scanAndSaveHandler= () =>{

     const scanResults4AllComponents =ScanService.cveScan4Components(props.components);
  
     
      const projectScan = {
          _id: scanId,
          scanByUser: userName,
          scanDate: new Date(),
          projectName: projectName,
          components: scanResults4AllComponents
      }
    setScanResult(projectScan)
  
  console.log(" final scan result "+ JSON.stringify(projectScan))
      
  
   ScanDbService.saveScanResult2Db(projectScan);

   printSummaryReport();
     
    }// end of method scanAndSaveHandler 


    // logic for display Material Table 

    const printSummaryReport = () => {
    console.log(" scan result components "+ JSON.stringify(scanResult.components))

    const scanReport = scanResult.components.map((comp) => {

              return {

                  componentName:comp.scanComponent.componentName,
                  version:comp.scanComponent.version,
                 
                  cveCount:comp.scanCves.length,
                 highSeverity : comp.scanCves.filter((cve) => cve.severity==='HIGH').length
              }

    });

    setScanReport(scanReport);

}
    const tableColumns = [
        { title: ' Component  Name', field : 'componentName' ,filtering:false},
        { title: 'Version ', field : 'version' ,filtering:false},
        { title: 'CVE Count', field : 'cveCount' ,filtering:true},
        {title : ' High Severity', field :'highSeverity', filtering: true , backgroundColor:'red'}
      ];



      const projectDashboardHandler =() => {

                   navigate("/home/project/dashboard");
      }
    
    return (

        <div>
              <div style={{textAlign:"center"}}>  
            
            <button onClick={scanAndSaveHandler} style={{backgroundColor:"blueviolet"}}> Scan and Save </button>
            <button onClick ={projectDashboardHandler} style={{backgroundColor:"blueviolet"}} > View dashboard</button>
            </div>
            <MaterialTable
                columns={tableColumns}
                  data={scanReport}
                title= {title}
                options={{
                    headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' ,  backgroundColor: '#01579b',
                    color: '#FFF'},
                    filtering: true,
                    sorting: true,
                    actionsColumnIndex:-1,
                    exportButton:true}}

                    detailPanel={rowData => {
                        return (
                            <div>
    
                                <ScanDashboard  reportComp= {rowData} dbData={scanResult}></ScanDashboard>
    
                            </div>
                        )
                    }}

                    actions={[
                        {
                            icon: DetailsIcon,
                            tooltip: "Detailed View  ",
                            onClick: (event, rowData) => {
                               const cveList= scanResult.components.filter(component => component.scanComponent.componentName===rowData.componentName && component.scanComponent.version===rowData.version)
                                localStorage.setItem("cveList", cveList);
                                navigate("/home/project/scan/results");
                            }
                        }
                    ]}
                   
                   
                >

         </MaterialTable>


        </div>
/* 
                    } */


        /*<DisplayScanResults matchedCves={nvdCves}></DisplayScanResults>
        // {console.log("found Cves "+ nvdCves[0].vulnId)}

         <button onClick={fetchNvdCvesHandler}> Scan NVD for SBOM </button>

            <ScanDashboard cveList={nvdCves} component={scan}></ScanDashboard> */


    )

};

export default ComponentCvesScan;