
export const saveScanResult2Db = (result) => {
    const zz = JSON.stringify(result);
    var json = JSON.parse(zz);
    // console.log(" json parsed successfully " + JSON.stringify(json))

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify(result)
    };
    fetch('http://localhost:4004/scan/create', requestOptions)
        .then(response => response.json())
        .then(data => console.log("saved to db " + JSON.stringify(data)))
        .catch(error => console.log("there was error while saving scan results " + error))





}


const isProjectScaned = (dbScanData, projectName) => {

    const scanResult4Project = dbScanData.filter(result => result.projectName === projectName);

    if (scanResult4Project == null)
        return false;
    else
        return true;

}

const prepareScanSummary4Project = (dbScanData, projectName) => {

    let scannedComponents = [];

    //console.log(" scan result "+ JSON.stringify(scanResult))

    const scanResult4Project = dbScanData.filter(result => result.projectName === projectName);

    const scanSummary = [];

    const scanedSummary4All =
        scanResult4Project.map((scanResult) => {



            return {
                "scanResult": scanResult.components.map((component) => {

                    return {
                        "componentName": component.scanComponent.componentName,
                        "version": component.scanComponent.version,
                        "cves": {

                            "cveCount": component.scanCves.length,
                            "critical": component.scanCves.filter(cve => cve.cvvsScore > 9).length,
                            "high": component.scanCves.filter(cve => cve.cvvsScore < 9 && cve.cvvsScore > 7.0).length,
                            "medium": component.scanCves.filter(cve => cve.cvvsScore < 7.0 && cve.cvvsScore > 4.0).length,
                            "low": component.scanCves.filter(cve => cve.cvvsScore < 4.0).length,
                        }

                    }
                })




            }

        });
    const summary4All = { "scanSummary": scanedSummary4All };
    console.log(" scan Summary " + JSON.stringify(summary4All))

    const uniqueComponents = findUniqueComponents(summary4All);
    console.log(" Unique Components " + JSON.stringify(uniqueComponents))

    return uniqueComponents;
}



// logic for finding unique compoenets from scan Result 


const findUniqueComponents = (scanResults) => {

    let uniqueComponents = [];

    scanResults.scanSummary.map((result) => {


        for (let compCve of result.scanResult) {
            let duplicate = false;

            if (uniqueComponents == null)
                uniqueComponents.push(compCve);
            else {
                for (let comp of uniqueComponents) {

                    if (comp.componentName === compCve.componentName && comp.version === compCve.version) {

                        duplicate = true;
                        break;
                    }
                }
                if (!duplicate)
                    uniqueComponents.push(compCve);

            }
        }

    });

    return uniqueComponents;

}


const prepareScanHistoryForProject = (dbData, projectName) => {




}
/*
const summaryHeader = (dbScanData) => {
    const user=localStorage.getItem("username").toLowerCase();


    const scanByUser= dbScanData.filter(scan => scan.scanByUser.toLowerCase() ===user);






    let totalCves = 0;
    let totalCritical = 0;
    let totalHigh = 0;
    let totalMedium = 0;
    let totalLow = 0;


  return   uniqueComponentsResult.map((result) => {
        return {

            "totalCves": totalCves + result.cveCount,
            "totalCritical": totalCritical + result.critical,
            "totalHigh": totalHigh + result.high,
            "totalMedium": totalMedium + result.medium,
            "totalLow ": totalLow + result.low

        }
   })

}
*/

/*

//const summary = scanedSummary4All;
console.log(" scan summary for all projects " + JSON.stringify(summary4All));
const uniqueComponentsReport = [];
const uniqueComponentsReportSet = new Set();

const uniqueResults=  summary4All.scanSummary.map(summary => {
    for (const scan of summary.scanResult) {

        const scanJSON = JSON.stringify(scan);

        if (!uniqueComponentsReportSet.has(scanJSON))
            uniqueComponentsReport.push(scanJSON);
        uniqueComponentsReportSet.add(scanJSON);
    }
    return uniqueComponentsReport;
});

const finalResult = { "results" :uniqueResults}
console.log("  Unique summary report " + finalResult.results);
return  finalResult;
 
*/


const findDeltaComponents = (scannedComponents, currentComponents) => {
    const uniqueComponents = new Set(scannedComponents);

    /*
    const lastScanResult = findLastScan4Project(scanResult4Project);
    console.log(" last scan result " + JSON.stringify(lastScanResult))
    const lastScanComponents = lastScanResult.components.map((comp) => {

        return comp.scanComponent
    });
*/


    console.log(" all scanned  components  " + JSON.stringify(uniqueComponents))

    const deltaComponents = getDelta(uniqueComponents, currentComponents);
    //const deltaComponents= 
    console.log("  Delta components  " + JSON.stringify(deltaComponents))
    return deltaComponents;

}


const getDelta = (array1, array2) => {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.componentName === object2.componentname && object1.version === object2.version;
        });
    });
}

const findDelta = (scanComponents, currentComponents) => {
    var setCurrentComp = new Set(currentComponents);
    return [...new Set(scanComponents)].filter(comp => !setCurrentComp.has(comp));
}

const findLastScan4Project = (scanResult4Project) => {

    const dateSort = (a, b) => {
        return new Date(b.scanDate).getTime() - new Date(a.scanDate).getTime();
    }
    scanResult4Project.sort(dateSort);

    const latestScan = scanResult4Project[0];

    return latestScan;

}





export default { saveScanResult2Db, findDeltaComponents, isProjectScaned, prepareScanSummary4Project }