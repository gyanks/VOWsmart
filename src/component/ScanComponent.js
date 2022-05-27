import React from 'react'

import './ScanComponent.css'
const SacnComponent = (props) => {
    return <div className="comnt">

      <div className="comnt1">{props.component.sNo} </div> 
      <div className="comnt1">  {props.component.componentName}</div>  
      <div className="comnt1">{props.component.version}</div>  

    </div>

}

export default SacnComponent;