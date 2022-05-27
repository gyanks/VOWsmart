/*var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('../../assests/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;*/


import { CanvasJSChart } from "canvasjs-react-charts";

const ComponentVulnChart = (props) => {


    let sum = 0;
    for (let result of props.scanReport) {

        sum = sum + parseInt(result.cves.cveCount);
    }

    console.log(" sum of cves " + sum)

    const chartData = props.scanReport.map((scan) => {

        return {
            "name": scan.componentName,
            "label": scan.componentName,

            "y": Math.round(parseInt(scan.cves.cveCount) / sum * 100)
        }

    });

    console.log(" chart data " + JSON.stringify(chartData));

    const options = {
        animationEnabled: true,
        title: {
            text: "CVEs by Components"
        },
/*
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
*/
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: chartData
        }]
    }
    return (
       
            <CanvasJSChart options={options}

            />
          
    );
}


export default ComponentVulnChart;