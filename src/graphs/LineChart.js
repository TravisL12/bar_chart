import * as d3 from "d3";
import React, { useRef, useEffect, useCallback } from "react";
import { animals, dataColors } from "../data";
import {
  MARGIN as margin,
  MAIN_WIDTH as mainWidth,
  MAIN_HEIGHT as mainHeight,
} from "../constants";

const width = mainWidth - margin.left - margin.right;
const height = mainHeight - margin.top - margin.bottom;

function LineChart({ data }) {
  const ref = useRef();

  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);
  const color = d3.scaleOrdinal().domain(animals).range(dataColors);

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);

    // update x-axis
    xScale.domain([0, d3.max(data, (d) => d3.max(d[1], (d) => d.x))]);
    svg.select(".x-axis").call(d3.axisBottom(xScale));

    // update y-axis
    yScale.domain(d3.extent(data.map(([_, d]) => d).flat(), (d) => d.y));
    svg.select(".y-axis").transition().call(d3.axisLeft(yScale));

    svg
      .selectAll(".lines")
      .selectAll(".line")
      .data(data, (d) => d[0]) // <---- wrap data in array!!!!
      .join(
        (enter) => {
          const line = enter.append("g").attr("class", (d) => `line ${d[0]}`);

          return line
            .append("path")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", (d) => color(d[0]))
            .attr("d", (dPath) => {
              return d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))(dPath[1]);
            })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);
        },
        (update) => {
          update
            .select("path")
            .transition()
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", (d) => color(d[0]))
            .attr("d", (dPath) => {
              return d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))(dPath[1]);
            });
        }
      );
  }, [data, xScale, yScale, color]);

  const mouseover = function () {
    const subgroupName = d3.select(this.parentNode).datum()[0];
    d3.select(ref.current).selectAll(".line").style("opacity", 0.2);
    d3.select(ref.current).selectAll(`.${subgroupName}`).style("opacity", 1);
  };

  const mouseleave = function () {
    d3.select(ref.current).selectAll(".line").style("opacity", 1);
  };

  useEffect(() => {
    draw();
  }, [data, draw]);

  return (
    <svg ref={ref} width={mainWidth} height={mainHeight}>
      <g
        className="main"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <g className="lines" />
        <g className="x-axis" transform={`translate(0, ${height})`} />
        <g className="y-axis" />
      </g>
    </svg>
  );
}

export default LineChart;
