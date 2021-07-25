import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "../data";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

const radius = Math.min(width, height) / 2;

function PieChart({ data }) {
  const ref = useRef();

  const color = d3.scaleOrdinal().domain(Object.keys(data)).range(dataColors);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    const pie = d3.pie().value(([_, value]) => {
      return value;
    });
    const pieData = pie(Object.entries(data));
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll(".pie")
      .selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll(".pie")
      .selectAll("text")
      .data(pieData)
      .enter()
      .append("text")
      .text((d) => d.data[0])
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 17);
  }, [data]);

  // initialize graph
  useEffect(() => {
    d3.select(ref.current)
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "pie")
      .attr("transform", `translate(${mainWidth / 2}, ${mainHeight / 2})`);
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
