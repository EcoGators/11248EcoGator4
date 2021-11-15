import React from 'react';
import * as d3 from 'd3';

function findMaxMin(arr) {

   const max = arr[0][0];
   const min = arr[0][0];

   for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j ++) {
         if (arr[i][j] > max)
            max = arr[i][j]
         if (arr[i][j] < min)
            min = arr[i][j]
      }
   }

   return [max, min];
}

class GeneratedHeatMap extends React.Component {
   constructor(props){
      super(props);
      this.graph = React.createRef();
      this.data = props.data;
      this.socket = props.socket;
      this.socket.on('data', (data) => {
         this.generateGraph(data);
      })
   }

   generateGraph(data) {
      this.Generate({
         container: this.graph,
         start_color: "#FC7C89",
         end_color: "#21A38B",
       }, data);
   }

   Generate(options, data) {
      if (data == [] || !Array.isArray(data) || !Array.isArray(data[0])) {
         return
      }

      // Set some base properties.
      // Some come from an options object
      const width = window.innerWidth,
        height = window.innerHeight,
        container = options.container,
        startColor = options.start_color,
        endColor = options.end_color
    
      // Find our max and min values
      const maxMin = findMaxMin(data);
      const maxValue = maxMin[0];
      const minValue = maxMin[1];
    
      const numrows = data.length
      // assume all subarrays have same length
      const numcols = data[0].length

      d3.select(".svg-container").remove();
    
      // Create the SVG container
      const svg = d3
        .select(container.current)
        .append("svg")
        .classed("svg-container", true)
        .attr("width", width)
        .attr("height", height)
    
      // Add a background to the SVG
      // const background = svg
      //   .append("rect")
      //   .style("stroke", "black")
      //   .attr("width", width)
      //   .attr("height", height)
    
      // Build some scales for us to use
      const x = d3.scaleOrdinal()
        .domain(d3.range(numcols))
        .range([0, width])
    
      const y = d3.scaleOrdinal()
        .domain(d3.range(numrows))
        .range([0, height])
    
      // This scale in particular will
      // scale our colors from the start
      // color to the end color.
      const colorMap = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([startColor, endColor])
    
      // Generate rows and columns and add
      // color fills.
      const row = svg
        .selectAll(".row")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", (d, i) => {
          return "translate(0," + y(i) + ")"
        })
    
      const cell = row
        .selectAll(".cell")
        .data(d => {
          return d
        })
        .enter()
        .append("g")
        .attr("class", "cell")
        .attr("transform", (d, i) => {
          return "translate(" + x(i) + ", 0)"
        })
    
      cell
        .append("rect")
        .attr("width", width / data[0].length)
        .attr("height", height / data.length)
    
      row
        .selectAll(".cell")
        .data((d, i) => {
          return data[i]
        })
        .style("fill", colorMap)
    
      // const labels = svg.append("g").attr("class", "labels")
    
      // const columnLabels = labels
      //   .selectAll(".column-label")
      //   .data(columnLabelsData)
      //   .enter()
      //   .append("g")
      //   .attr("class", "column-label")
      //   .attr("transform", (d, i) => {
      //     return "translate(" + x(i) + "," + height + ")"
      //   })
    
      // columnLabels
      //   .append("line")
      //   .style("stroke", "black")
      //   .style("stroke-width", "1px")
      //   .attr("x1", x.rangeBand() / 2)
      //   .attr("x2", x.rangeBand() / 2)
      //   .attr("y1", 0)
      //   .attr("y2", 5)
    
      // columnLabels
      //   .append("text")
      //   .attr("x", 0)
      //   .attr("y", y.rangeBand() / 2 + 20)
      //   .attr("dy", ".82em")
      //   .attr("text-anchor", "end")
      //   .attr("transform", "rotate(-60)")
      //   .text((d, i) => {
      //     return d
      //   })
    
      // const rowLabels = labels
      //   .selectAll(".row-label")
      //   .data(rowLabelsData)
      //   .enter()
      //   .append("g")
      //   .attr("class", "row-label")
      //   .attr("transform", (d, i) => {
      //     return "translate(" + 0 + "," + y(i) + ")"
      //   })
    
      // rowLabels
      //   .append("line")
      //   .style("stroke", "black")
      //   .style("stroke-width", "1px")
      //   .attr("x1", 0)
      //   .attr("x2", -5)
      //   .attr("y1", y.rangeBand() / 2)
      //   .attr("y2", y.rangeBand() / 2)
    
      // rowLabels
      //   .append("text")
      //   .attr("x", -8)
      //   .attr("y", y.rangeBand() / 2)
      //   .attr("dy", ".32em")
      //   .attr("text-anchor", "end")
      //   .text((d, i) => {
      //     return d
      //   })
    }
   
   componentDidMount(){
      this.generateGraph(this.data);
   }

   render(){
   return (
      <div ref={this.graph}>
      </div>
   );
   }
 
}
export default GeneratedHeatMap;