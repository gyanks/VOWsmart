
import {useState} from 'react';
import ScanReport from './ScanReport';

import NvdCvesData from '../util/data/nvdcve-1.1-2021.json'


const ScanSbomComponents = (props) => {
  //const [scanResults,setScanResults] = useState();
 // const [ nvdCves,setNvdCves] = useState();

  
  
    
         console.log(" list of comp inside Scan Sbom "+JSON.stringify(props.components));
         // setNvdCves( getNvdCves());
         const nvdCves= getNvdCves();

         // console.log(JSON.stringify(nvdCves));
          const results= props.components.map((component) => {

            const matchedCvesOnComponent =nvdCves.filter((cve) =>
                  scanCve(cve,component.componentName));
     //console.log(" Matched cve components"+JSON.stringify(matchedCvesOnComponent))
    

             const filterOnVersion = matchedCvesOnComponent.filter((cve) => filterByVersion(cve, component.version) );
            
            const cveCount=filterOnVersion.length;
            
            return  {...component,cveCount};
           

         });

            console.log(" Scan Result "+JSON.stringify(results));
         // setScanResults(results);



 return (<div>
           <ScanReport results={results}></ScanReport>
        </div>);

};//  Handler method closed    
//


//const [nvdCves, setNvdCves] = useState();
   // const [scanResult,setScanResult] =  useState();
/*
const scanHandler= (components) => {
  
                     
                   
               const result= components.map((component) => {

                        return  countComponentCve(component);
                       

                     });
                     return (result);
        //setScanResults(result);
    

} ; 
*/
const getNvdCves = () => {
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

    return (transforedNvdCves);
};





/*

const  countComponentCve = (component,nvdCves) => {

                  const matchedCvesOnComponent =nvdCves.filter((cve) =>
                       scanCve(cve,component.componentName));
                //console.log(" Matched cve components"+JSON.stringify(matchedCvesOnComponent))
               

            const filterOnVersion = matchedCvesOnComponent.filter((cve) => filterByVersion(cve, component.componentVersion) );
            
              const totalCves= filterOnVersion.length;

              return {...component,totalCves};

}
*/

const scanCve = (cve,componentName) => {
      
    //const  compExper ='/{scan.componentName}/ig';
    //console.log(scan.componentName);
    let comExper = new RegExp(componentName, "gi");
   // console.log('scan exper '+comExper);
    return cve.description.match(comExper);
}



/* This method will extract related  version of CVE from description 
  */

const  filterByVersion =(cve,componentVersion) => {
       // console.log('inside version fileter '+cve.description)
        const version= cve.description.split("before")[1]?.split(' ')[1];
        //console.log("component Version"+version);
        //console.log(version>=scan.version);
         return version>=componentVersion;
    };



export default ScanSbomComponents;

