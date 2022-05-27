import React from 'react'
import { useState } from 'react';

import NvdCvesData from '../util/data/nvdcve-1.1-2022.json'
import CvesScanService from './CvesScanService';
import DisplayScanResults from './DisplayScanResults';
import DisplayReportXls from './DisplayReportXls';

import  ScanDashboard from './ScanDashboard'


const ComponentCvesScan = (props) => {

    // const scan= props.scan;
   console.log('components for scan '+ JSON.stringify(props.component))

   
    const scan = {
        componentName: 'keycloak',
        version: '13.0.1' //props.component.version
    }

    /*
    const scan = {
        componentName: 'tomcat',
        version: '10.0.5' //props.component.version
    }
*/
    const [nvdCves, setNvdCves] = useState([]);
    const [impactMatrix,setImpactMatrix] = useState([{}]);
    const [cvvsMatrix,setCvvsmatrix] = useState();
    const [severityMatrix,setSeverityMatrix] = useState();


     // let scannedResults= [];
    const [scannedResults,setScannedResults] = useState([
        {
            componentName:'tomcat',
            scanedCves:[]
        }
    ]);
    //console.log(" Data from json file"+JSON.stringify(NvdCvesData))

    const fetchNvdCvesHandler = () => {

        const transforedNvdCves = NvdCvesData.CVE_Items.map(cveData => {

            return {
                // id:cveData.cve.CVE_data_meta.ID,
                vulnId: cveData.cve.CVE_data_meta.ID,
                description: cveData.cve.description.description_data[0].value,
                //references:cveData.references,
                //componentName: cveData.cve.
                //version:
                //impact":{

                cpe: cveData.configurations?.nodes[0]?.cpe_match[0]?.cpe32URI,
                impactScore: cveData.impact?.baseMetricV3?.impactScore,
                vectorString: cveData.impact?.baseMetricV3?.cvssV3?.vectorString,
                cvvsScore: cveData.impact?.baseMetricV3?.cvssV3?.baseScore,
                severity: cveData.impact?.baseMetricV3?.cvssV3?.baseSeverity

            };


        });// array map 

       // const tempScannedResults = props.components.map((component) =>{

            const matchedCvesOnComponent = transforedNvdCves.filter((cve) =>
                 scanCve(cve,scan.componentName));
                //console.log(" Matched cve components"+JSON.stringify(matchedCvesOnComponent))
               

            const filterOnVersion = matchedCvesOnComponent.filter((cve) => filterByVersion(cve) );
            
              const totalCves= filterOnVersion.length;
            
            setNvdCves(filterOnVersion);
         /*
           const impactMat=calculateImpactMatrix(filterOnVersion);
           const tempImpactMatrix= {
               "dataPoints" :impactMat,
               "total" : totalCves
           };
           console.log("Tempo Impact matrix "+tempImpactMatrix)
           setImpactMatrix(tempImpactMatrix);
*/
    }




    // This method will scan for those CVEs which has specified component 
    // and version 

    /* This method will accept CVE and verify it with scan component */

    const scanCve = (cve,componentName) => {
      
        //const  compExper ='/{scan.componentName}/ig';
        //console.log(scan.componentName);
        let comExper = new RegExp(componentName, "gi");
       // console.log('scan exper '+comExper);
        return cve.description.match(comExper);
    }



    /* This method will extract related  version of CVE from description 
      */

    const  filterByVersion =(cve) => {
           // console.log('inside version fileter '+cve.description)
            const version= cve.description.split("before")[1]?.split(' ')[1];
            console.log("component Version"+version);
            console.log(version>=scan.version);
             return version>=scan.version;
        };
    
/* This function will compute the impact matrix for filtered components 

*/
/*

       const calculateImpactMatrix  = ((componentlist) => {
               const highImpact=componentlist.filter(component => component.impactScore>5);
               const mediumImpact=componentlist.filter(component => component.impactScore<5 && component.impactScore>3.5);
               const lowImpact=componentlist.filter(component => component.impactScore<3.5);

                 const impactMatrix= [
                     {
                         "label":"HighImpact",
                        "value" : highImpact.length,
                       

                     },
                     {
                        "label":"MediumImpact",
                       "value" : mediumImpact.length

                    },
                    {
                        "label":"LowImpact",
                       "value" : lowImpact.length

                    }
              
                            

                    ];
                   return impactMatrix;

       }) ;

*/
    return (

        <div>
            
            <button onClick={fetchNvdCvesHandler}> Scan NVD for SBOM </button>
            
            <ScanDashboard cveList={nvdCves} component={scan}></ScanDashboard>
           
        </div>
        //<DisplayScanResults matchedCves={nvdCves}></DisplayScanResults>
        // {console.log("found Cves "+ nvdCves[0].vulnId)}
    )

};

export default ComponentCvesScan;