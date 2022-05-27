import  React from 'react'
import ImpactChartBar from './ImpactChartBar'
import '../css/Chart.css'


const ImpactChart = ((props) => {

      console.log("in impact chart "+ JSON.stringify(props.data));
     // const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    // const totalCves = props.totalCve;
  
     return (
       <div className='chart'>
        
         {props.data.dataPoints.map((dataPoint) => (
          <ImpactChartBar
             key={dataPoint.label}
             value={dataPoint.value}
             maxValue={props.data.total}
             label={dataPoint.label}
           />
))};
       </div>
     );



});


export default ImpactChart;

