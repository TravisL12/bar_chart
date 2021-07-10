import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "./data";

const mainWidth = 1000;
const mainHeight = 400;

const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function LineChart({ data }) {
  const ref = useRef();

  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.type))
    .range(dataColors);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xScale.domain([0, d3.max(data, (d) => d.x)]);
    svg.select(".x-axis").call(d3.axisBottom(xScale));

    // update y-axis
    yScale.domain(d3.extent(data, (d) => d.y));
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll(".lines")
      .selectAll("path")
      .data([data]) // <---- wrap data in array!!!!
      .join(
        (enter) => {
          return enter
            .append("path")
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .attr("stroke", "pink")
            .attr(
              "d",
              d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))
            );
        },
        (update) => {
          update
            .transition()
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .attr("stroke", "pink")
            .attr(
              "d",
              d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))
            );
        }
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
      .attr("class", "lines")
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

export default LineChart;
