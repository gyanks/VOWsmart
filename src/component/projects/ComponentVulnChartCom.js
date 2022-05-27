var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('../../assests/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class  ComponentVulnChart extends Component{

    render(){
     let sum=0;
    for ( let result of this.props.scanReport){

        sum=sum+parseInt(result.cves.cveCount);
    }

    console.log(" sum of cves "+ sum)

   const chartData = this.props.scanReport.map((scan) => {

              return {
                       "x" : scan.componentName,
                       "totalCve" :  scan.cves.cveCount,
                       "y": Math.round(parseInt(scan.cves.cveCount)/sum *100)
              }

   });

    console.log(" chart data "+ JSON.stringify(chartData));

    const options = {
        animationEnabled: true,
        title: {
            text: "CVEs by Components"
        },
        
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{componentName}: {percent}",
            yValueFormatString: "#,###'%'",
            dataPoints: chartData
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            // onRef={ref => this.chart = ref} 
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
}
}




module.exports= ComponentVulnChart;