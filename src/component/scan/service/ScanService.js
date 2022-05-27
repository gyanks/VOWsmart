import NvdCvesData from '../../util/data/nvdcve-1.1-2022.json'



    /* This method will genrate unique SaanId for scan */


    export const generateScanId = () => {

        const userName = localStorage.getItem("username");
        const userInit = userName.substring(0, 2).toUpperCase();
        const today = new Date();
        let scanId = userInit + "-" + today.getDate().toString() + today.getMonth().toString() + "-" + today.getHours().toString() + today.getMinutes().toString();

        return scanId;

    }

    /* This method will accept list of components and find CVEs for each components for NVD */


   export  const cveScan4Components = (components) => {
        // 
        // method for getting CVES for one component 

        const scanResult4Components = components.map((component) => {
            // get CVEs for one component 


            const cveList = scanCve4Component(component)

            return {

              scanComponent: component,
                scanCves:cveList
            }

        })

        return scanResult4Components;

    }// close of  function 




    const scanCve4Component = (component) => {

        return matchedCves4Component(component);

    }// close of function 


    const getAllNvdCves2022 = () => {

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


        return transforedNvdCves;


    }// end of method 

    const matchedCves4Component = (component) => {

        const transforedNvdCves = getAllNvdCves2022();

        const matchedCvesOnComponent = transforedNvdCves.filter((cve) =>
            filterByName(cve, component.componentName));

        if(matchedCves4Component==null || matchedCves4Component.length==0)
         return null;

        const filterOnVersion = matchedCvesOnComponent.filter((cve) => filterByVersion(cve, component.version));


        return filterOnVersion;

    }// end of method 

    const filterByName = (cve, componentName) => {


        let comExper = new RegExp(componentName, "gi");

        return cve.description.match(comExper);
    }



    /* This method will extract related  version of CVE from description 
      */

    const filterByVersion = (cve, compVersion) => {
        // console.log('inside version fileter '+cve.description)
        const version = cve.description.split("before")[1]?.split(' ')[1];

        return version >= compVersion;
    };




export default {generateScanId ,cveScan4Components};