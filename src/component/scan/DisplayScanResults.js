import React from "react"
import Display  from './Display'
import DisplayReportXls from "./DisplayReportXls";
const DisplayScanResults = (props) => {

      const  cveList= localStorage.getItem("cveList");
      return (
            <div>
     { cveList.map((cve) => 
      <Display myCve={cve}/>
      
      )}
      </div>
      )
};



export default DisplayScanResults;