
import React from 'react'
import Select from 'react-select';
import { useState } from "react";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import * as XLSX from "xlsx";

import SbomComponents from './SbomComponents';
import ComponentCvesScan from './scan/ComponentCvesScan';
import ComponentDbService from './db/DbService';
import ScanSbomComponents from './scan/ScanSbomComponents';

import './ReadXlsSbom.css'


/* This method will read SBOM from excel sheet and retrieve each components 

*/
const ReadXlsSbom = (props ) => {
    const [scanComponents, setScanComponents] = useState([]);

    const params=useParams();
    //const {project} =params;
    
    const onChange = (e) => {
       // console.log("Inside On change ")
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            var json = XLSX.utils.sheet_to_json(ws);
            console.log(JSON.stringify(json))


            const scanComponents = json.map((component) => {
                return {

                    Id: component.Sno,
                    componentName: component.ComponentName,
                    version: component.ComponentVersion
                }
            });
           // console.log(JSON.stringify(scanComponents));
            setScanComponents(scanComponents);

        };
        reader.readAsBinaryString(file);


    };  // close of onChange method 


    // This method will store all components to DB for smart search 


   /*const projects=useContext(ProjectContext);

   const projects=  [... localStorage.getItem("projectsName")];

    const options= projects.map((project) => {
              return {
                      value:project.projectName,
                      label:project.projectName

              }

    });

    */
   const scanproject=localStorage.getItem("scanProject");


     
    return (
        <div>
            <div class="form-box">
          
           
            <p class="main-text">  Project for Scan : {scanproject}  </p> 
         
           

            <p style={{textAlign: "center"}}>please upload SBOM in excel format 
            <input  style={{padding:"15px"}}type="file" accept=".xls,.xlsx" onChange={onChange} />
            </p>
            </div>
            
            <ComponentCvesScan components={scanComponents}></ComponentCvesScan>
           
          

            

        </div>

        // <SbomComponents components={scanComponents}/>
        //<button type="submit" onClick={component2DbHandler}> Save to DB  </button>
        //  <ComponentCvesScan components={scanComponents}></ComponentCvesScan>
        //  <ScanSbomComponents components={scanComponents}></ScanSbomComponents> 
    );
}




export default ReadXlsSbom;