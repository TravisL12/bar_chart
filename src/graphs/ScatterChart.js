import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { dataColors } from "../data";
import {
  MARGIN as margin,
  MAIN_WIDTH as mainWidth,
  MAIN_HEIGHT as mainHeight,
} from "../constants";

const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function ScatterChart({ data }) {
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
            .attr("stroke", "white")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", (d) => d.r)
            .call((e) => e.transition().attr("fill", (d) => color(d.type)))
            .on("mouseover", (e) => {
              d3.select(e.target)
                .transition()
                .style("opacity", 0.8)
                .attr("r", 25);
            })
            .on("mouseleave", (e) => {
              const data = e.target.__data__;
              d3.select(e.target)
                .transition()
                .attr("fill", color(data.type))
                .attr("r", data.r);
            });
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
                .attr("stroke", "white")
                .attr("fill", (d) => color(d.type))
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
  }, [data, color, xScale, yScale]);

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <svg ref={ref} width={mainWidth} height={mainHeight}>
      <g
        className="main"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <g className="scatter" />
        <g className="x-axis" transform={`translate(0, ${height})`} />
        <g className="y-axis" />
      </g>
    </svg>
  );
}

export default ScatterChart;
