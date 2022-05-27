import React from 'react'
import { PieChart, Pie,Cell, Tooltip, Legend } from 'recharts';

const ImpactPiChart = ((props ) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

console.log(" in pai chart "+ JSON.stringify(props.data.dataPoints))

/*
 {
                        props.data.dataPoints.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                    }
                    */

                 const    CustomTooltip = ({ active, payload, label }) => {
                      if (active) {
                          return (
                              <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                                  <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                              </div>
                          );
                      }
              
                      return null;
                  };


    return (
        <PieChart width={700} height={700}>
          <Pie data={props.data.dataPoints} dataKey="value" nameKey="label" outerRadius={250} fill="#8884d8" color='black' >
          {
                        props.data.dataPoints.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                    }

         
          </Pie>
          <Tooltip content={<CustomTooltip />} />
                <Legend />
        </PieChart>
);


});

export default ImpactPiChart;
