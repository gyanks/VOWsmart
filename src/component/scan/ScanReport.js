import React from 'react' 
import Table from 'react-bootstrap/Table';
//import { BrowserRouter as Router, Routes,
   // Route, Link } from "react-router-dom";

  import ComponentCvesScan from './ComponentCvesScan';  

//import  check_vulnerability_main from '../../smart/smart_scan'

const ScanReport =(props) => {

    console.log(' inside Scan Report '+JSON.stringify(props.results))


    const printReport = props.results.map((result, index) =>  Report(result,index));

    /* 
    <Routes>

               <Route path="/viewReport/:component" element={<ComponentCvesScan/>}></Route>
           </Routes>
           */

    return (
        <React.Fragment> 
            
           
         
        <Table striped bordered hover>
    
            {reportHeader}
            <tbody>
                
                {printReport}
            </tbody>
        </Table>
    
        </React.Fragment>
        
    )


}



const reportHeader = <thead className='bgvi'>
<tr>
    <th># S.No. </th>
    <th>Component Name </th>
    <th>Version</th>
    <th>No. of CVE</th>
    
    
</tr>
</thead>







    
    

const Report = (result, index) => {

    return(
        <tr key = {index} className='even'>
            <td> {index + 1} </td>
            <td>{result.componentName}</td>
            <td>{result.version}</td>
            <td>{result.cveCount}</td>
            <td> <button onClick={showDetailsHandler}> View Report </button></td>
            <td>{result.cveCount==0? <button onClick={smartSearchHandler}> Smart Scan </button> :null }</td>
           
        </tr>
         
       
    )

                 

}



const smartSearchHandler = (component) => {

 console.log( ' Inside smart search hanlder '+ JSON.stringify(component));
 /*
 let component_array= new Array(component);

 const suggestions= check_vulnerability_main(component,null);
 alert(JSON.stringify(suggestions))

*/
};

const showDetailsHandler = (component) => {

console.log("Inside show details for component "+ JSON.stringify(component))

}


export  default ScanReport ;