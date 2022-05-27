import React from 'react'

import ComponentCvesScan from './scan/ComponentCvesScan';
import Component2DB from './db/DbService'


const SbomComponents = (props) => {

    return (
        // Trigger to start scan for submitted components 
        <div>
            
            <ul>
                
                {props.components.map((component) => (
                    <ComponentCvesScan component={component}></ComponentCvesScan>
                    //<ScanComponent component={component}></ScanComponent>

                ))};


            </ul>
        </div>


    );



}

export default SbomComponents;