import React from 'react' 
import Table from 'react-bootstrap/Table';
import ImpactChart from '../ui/chart/impact/ImpactChart'
import ImpactPiChart from '../ui/chart/impact/ImpactPiChart'

const DisplayReportXls= (props) => {
   // console.log("in Display report "+props.matchedCves);
   //const componentName=props.scannedResults.componentName;

/* This method will accept one CVE and create excel row for the same*/
  // console.log(" impact Matrix inside Display Report "+ JSON.stringify(props.impactMatrix))


    const CveReportRow = (Cve,index) => {
         //const Cves=result;
         // console.log("in Display report "+Cve[0]);
        return(
              <tr key = {index} className='even'>
                  <td> {index + 1} </td>
                  <td>{Cve.vulnId}</td>
                  <td>{Cve.description}</td>
                  <td>{Cve.cpe}</td>
                  <td>{Cve.vectorString}</td>
                  <td>{Cve.impactScore}</td>
                  <td>{Cve.cvvsScore}</td>
                  <td>{Cve.severity}</td>
                  <td>{Cve.exploitabilityScore}</td>
              </tr>
               
             
          )
      }// End of function CveReportRow 


      /* This function will print Report Header 

      */

      const reportHeader = <thead className='bgvi'>
                            <tr>
                                <th>#</th>
                                <th>Vuln ID</th>
                                <th>Description</th>
                                <th>CPE</th>
                                <th>Vector String</th>
                                <th>Impact Score </th>
                                <th> Cvvs Score </th>
                                <th> severity </th>
                                <th>Exploitability  </th>
                            </tr>
                        </thead>

     /* to print report for all CVES */
     //?? display Logic 
     
     const CveReport = props.matchedCves.map((result,index) => 
       //console.log("in Display report "+ index + " "+result.vulnId);
        CveReportRow(result,index)
    );


// return form this component 


/*
<ImpactChart data={props.impactMatrix}></ImpactChart>
  <ImpactChart data={props.impactMatrix}></ImpactChart>
        <ImpactPiChart data={props.impactMatrix}></ImpactPiChart>



*///<ImpactPiChart data={props.impactMatrix}></ImpactPiChart>

return (
    <React.Fragment> 
        
      
        
        
    <Table striped bordered hover>

        {reportHeader}
        <tbody>
            
            {CveReport}
        </tbody>
    </Table>

    </React.Fragment>
    
)

};

export default DisplayReportXls;

