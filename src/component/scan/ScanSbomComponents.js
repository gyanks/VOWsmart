
import ComponentCvesScan from "./ComponentCvesScan";
const ScanSbomComponents = (props) => {
     
  return (<div>   

      {props.components.map((component) => { 

     
       <ComponentCvesScan scan={component}></ComponentCvesScan>
      }
      
      )}; 
  </div>)

};


export default ScanSbomComponents;