import { useState , useEffect} from "react";

import DisplayRecomm from './DisplayRecomm'

const SmartScan = (props) =>{

const component ={"component":"tomcat"};
const [smartMatch,setSmartMatch] = useState();

 useEffect(

fetch("http://localhost:5000/s_search",{ 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(component)})
    .then(response => response.json())
    .then(match => {setSmartMatch(match)
        
    })
    
 ,[])

return (
    <div>
        <ul>

     {smartMatch.recommendations.map(recomm => {
       <DisplayRecomm  match={recomm}></DisplayRecomm>
        
     })

    }
    </ul>
    </div>

)

}

export default SmartScan;
