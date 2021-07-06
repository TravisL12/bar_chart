import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function ScatterChart({ data }) {
  const ref = useRef();

  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xScale.domain([0, d3.max(data, (d) => d.x) * 1.2]);
    svg.select(".x-axis").call(d3.axisBottom(xScale));

    // update y-axis
    yScale.domain([0, d3.max(data, (d) => d.y) * 1.2]);
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll(".scatter")
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => {
          enter
            .append("circle")
            .attr("fill", "red")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", (d) => d.r)
            .call((e) => e.transition().attr("fill", "orange"));
          return enter;
        },
        (update) => {
          update
            .transition()
            .delay((_, i) => i * 50)
            .duration(500)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .call((u) =>
              u
                .transition()
                .duration(500)
                .attr("stroke", "none")
                .attr("fill", "orange")
            );
        },
        (exit) =>
          exit
            .transition()
            .duration(1000)
            .attr("fill", "yellow")
            .attr("stroke-width", 4)
            .attr("stroke", "black")
            .call((exit) => exit.style("opacity", 0).remove())
      );
  }, [data]);

  // initialize graph
  useEffect(() => {
    const svg = d3.select(ref.current);
    // create main viewport
    svg
      .attr("width", mainWidth)
      .attr("height", mainHeight)
      .append("g")
      .attr("class", "scatter")
      .attr("transform", `translate(${margin.left})`);

    // create x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left}, ${height})`);

    // create y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left})`);
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

export default ScatterChart;
