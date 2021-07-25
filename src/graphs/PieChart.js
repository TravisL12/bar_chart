import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "../data";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;
var radius = Math.min(width, height) / 2;

function PieChart() {
  var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
  const ref = useRef();

  // const color = d3.scaleOrdinal().domain([0, 30]).range(dataColors);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    const pie = d3.pie().value(([_, value]) => {
      return value;
    });
    const data_ready = pie(Object.entries(data));
    var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll(".mySlices")
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", "red")
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll(".mySlices")
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        console.log(d);
        return "grp " + d.data[0];
      })
      .attr("transform", function (d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);
  }, [data]);

  // initialize graph
  useEffect(() => {
    const svg = d3.select(ref.current);
    // create main viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "mySlices")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  }, []);

  useEffect(() => {
    draw();
  }, [data, draw, ref.current]);

  return (
    <div style={{ padding: "10px 0" }}>
      <svg ref={ref}></svg>
    </div>
  );
}

export default PieChart;
